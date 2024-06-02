import getUserSession from "@/utils/Supabase/getUserSession";
import LoginForm from "./LoginForm";


export default async function Home() {

    const {
        data: { user },
      } = await getUserSession();
    


    return (
        <>
            <LoginForm user={user}/>
        </>
    )
}