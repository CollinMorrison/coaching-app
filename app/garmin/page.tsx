import Image from "next/image";
import { Card, CardBody } from "@nextui-org/react";
import login from '@/utils/GarminConnectServices'
import names from '@/accounts'
import { GarminConnect } from "garmin-connect";
import { IActivity, ISocialProfile } from "garmin-connect/dist/garmin/types";


export default async function GarminIntegration() {
  let GCClient: GarminConnect

  // use maps to handle the data associated with the names
  let nameActivitiesMap: Map<string, IActivity[]> = new Map<string, IActivity[]>()
  let nameProfileMap: Map<string, ISocialProfile> = new Map<string, ISocialProfile>()
  let nameHeartRateMap: Map<string, Awaited<typeof GCClient.getHeartRate>> = new Map<string, Awaited<typeof GCClient.getHeartRate>>()
  
  // load all the data into the maps
  let usernameString: string
  let passwordString: string
  for (let name of names) {
    usernameString = `${name}_USERNAME`
    passwordString = `${name}_PASSWORD`
    if (!process.env[usernameString] || !process.env[passwordString]) {
      console.log(`invalid credentials for ${name}`)
    }
    // we need a new client for each set of credentials
    GCClient = await login(process.env[usernameString]!, process.env[passwordString]!)

    const userProfile = await GCClient.getUserProfile()
    nameProfileMap.set(name, userProfile)
    // console.dir(userProfile)

    const activities = await GCClient.getActivities()
    nameActivitiesMap.set(name, activities)
    // console.dir(activities)

    const heartRate = await GCClient.getHeartRate()
    nameHeartRateMap.set(name, heartRate)
    // console.dir(heartRate)

  }

  return (
    <main>
      <div className="text-3xl font-bold mb-8 mt-4">
        Dashboard
      </div>
      {/* <div>
        RHR: 
        <span className="ml-1">
          {heartRate.restingHeartRate}
        </span>
      </div> */}
      <div className="flex flex-wrap">
        {names.map((name) => {
          return (
            <div key={name}>
              <div>
                {name}
              </div>
            {nameActivitiesMap.get(name)!.map((activity) => {
              return (
                <div className="w-1/4 bg-gray-400 m-4 border rounded-md" key={activity.activityId}>
                  <Card>
                    <CardBody>
                      {activity.activityType.typeKey}
                      {activity.activityType.typeKey === 'running' &&
                        <p>
                          AVG HR: {activity.averageHR}
                          Distance: {activity.distance}
                          Duration: {activity.duration}
                        </p>
                      }
                    </CardBody>
                  </Card>
                </div>
              )
            })}
            </div>
          )
        })}
        {/* {activities.map((activity) => {
          return (
            <div className="w-1/4 bg-gray-400 m-4 border rounded-md">
              <Card>
                <CardBody>
                  {activity.activityType.typeKey}
                  {activity.activityType.typeKey === 'running' &&
                    <p>
                      AVG HR: {activity.averageHR}
                      Distance: {activity.distance}
                      Duration: {activity.duration}
                    </p>
                  }
                </CardBody>
              </Card>
            </div>
          )
        })} */}
      </div>
    </main>

  );
}
