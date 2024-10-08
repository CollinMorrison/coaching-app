import getUserSession from "@/utils/Supabase/getUserSession";
import { redirect, useRouter } from "next/navigation";
import Dashboard from "./Dashboard";
import NavbarAthlete from "@/components/navbar-athlete";
import { getAthleteById, getMetricsByDateAndUserId, getTrainingPlanByAthleteId, getWorkoutByDateAndUserId } from "@/utils/Supabase/supabaseServer";


export default async function AthleteHome() {
  const {
      data: { user: userSession },
    } = await getUserSession();
    // console.log(userSession)
    if (!userSession) {
        redirect('/login');
    }
  const user = await getAthleteById(userSession.id)
  const trainingPlan = await getTrainingPlanByAthleteId(user[0].id)
  // this gets the current date/time in UTC time
  const currentDateObject = new Date()
  // extracts the date from the timecode, returned as a string in the client's timezone
  const currentDateString = currentDateObject.toLocaleDateString()
  const todayWorkout = await getWorkoutByDateAndUserId(currentDateString, user[0].id)
  const todayMetrics = await getMetricsByDateAndUserId(currentDateString, user[0].id)

  console.log("Current Date:")
  console.log(currentDateString)
  // console.log("User:")
  // console.log(user[0])
  // console.log("Training Plan:")
  // console.log(trainingPlan[0])
  // console.log("Today's Workout:") 
  // console.log(todayWorkout[0])
  console.log("Today's Metrics:")
  console.log(todayMetrics[0])


  return (
      <>
          <NavbarAthlete user={user[0]}/>
          <Dashboard trainingPlan={trainingPlan[0]} todayWorkout={todayWorkout[0]} todayMetrics={todayMetrics[0]}/>
      </>
  )


}