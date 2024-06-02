import getUserSession from "@/utils/Supabase/getUserSession";
import { redirect } from "next/navigation";


export default async function Dashboard() {
    const {
        data: { user },
      } = await getUserSession();
    
      if (!user) {
        return redirect('/login');
      }

    return (
        <>
           Athlete Dashboard
        </>
    )


}