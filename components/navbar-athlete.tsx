'use client'

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { signOut } from "@/utils/Supabase/supabaseAuth";


export default function NavbarAthlete() {

    const handleSignOut = () => {
        signOut()
        // sign out logic
    }

    return (
        <>
            <div className="w-full h-16 shadow-lg">
                <div className="h-full mr-10 ml-10 flex justify-end items-center">
                    <Button onClick={handleSignOut} className="text-white mr-10">Sign Out</Button>
                    <Link href="/register" className="text-white">Profile</Link>
                </div>
            </div>
        </>
    )
}