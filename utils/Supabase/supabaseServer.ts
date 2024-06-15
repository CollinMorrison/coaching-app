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

