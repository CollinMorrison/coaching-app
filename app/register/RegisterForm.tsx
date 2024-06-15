'use client'

import Navbar from "@/components/navbar-landing";
import { createAccount } from "@/utils/Supabase/supabaseAuth";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


export default function RegisterForm() {
    // const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [athleteOrCoach, setAthleteOrCoach] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [coachId, setCoachId] = useState<string>('')
    const [gender, setGender] = useState<string>('')

    const submitAccount = async () => {
        if (password.length < 6) toast.error("Password must have 6 or more characters")
        else if (athleteOrCoach === '') toast.error("Please select athlete or coach")
        else if (email === '') toast.error("Please enter an email")
        else if (firstName === '') toast.error("Please enter a first name")
        else if (lastName === '') toast.error("Please enter a last name")
        else if (gender !== 'm' && gender !== 'f') toast.error("Please select a gender")
        else {
            try {
                await createAccount(email, password, athleteOrCoach, firstName, lastName, gender, coachId)
                setPassword('')
                setEmail('')
                setFirstName('')
                setLastName('')
                setGender('')
                setCoachId('')
                setAthleteOrCoach('')
                toast.success("Account created!")
            } catch(e) {
                toast.error("Error creating account")
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
                        <h3 className="font-bold">Email</h3>
                        <input className="border rounded-lg m-5 text-black" value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex items-center text-white">
                        <h3 className="font-bold">Password</h3>
                        <input className="border rounded-lg m-5 text-black" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        
                    </div>
                    <div className="flex items-center">
                        {password.length < 6 && 
                            <p className="text-xs text-red-400 ml-20">Password must have 6 or more characters</p>
                        }
                    </div>
                    <div className="flex items-center text-white">
                        <h3 className="font-bold">First Name</h3>
                        <input className="border rounded-lg m-5 text-black" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className="flex items-center text-white">
                        <h3 className="font-bold">Last Name</h3>
                        <input className="border rounded-lg m-5 text-black" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className="flex flex-row text-white">
                        <div className="flex items-center">
                            <h3 className="mr-5 font-bold">Gender</h3>
                            <h3>Male</h3>
                            <input type="radio" name="gender" value="m" checked={gender === "m"} className="m-5 text-black w-5 h-5" onChange={(e) => setGender(e.target.value)}/>
                        </div>
                        <div className="flex items-center">
                            <h3>Female</h3>
                            <input type="radio" name="gender" value="f" checked={gender === "f"} className="m-5 text-black w-5 h-5" onChange={(e) => setGender(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-row text-white">
                        <div className="flex items-center">
                            <h3>I&#39;m an athlete</h3>
                            <input type="radio" name="athleteOrCoach" value="athlete" checked={athleteOrCoach === "athlete"} className="m-5 text-black w-5 h-5" onChange={(e) => setAthleteOrCoach(e.target.value)}/>
                        </div>
                        <div className="flex items-center">
                            <h3>I&#39;m a coach</h3>
                            <input type="radio" name="athleteOrCoach" value="coach" checked={athleteOrCoach === "coach"} className="m-5 text-black w-5 h-5" onChange={(e) => setAthleteOrCoach(e.target.value)}/>
                        </div>
                    </div>
                    {athleteOrCoach === "athlete" &&
                        <div className="flex items-center text-white">
                            <h3>Coach ID &#40;optional&#41;</h3>
                            <input className="border rounded-lg m-5 text-black" value={coachId} onChange={(e) => setCoachId(e.target.value)}/>
                        </div>
                    }
                    <div className="flex mt-20">
                        <Button className="absolute bottom-1 right-2 m-3 p-2 border rounded-xl text-white" onClick={() => submitAccount()}>Submit</Button>
                    </div>
                </div>
            </div>
        </>
    )
}