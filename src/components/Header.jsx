import { Link } from "react-router-dom";  // correzione import Link
import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client.js";

export default function Header() {
  const [session, setSession] = useState(null);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      setSession(null);
      console.error(error);
    } else {
      setSession(data.session);
    }
  };

  
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Errore durante il logout:", error.message);
    } else {
      alert("Signed out");
      setSession(null);
    }
  };

  useEffect(() => {
    getSession();

    
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

   return () => {
  if (listener?.subscription?.unsubscribe) {
    listener.subscription.unsubscribe();
  }
};

  }, []);

  return (
    <nav>
      <ul>
        <strong>Game Agency</strong>
      </ul>

      {session ? (
        <ul>
          <li>
            <a href="#" className="secondary">Services</a>
          </li>
          <li>
            <details className="dropdown">
              <summary>Hey {session.user.user_metadata.first_name}</summary>
              <ul dir="rtl">
                <li>
                  <Link to="/account">Account</Link>
                </li>
                <li>
                  <button onClick={signOut}>Logout</button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login" className="secondary">Login</Link>
          </li>
          <li>
            <Link to="/register" className="secondary">Register</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
