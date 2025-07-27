import { Link } from "react-router";
import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client.js"
import Homepage from "../pages/homepage/index.jsx";


export default function Header () {

const [session, setSession] = useState (null);

const getSession = async () => {
    const {data, error} = await supabase.auth.getSession();
    if (error) setSession(null);
    console.log(data);
    setSession(data);
};

const singOut = async () => {
    if (error) console.log (error);
    alert('Signed out ')
    getSessione();
}


    useEffect(() => {
        useSession();
    }, []);



    return (
        <nav>
            <ul>
                <strong>Game Agency</strong>
            </ul>
            <ul>
                <li>
                    <a href="#" className="secondary"> Services </a>
                </li>
                <li>
                    <details className="dropdown">
                        <summary> Hey {session?.user.user_metadata.first_name}</summary>
                        <ul dir="rtl">
                            <Link to="/account"> Account</Link>
                            <li><button onClick={signOut}> Logout</button></li>
                        </ul>
                    </details>
                </li>
            </ul>
            :(
                <ul>
                    <li>
                        <Link to="/login" className="secondary"> Login </Link>
                    </li>
                    <li>
                        <Link to="/register" className="secondary"> Register </Link>
                    </li>
                </ul>
            )

        </nav>
    );
}