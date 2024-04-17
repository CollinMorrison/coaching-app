"use client"

import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";


export default function Home() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const createAccount = async () => {

    }


    return (
        <>
            <Link href="/register">Register</Link>
        </>
    )
}