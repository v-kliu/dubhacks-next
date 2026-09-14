import { Redis } from '@upstash/redis'
import { createClient } from '@supabase/supabase-js'

// Mailing list sign-up. Rows land in the Supabase table `mailing_list`
// (see supabase/mailing_list.sql). Redis is only used for a light per-IP rate limit.

const redis = Redis.fromEnv()
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_SIGNUPS_PER_HOUR = 10

const clean = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

const parseBody = (body: unknown): Record<string, unknown> => {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  return (body as Record<string, unknown>) ?? {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const body = parseBody(req.body)
  const name = clean(body.name, 100)
  const email = clean(body.email, 254).toLowerCase()
  const major = clean(body.major, 120)
  const honeypot = clean(body.website, 20)

  // Bots that fill the hidden field get a fake success and nothing is stored
  if (honeypot) {
    return res.status(200).json({ ok: true })
  }

  if (!name) return res.status(400).json({ error: 'Please enter your name.' })
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' })
  if (!major) return res.status(400).json({ error: 'Please enter your major or school.' })

  // Rate limit per IP; a Redis hiccup should never block a real sign-up
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? 'unknown'
  try {
    const key = `subscribe:${ip}`
    const count = await redis.incr(key)
    if (count === 1) await redis.expire(key, 60 * 60)
    if (count > MAX_SIGNUPS_PER_HOUR) {
      return res.status(429).json({ error: 'Too many sign-ups from this network. Please try again later.' })
    }
  } catch (err) {
    console.error('Subscribe rate limit error:', err)
  }

  const { error } = await supabase
    .from('mailing_list')
    .insert({ name, email, major_school: major })

  if (error) {
    // 23505 = unique violation: this email is already on the list, which is fine
    if (error.code === '23505') {
      return res.status(200).json({ ok: true, duplicate: true })
    }
    console.error('Subscribe insert error:', error.message)
    return res.status(500).json({ error: 'Something went wrong saving your sign-up. Please try again.' })
  }

  return res.status(200).json({ ok: true })
}
