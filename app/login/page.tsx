import getUserSession from "@/utils/Supabase/getUserSession";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";


export default async function Home() {

    const {
        data: { user },
      } = await getUserSession();
      if (user) {
        redirect('/athleteHome');
      }
    


    return (
        <>
            <LoginForm/>
        </>
    )
}