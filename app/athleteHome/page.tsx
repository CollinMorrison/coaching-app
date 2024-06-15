import getUserSession from "@/utils/Supabase/getUserSession";
import { redirect, useRouter } from "next/navigation";
import Dashboard from "./Dashboard";
import NavbarAthlete from "@/components/navbar-athlete";
import { getAthleteById } from "@/utils/Supabase/supabaseServer";


export default async function AthleteHome() {
  const {
      data: { user: userSession },
    } = await getUserSession();
    // console.log(userSession)
    if (!userSession) {
        redirect('/login');
    }
  const user = await getAthleteById(userSession.id)
  // console.log(user[0])


  return (
      <>
          <NavbarAthlete user={user[0]}/>
          <Dashboard/>
      </>
  )


}