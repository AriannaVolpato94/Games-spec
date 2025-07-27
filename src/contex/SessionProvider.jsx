import {useState, useEffect} from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/supabase-client.js";

export default function Sessionprovider ({children}) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        if (event === "SIGNED_OUT") {
            setSession(null);
        } else if (session) {
            setSession(session);
        }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
    );
}