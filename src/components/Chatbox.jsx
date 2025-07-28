import { useContext } from "react";
import  SessionContext  from "../contex/SessionContext.js";
import supabase from "../supabase/supabase-client.js";

export default function Chatbox ({data}) {
    const {session} = useContext (SessionContext);

    const handleMessageSubmmit = async (event) => {
        event.preventDefault ();
        const inputMessage = event.currentTarget;
        const {message} = Object.fromEntries (new FormData(inputMessage));
        if (typeof message === "string" && message.trim().length !== 0) {
            const {error} = await supabase 
            .from ("messages")
            .insert ([{
                profile_id: session?.user.id,
                profile_username: session?.user.user_metadata.username,
                game_id: data.id,
                content: message,
            },
        ])
        .select();
        if(error) {
            console.log(error);
        } else {
            inputMessage.reset ();
        }
        }
    };

    return (
        <>
        <h4>Gamer chat</h4>
        <div>
            <Realtime data={data && data}/>
        </div>
        <div>
           <form onSubmit={handleMessageSubmmit}>
            <fieldset role="group">
                <input type="text" name="message" placeholder="Message" />
                <button type="submit"> Invia</button>
            </fieldset>
            </form>
        </div>
        </>
    );



}