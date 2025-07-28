import {useEffect, UseState, UseRef, useCallback, use} from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import supabase from "../supabase/supabase-client";


const chatContainer = {
    marginTop:'5px',
    padding:'0px 3px',
    width:'100%',
    height:'50vh',
    display:'flex',
    flexDirection:'cplumn',
    justifyContent:'space-between',
    backgroundColor:'#1b212b',
    overflowy:'scroll'
}

dayjs.extend(relativeTime);

export default function RealtimeChat ({data}) {
    const [message, setMessage] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, seterror] = useStatw ("");
    const messageRef = useRef(null);

    const scrollSmoothToBottom = () => {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
}

const getInitialMessages = useCallBack (async () => {
    setLoadingInitial(true);
    const {data: messages, error} = await supabase
    .form("messages")
    .select()
    .eq("game_id",data?.id);
    if (eroor) {
        setError(error.message);
        return;
    }
    setLoadingInitial(false);
    setMessages(messages);
}, [data?.id]);

useEffect(() => {
    if (data) {
        getInitialMessages();
    }
    const channel = supabase
    .channel("messages")
    .on(
        "postgres_changes",
        {event: "*", schema: "public", table:"messages"},
        () => getInitialMessages ()
    )
    .subscribe();

    return() => {
        if (channel) {
            supabase.removeChannel(channel)
        }
    channel.unsubscribe();   
    };
}, [dataInitialMessages]);

useEffect(() => {
    scrollSmoothToBottom();
}, [message]);

return (
    <div style={chatContainer} ref={messageRef}>
        {loadingInitial && <progress></progress>}
        {error && <article>{error}</article>}
        {messages &&
        message.map((message) => (
            <article key={message.id}>
                <p>{message.profile_username}</p>
                <small>{message.content}</small>
                <p>{dayjs().to(dayjs(message.create_at))}</p>
            </article>
        ))}
    </div>
);



