import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSupabaseServerClient() {
  const cookieStore = cookies()

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          console.log("in cookies get function")
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

export async function getAthleteById(id: string) {
  const supabase = await createSupabaseServerClient()
  const {data, error} = await supabase.from('athlete').select('*').eq('id', id)
  // console.log(id)
  // console.log(data)

  if (error) {
    throw error
  }
  return data
}

export async function getCoachById(id: string) {
  const supabase = await createSupabaseServerClient()
  const {data, error} = await supabase.from('coach').select('*').eq('id', id)
  if (error) {
    throw error
  }
  return data
}

export async function getTrainingPlanByAthleteId(id: string) {
  const supabase = await createSupabaseServerClient()
  const {data, error} = await supabase.from('training_plan').select('*').eq('athlete_id', id)
  if (error) {
    throw error
  }
  return data
}

export async function getWorkoutByDateAndUserId(date: string, id: string) {
  const supabase = await createSupabaseServerClient()
  const {data, error} = await supabase.from('workout').select('*').eq('date', date).eq('athlete_id', id)
  if (error) {
    throw error
  }
  return data
}

export async function getMetricsByDateAndUserId(date: string, id: string) {
  const supabase = await createSupabaseServerClient()
  const {data, error} = await supabase.from('metrics').select('*').eq('date', date).eq('athlete_id', id)
  if (error) {
    throw error
  }
  return data
}

export async function upsertMetrics(metrics: any) {
  const supabase = await createSupabaseServerClient()
  const {data, error} = await supabase
  .from('metrics')
  .upsert({
    resting_heart_rate: metrics.resting_heart_rate,
    hrv_value: metrics.hrv_value,
    hrv_status: metrics.hrv_status,
    sleep_score: metrics.sleep_score,
  })
  .select()
  if (error) {
    throw error
  }
  return data
}