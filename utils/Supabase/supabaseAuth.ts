'use server'

import { createClient } from '@supabase/supabase-js'

function CreateSupabaseClient() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Missing Supabase environment variables")
    }
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
} 


export async function createAccount(email: string, password: string, athleteOrCoach: string) {

    const supabase = CreateSupabaseClient()
    console.log("in supabase function")
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        if (error) {
            throw error
        }
    } catch (e) {
        console.log("in supabase function error handling")
        console.error(e)
    }
}
