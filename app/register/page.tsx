'use client'

import { createAccount } from "@/utils/supabase/supabaseAuth";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


export default function Home() {
    // const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [athleteOrCoach, setAthleteOrCoach] = useState<string>('')

    const submitAccount = () => {
        if (password.length < 6) toast.error("You can read right?")
        else {
            try {
                createAccount(email, password, athleteOrCoach)
                setPassword('')
                setEmail('')
                setAthleteOrCoach('')
                toast.success("Account created!")
            } catch(e) {
                console.error(e)
            }
        }
    }


    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-slate-600 shadow-xl w-auto pr-10 pl-10 h-auto rounded-xl flex flex-col justify-center items-center relative">
                    <h1 className="mt-10 mb-10 text-3xl text-white">Create Account</h1>
                    <div className="flex items-center text-white">
                        <h3>Email</h3>
                        <input className="border rounded-lg m-5 text-black" value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {/* <div className="flex items-center">
                        <h3>Username</h3>
                        <input className="border rounded-lg m-5 text-black" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div> */}
                    <div className="flex items-center text-white">
                        <h3>Password</h3>
                        <input className="border rounded-lg m-5 text-black" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        
                    </div>
                    <div className="flex items-center">
                        {password.length < 6 && 
                            <p className="text-xs text-red-400 ml-20">Password must have 6 or more characters</p>
                        }
                    </div>
                    <div className="flex flex-row mb-20 text-white">
                        <div className="flex items-center">
                            <h3>I&#39;m an athlete</h3>
                            <input type="radio" name="athleteOrCoach" value="athlete" checked={athleteOrCoach === "athlete"} className="m-5 text-black w-5 h-5" onChange={(e) => setAthleteOrCoach(e.target.value)}/>
                        </div>
                        <div className="flex items-center">
                            <h3>I&#39;m a coach</h3>
                            <input type="radio" name="athleteOrCoach" value="coach" checked={athleteOrCoach === "coach"} className="m-5 text-black w-5 h-5" onChange={(e) => setAthleteOrCoach(e.target.value)}/>
                        </div>
                    </div>
                    <Button className="absolute bottom-1 right-2 m-3 p-2 border rounded-xl text-white" onClick={() => submitAccount()}>Submit</Button>
                </div>
            </div>
        </>
    )
}