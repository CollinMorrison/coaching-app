'use server'

import { createClient } from '@/utils/supabase/supabaseServer'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// function CreateSupabaseClient() {
//     if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
//         throw new Error("Missing Supabase environment variables")
//     }
//     return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
// } 


export async function createAccount(email: string, password: string, athleteOrCoach: string) {

    const supabase = createClient()
    // try/catch block is in the client function because redirect doesn't work in try/catch blocks due to a bug
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })
    if (error) {
        throw error
    }
    revalidatePath('/', 'layout')
    redirect('/athleteHome')
}


export async function login(email: string, password: string) {
    // try/catch block is in the client function because redirect doesn't work in try/catch blocks due to a bug
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if (error) {
        throw error
    }
    console.log("logged in")
    revalidatePath('/', 'layout')
    redirect('/athleteHome')
}