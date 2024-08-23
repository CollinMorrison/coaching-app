'use client'

import getUserSession from "@/utils/Supabase/getUserSession";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Dashboard(trainingPlan: any) {
  const router = useRouter()
  console.log(trainingPlan)

//   useEffect(() => {
//     console.log(user)
//     if (!user.user) {
//         router.push('/login');
//     }
// });

  return (
      <>
          <div className="flex flex-col items-center h-full">
            <div className="border border-white w-4/5 h-auto max-h-28 mt-10 rounded-md">
              Weather
            </div>
            <div className="flex flex-row w-4/5 h-auto mt-10 justify-center">
              <div className="border border-white w-1/2 justify-center mr-1 ml-1 rounded-md">
                <div className="border border-black m-5">
                  Today's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach NotesToday's Workout w/ Coach Notes
                </div>
              </div>
              <div className="border border-white w-1/2 ml-1 mr-1 rounded-md">
                <div className="border border-black m-5">
                  <p>{trainingPlan.trainingPlan.event ? trainingPlan.trainingPlan.event : " No event data available"}</p>
                  <p>{trainingPlan.trainingPlan.end_date ? trainingPlan.trainingPlan.end_date : "No end date available"}</p>
                </div>
              </div>
            </div>

            <div className="border border-white w-4/5 rounded-md mt-10 h-auto justify-center">
              Metrics
            </div>
            


          </div>
      </>
  )


}