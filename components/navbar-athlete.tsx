import Link from "next/link";


export default function NavbarAthlete() {
    return (
        <>
            <div className="w-full h-16 shadow-lg">
                <div className="h-full mr-10 ml-10 flex justify-end items-center">
                    <Link href="/login" className="text-white mr-10">Sign Out</Link>
                    <Link href="/register" className="text-white">Profile</Link>
                </div>
            </div>
        </>
    )
}