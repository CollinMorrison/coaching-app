'use client'

import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";


export default function Home() {

    return (
        <>
            <div className="w-full h-16 shadow-lg">
                <div className="h-full mr-10 ml-10 flex justify-end items-center">
                    <Link href="/login" className="text-white mr-10">Login</Link>
                    <Link href="/register" className="text-white">Register</Link>
                </div>
            </div>
            <div className="flex justify-center items-center h-full">
                <h1 className="text-3xl text-white">Welcome to Coachify!</h1>
            </div>
        </>
    )
}