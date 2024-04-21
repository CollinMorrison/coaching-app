'use client'


import { login } from "@/utils/supabase/supabaseAuth";
import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";


export default function Home() {
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [athleteOrCoach, setAthleteOrCoach] = useState<string>('')

    const submitLogin = () => {
        try {
            login(email, password)
            // toast.success("Logged in!")
        } catch(e) {
            toast.error("Invalid email or password")
            console.error(e)
        }
    }

    return (
        <>
            <div className="w-full h-16 shadow-lg">
                <div className="h-full mr-10 ml-10 flex justify-end items-center">
                    <Link href="/login" className="text-white mr-10">Login</Link>
                    <Link href="/register" className="text-white">Register</Link>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center h-auto">
                <h1 className="text-3xl text-white m-20">Welcome to Coachify!</h1>
                <div className="flex items-center justify-center h-auto">
                <div className="bg-slate-600 shadow-xl w-auto pr-10 pl-10 h-auto rounded-xl flex flex-col justify-center items-center relative">
                    <h1 className="mt-10 mb-10 text-3xl">Login</h1>
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
                    <div className="mt-20">
                        <p className="absolute bottom-1 left-2 m-3 p-2">Don&#39;t have an account?</p>
                        <Link className="text-white absolute bottom-1 right-25 m-3 p-2 border rounded-xl w-auto" href="/register">Sign Up</Link>
                    </div>
                    <Button className="text-white absolute bottom-1 right-2 m-3 p-2 border rounded-xl w-auto" onClick={() => submitLogin()}>Submit</Button>
                </div>
            </div>
            </div>
        </>
    )
}