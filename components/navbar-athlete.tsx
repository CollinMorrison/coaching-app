'use client'

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { signOut } from "@/utils/Supabase/supabaseAuth";


export default function NavbarAthlete(user: any) {
    // console.log(user.user)

    const handleSignOut = () => {
        signOut()
        // sign out logic
    }

    return (
        <>
            <div className="w-full h-16 shadow-lg flex flex-row">
                <div className="mr-10 ml-10 flex w-full items-center justify-start">Welcome {user.user.first_name}!</div>
                <div className="h-full w-full mr-10 ml-10 flex justify-end items-center">
                    <Button onClick={handleSignOut} className="text-white mr-10">Sign Out</Button>
                    <Link href="/register" className="text-white">Profile</Link>
                </div>
            </div>
        </>
    )
}