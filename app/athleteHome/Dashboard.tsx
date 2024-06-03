'use client'

import getUserSession from "@/utils/Supabase/getUserSession";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Dashboard() {
  const router = useRouter()

//   useEffect(() => {
//     console.log(user)
//     if (!user.user) {
//         router.push('/login');
//     }
// });

  return (
      <>
          Athlete Dashboard
      </>
  )


}