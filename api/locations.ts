import { createClient } from '@supabase/supabase-js'

interface VisitRow {
  ip: string
  latitude: string
  longitude: string
}

interface CountryRow {
  country: string
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  let supabase: ReturnType<typeof createClient>
  try {
    supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    )
  } catch (e) {
    console.error('Supabase init failed:', e)
    return res.status(500).json({ error: 'Supabase not configured' })
  }

  const [dotsResult, countriesResult] = await Promise.all([
    supabase
      .from('visits')
      .select('ip, latitude, longitude')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .neq('latitude', 'unknown')
      .neq('longitude', 'unknown')
      .neq('ip', 'unknown'),
    supabase
      .from('visits')
      .select('country')
      .neq('country', 'unknown')
      .not('country', 'is', null),
  ])

  if (dotsResult.error) {
    console.error('Supabase dots query error:', dotsResult.error.message)
    return res.status(500).json({ error: dotsResult.error.message })
  }

  // One dot per unique IP
  const seen = new Set<string>()
  const dots = (dotsResult.data as VisitRow[])
    .filter((row) => {
      if (seen.has(row.ip)) return false
      seen.add(row.ip)
      return true
    })
    .map((row) => ({
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
    }))

  // Country stats
  let countriesCount = 0
  let topCountry = 'Unknown'

  if (!countriesResult.error && countriesResult.data) {
    const counts: Record<string, number> = {}
    for (const row of countriesResult.data as CountryRow[]) {
      counts[row.country] = (counts[row.country] ?? 0) + 1
    }
    const keys = Object.keys(counts)
    countriesCount = keys.length
    if (keys.length > 0) {
      topCountry = keys.reduce((a, b) => (counts[a] > counts[b] ? a : b))
    }
  }

  return res.status(200).json({ dots, countriesCount, topCountry })
}
