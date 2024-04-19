'use client'

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { createAccount } from "@/utils/Supabase/supabaseAuth";
import { toast } from "react-toastify";


export default function Home() {
    // const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [athleteOrCoach, setAthleteOrCoach] = useState<string>('')

    const submitAccount = () => {
        if (password.length <= 6) toast.error("I swear you know how to read...")
        else {
            try {
                createAccount(email, password, athleteOrCoach)
            } catch(e) {
                console.error(e)
            }
        }
    }


    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-slate-600 shadow-xl w-auto pr-10 pl-10 h-auto rounded-xl flex flex-col justify-center items-center relative">
                    <h1 className="mt-10 mb-10 text-3xl">Create Account</h1>
                    <div className="flex items-center">
                        <h3>Email</h3>
                        <input className="border rounded-lg m-5 text-black" value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {/* <div className="flex items-center">
                        <h3>Username</h3>
                        <input className="border rounded-lg m-5 text-black" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div> */}
                    <div className="flex items-center">
                        <h3>Password</h3>
                        <input className="border rounded-lg m-5 text-black" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        
                    </div>
                    <div className="flex items-center">
                        {password.length < 6 && 
                            <p className="text-xs text-red-400 ml-20">Password must have 6 or more characters</p>
                        }
                    </div>
                    <Button className="absolute bottom-1 right-2 m-3 p-2 border rounded-xl" onClick={() => submitAccount()}>Submit</Button>
                </div>
            </div>
        </>
    )
}