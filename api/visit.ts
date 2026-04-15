import { Redis } from '@upstash/redis'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // Initialise inside handler so missing env vars surface as a clean error
  let redis: Redis
  try {
    redis = Redis.fromEnv()
  } catch (e) {
    console.error('Redis init failed:', e)
    return res.status(500).json({ error: 'Redis not configured' })
  }

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
    'unknown'

  let totalVisits: number
  let uniqueVisitors: number
  try {
    const [visits] = await Promise.all([
      redis.incr('totalVisits'),
      redis.sadd('uniqueIPs', ip),
    ])
    totalVisits = visits
    uniqueVisitors = await redis.scard('uniqueIPs')
  } catch (e) {
    console.error('Redis operation failed:', e)
    return res.status(500).json({ error: 'Redis operation failed' })
  }

  // Supabase geo logging is best-effort — never blocks the counter response
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    )

    const country =
      (req.headers['x-vercel-ip-country'] as string) ?? 'unknown'
    const rawCity = req.headers['x-vercel-ip-city'] as string | undefined
    const city = rawCity ? decodeURIComponent(rawCity) : 'unknown'
    const region =
      (req.headers['x-vercel-ip-country-region'] as string) ?? 'unknown'
    const latitude = (req.headers['x-vercel-ip-latitude'] as string) ?? null
    const longitude = (req.headers['x-vercel-ip-longitude'] as string) ?? null
    const ua = (req.headers['user-agent'] as string) ?? ''
    const device = /mobile/i.test(ua)
      ? 'mobile'
      : /tablet|ipad/i.test(ua)
      ? 'tablet'
      : 'desktop'
    const is_admin =
      ip === (process.env.ADMIN_IP ?? '') ||
      ip === (process.env.ADMIN_IP_MOBILE ?? '')

    const { error } = await supabase.from('visits').insert({
      country,
      city,
      region,
      device,
      latitude,
      longitude,
      is_admin,
      ip,
    })

    if (error) console.error('Supabase insert error:', error.message)
  } catch (e) {
    console.error('Supabase logging failed:', e)
  }

  return res.status(200).json({ totalVisits, uniqueVisitors })
}
