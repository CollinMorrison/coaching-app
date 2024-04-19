'use client'

import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";


export default function Home() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    return (
        <>
            <Link href="/register" className="text-white">Register</Link>
        </>
    )
}