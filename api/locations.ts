import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const [dotsResult, allVisitsResult] = await Promise.all([
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
      .select('ip, country')
      .neq('ip', 'unknown'),
  ])

  if (dotsResult.error) {
    return res.status(500).json({ error: dotsResult.error.message })
  }
  if (allVisitsResult.error) {
    return res.status(500).json({ error: allVisitsResult.error.message })
  }

  // One dot per unique IP (only visits with valid geo)
  const seenDots = new Set<string>()
  const dots = (dotsResult.data as { ip: string; latitude: string; longitude: string }[])
    .filter((row) => {
      if (seenDots.has(row.ip)) return false
      seenDots.add(row.ip)
      return true
    })
    .map((row) => ({
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
    }))

  // Compute unique visitors, country count, and top country from all visits
  const allVisits = allVisitsResult.data as { ip: string; country: string }[]

  const uniqueIPs = new Set(allVisits.map((r) => r.ip))
  const uniqueVisitors = uniqueIPs.size

  const countryCounts: Record<string, number> = {}
  for (const row of allVisits) {
    if (row.country && row.country !== 'unknown') {
      countryCounts[row.country] = (countryCounts[row.country] ?? 0) + 1
    }
  }
  const countryKeys = Object.keys(countryCounts)
  const countriesCount = countryKeys.length
  const topCountry = countryKeys.length > 0
    ? countryKeys.reduce((a, b) => (countryCounts[a] > countryCounts[b] ? a : b))
    : 'Unknown'

  return res.status(200).json({ dots, uniqueVisitors, countriesCount, topCountry })
}
