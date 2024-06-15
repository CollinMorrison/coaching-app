import getUserSession from "@/utils/Supabase/getUserSession";
import RegisterForm from "./RegisterForm";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar-landing";


export default async function Home() {

    const {
        data: { user },
      } = await getUserSession();
      console.log(user);
      if (user) {
        redirect('/athleteHome');
      }
    


    return (
        <>
            <Navbar/>
            <RegisterForm/>
        </>
    )
}