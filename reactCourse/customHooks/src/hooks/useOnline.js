/*
What does useOnline() do?
useOnline() tells you whether the user is currently online or offline, in real time.
When internet disconnects → isOnline becomes false
When internet reconnects → isOnline becomes true
This lets you show:
“No Internet” message
Disable buttons
Offline banner
Save data locally and sync later
*/

import { useEffect, useState } from "react"

export const useOnline = () => {
    //navigator.onLine-> return true if user is online , false if user is offline.
    const [online, setOnline] = useState(navigator.onLine)

    //Make the effect run when component mounts

    useEffect(() => {
        const handleOffline = () => {
            setOnline(false);
        }

        const handleOnline = () => {
            setOnline(true);
        }

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        //We need to clean the event listner before rerunnning the effect to prevent calling calls to events multiple time.
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        }
    }, [])

    return online;
}