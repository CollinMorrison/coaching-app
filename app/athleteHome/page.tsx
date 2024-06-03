import getUserSession from "@/utils/Supabase/getUserSession";
import { redirect, useRouter } from "next/navigation";
import Dashboard from "./Dashboard";
import NavbarAthlete from "@/components/navbar-athlete";


export default async function AthleteHome() {
  const {
      data: { user },
    } = await getUserSession();
    // console.log(user)
    if (!user) {
        redirect('/login');
    }

  return (
      <>
          <NavbarAthlete/>
          <Dashboard/>
      </>
  )


}