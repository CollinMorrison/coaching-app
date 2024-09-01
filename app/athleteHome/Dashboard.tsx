'use client'

import getUserSession from "@/utils/Supabase/getUserSession";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Dashboard(trainingPlan: any) {
  const router = useRouter()
  const [editingMetrics, setEditingMetrics] = useState(false)

  // console.log("Today's workout:")
  // console.log(todayWorkout)
  // console.log("Training Plan:")
  // console.log(trainingPlan) 

  // Not sure why the todayWorkout object is contained within the trainingPlan object???

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
              <div className="m-5">
                Weather
              </div>
            </div>
            <div className="flex flex-row w-4/5 h-auto mt-10 justify-center">
              <div className="border border-white w-1/2 justify-center mr-1 ml-1 rounded-md">
                <div className="m-5">
                  <p className="font-extrabold mb-5">Today&lsquo;s Workout</p>
                  {trainingPlan.todayWorkout &&
                    <>
                      <p><span className="font-bold">Type: </span>{trainingPlan.todayWorkout.type ? trainingPlan.todayWorkout.type : "No workout type available"}</p>
                      <p><span className="font-bold">Duration: </span>{trainingPlan.todayWorkout.duration ? trainingPlan.todayWorkout.duration : "No workout duration available"}</p>
                      <p><span className="font-bold">Coach&lsquo;s Notes: </span>{trainingPlan.todayWorkout.coach_notes ? trainingPlan.todayWorkout.coach_notes : "No coach notes available"}</p>
                    </>
                  }
                  {!trainingPlan.todayWorkout &&
                    <p>No workout data available</p>
                  }
                  
                </div>
              </div>
              <div className="border border-white w-1/2 ml-1 mr-1 rounded-md">
                <div className="m-5">
                <p className="font-extrabold mb-5">Current Training Plan</p>
                  {trainingPlan.trainingPlan &&
                    <>
                      <p>{trainingPlan.trainingPlan.event ? trainingPlan.trainingPlan.event : " No event data available"}</p>
                      <p>{trainingPlan.trainingPlan.end_date ? trainingPlan.trainingPlan.end_date : "No end date available"}</p>
                    </>
                  }
                  {!trainingPlan.trainingPlan &&
                    <p>No training plan data available</p>
                  }

                </div>
              </div>
            </div>

            <div className="border border-white w-4/5 rounded-md mt-10 h-auto justify-center">
              <div className="m-5">
                <div className="flex justify-start">
                  <p className="font-extrabold mb-5">Metrics</p>
                  {!editingMetrics &&
                    <div className="w-full flex justify-end">
                      <button className="border border-white pl-2 pr-2 rounded-md justify-end h-min" onClick={() => {setEditingMetrics(true)}}>Edit</button>
                    </div>
                  }
                  {editingMetrics &&
                    <div className="w-full flex justify-end">
                      <button className="border border-white pl-2 pr-2 rounded-md justify-end h-min" onClick ={() => {setEditingMetrics(false)}}>Save</button>
                    </div>
                  }
                  
                </div>
                
                {trainingPlan.todayMetrics && !editingMetrics &&
                  <>
                    <p><span className="font-bold">RHR: </span>{trainingPlan.todayMetrics.resting_heart_rate ? trainingPlan.todayMetrics.resting_heart_rate : "No RHR"}</p>
                    <p><span className="font-bold">HRV Value: </span>{trainingPlan.todayMetrics.hrv_value ? trainingPlan.todayMetrics.hrv_value : "No HRV Value"}</p>
                    <p><span className="font-bold">HRV Status: </span>{trainingPlan.todayMetrics.hrv_status ? trainingPlan.todayMetrics.hrv_status : "No HRV Status"}</p>
                    <p><span className="font-bold">Sleep Score: </span>{trainingPlan.todayMetrics.sleep_score ? trainingPlan.todayMetrics.sleep_score : "No Sleep Score"}</p>
                  </>}
                {trainingPlan.todayMetrics && editingMetrics &&
                  <>
                    Editing Metrics
                  </>
                } 
              </div>
            </div>
            


          </div>
      </>
  )


}