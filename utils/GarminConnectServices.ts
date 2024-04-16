import { GarminConnect } from "garmin-connect";
import fs from "fs"
import { IOauth1Token, IOauth2Token } from "garmin-connect/dist/garmin/types";

export default async function login (username: string, password: string) {
    // create a new client with the credentials
    const GCClient = new GarminConnect({
        username: username,
        password: password
    })
    console.log("Username: " + username)
    console.log("Password: " + password)

    // make sure the files exist
    if (!fs.existsSync(`oauth1${username}.json`)) fs.writeFile(`oauth1${username}.json`, '', (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('Successfully created file');
        }
    })
    if (!fs.existsSync(`oauth2${username}.json`)) fs.writeFile(`oauth2${username}.json`, '', (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('Successfully created file');
        }
    })
    
    let oauth1: IOauth1Token | undefined
    let oauth2: IOauth2Token | undefined
    // check to see if the credential files are populated
    // todo: this is throwing an error if the file is not populated
    try {
        oauth1 = JSON.parse(fs.readFileSync(`oauth1${username}.json`, 'utf-8'))
        oauth2 = JSON.parse(fs.readFileSync(`oauth2${username}.json`, 'utf-8'))
    } catch(error) {
        console.log('Current credentials do not exist for this user')
    }
   
    
    
    if(oauth1 && oauth2) {
        console.log('REFRESHING USING TOKENS')
        try {
            GCClient.loadToken(oauth1, oauth2);
        } catch {
            console.log('TOKENS OUT OF DATE')
            loginHelper(GCClient, username, password)
        }
    }
    else {
        loginHelper(GCClient, username, password)
    }
    return GCClient
}


/**
 * Handles the case that refresh tokens either don't exist or are out of date
 * @param GCClient 
 * @param username 
 * @param password 
 */
async function loginHelper(GCClient: GarminConnect, username: string, password: string) {
    console.log('CREATING A FRESH SESSION')
    // console.log(GCClient.)
        await GCClient.login()

        fs.rm(`oauth1${username}.json`, (err) => {
        if (err) {
            console.log('Error removing oauth1.json')
        } else {
            console.log('Successfully removed oauth1.json')
        }
        })
        fs.rm(`oauth2${username}.json`, (err) => {
        if (err) {
            console.log('Error removing oauth2.json')
        } else {
            console.log('Successfully removed oauth2.json')
        }
        })

        let oauth1: IOauth1Token | undefined = GCClient.client.oauth1Token
        fs.writeFile(`oauth1${username}.json`, JSON.stringify(oauth1), (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('Successfully wrote file');
        }
        })
        let oauth2: IOauth2Token | undefined = GCClient.client.oauth2Token
        fs.writeFile(`oauth2${username}.json`, JSON.stringify(oauth2), (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('Successfully wrote file');
        }
        })
        // console.dir(oauth1)
        // console.dir(oauth2)
}