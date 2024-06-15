'use server'

import { createSupabaseServerClient } from '@/utils/Supabase/supabaseServer'
import { redirect } from 'next/navigation'

// function CreateSupabaseClient() {
//     if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
//         throw new Error("Missing Supabase environment variables")
//     }
//     return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
// } 


export async function createAccount(email: string, password: string, athleteOrCoach: string, firstName: string, lastName: string, gender: string, coachId: string) {

    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })
    if (error) {
        throw error
    }
    if (!data.user) {
        throw new Error("No user data returned from Supabase")
    }
    const userId = data.user.id

    if (athleteOrCoach === "athlete") {
        const { data: userData, error: userError } = await supabase.from("athlete").insert({
            id: userId,
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            coach_id: coachId || null,
        })
        if (userError) {
            throw userError
        }

        await login(email, password)
        redirect('/athleteHome')
    } else {
        const { data: userData, error: userError } = await supabase.from("coach").insert({
            id: userId,
            first_name: firstName,
            last_name: lastName,
            gender: gender
        })
        if (userError) {
            throw userError
        }
        await login(email, password)
        redirect('/coachHome')
    }
}


export async function login(email: string, password: string) {
    // try/catch block is in the client function because redirect doesn't work in try/catch blocks due to a bug in Next
    console.log("in login function (supabaseAuth.ts)")
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if (error) {
        throw error
    }
    
    return JSON.stringify(data)
}

export async function signOut() {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
        throw error
    }
    redirect('/')
}