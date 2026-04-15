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

  // TODO: re-enable Supabase queries once RLS is configured
  // const [dotsResult, allVisitsResult] = await Promise.all([
  //   supabase
  //     .from('visits')
  //     .select('ip, latitude, longitude')
  //     .not('latitude', 'is', null)
  //     .not('longitude', 'is', null)
  //     .neq('latitude', 'unknown')
  //     .neq('longitude', 'unknown')
  //     .neq('ip', 'unknown'),
  //   supabase
  //     .from('visits')
  //     .select('ip, country')
  //     .neq('ip', 'unknown'),
  // ])
  // ... compute dots, uniqueVisitors, countriesCount, topCountry from results

  return res.status(200).json({
    dots: [],
    uniqueVisitors: 0,
    countriesCount: 0,
    topCountry: 'Unknown',
  })
}
