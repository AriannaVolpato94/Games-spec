import { useContext, useState } from "react";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import supabase from "../../supabase/supabase-client.js";
import SessoionContext from "../../context/SessionContext.js";

export default function ToggleFavorite ({data}) {
    const {session} = useContext (SessoionContext);
    const [favorites, setFavorites] = useState([]);

    const isFAvorites = () => favorites.find((el) => +el.game_id === data.id);

    const addFavorites = async (game) => {
        const {data, error} = await supabase
        .from ("favorites")
        .insert([
            {
                user_id: session?.user.id,
                game_id: game.id,
                game_name: game.name,
                game_image: game.background_image,
            },
        ])
        .select();
        if (error) {
            alert(error)
        } else {
            setFavorites(data);
        }
    };

    const removeFavorite = async (game) => {
        const {error} = await supabase 
        .from ("favorites")
        .delete()
        .eq("game_id", game.id)
        eq("user_id", session?.user.id)
        if (error) {
            alert (error);
        } else {
            setFavoritr((prev) =>
            prev.filter (
                (el) => el.game__id !== game.id && el.user_id !== session?.user.id
            ))
        }
    }

    return (
        <div>
            {isFAvorites() ? (
            <button onClick={() => removeFavorite(data.id)}>
                <FaHeart />
            </button>
            ) : (
            <button onClick={() => addFavorites(data)}>
            <FaRegHeart />
            </button> 
            )}
        </div>
    )
}