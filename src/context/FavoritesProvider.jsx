import { useCallback, useEffect, useState, useContext } from "react";
import supabase from "../supabase/supabase-client.js";
import SessionContext from "./SessionContext.js";
import FavoritesContext from "./FavoritesContext.js";


export default function FavoritesProvider ({children}) {
    const [favorites, setFavorites] = useState([]);
    const sessionContext = useContext(SessionContext);

if (!sessionContext) {
  throw new Error("FavoritesProvider must be used within a SessionProvider");
}

const { session } = sessionContext;


const getFavorites = useCallback(async () => {
    let { data: favourites, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", session?.user.id);
    if (error) {
      console.log(error);
      console.log("Errore in console");
    } else {
      setFavorites(favourites);
    }
  }, [session]);

  const addFavorites = async (game) => {
    await supabase
      .from("favorites")
      .insert([
        {
          user_id: session?.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();
  };

  const removeFavorite = async (gameId) => {
    await supabase
      .from("favorites")
      .delete()
      .eq("game_id", gameId)
      .eq("user_id", session?.user.id);
  };

  useEffect(() => {
    if (session) {
      getFavorites()
    }
    const favorites = supabase
      .channel("favorites")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "favorites" },
        () => getFavorites()
      )
      .subscribe();

    return () => {
      if (favorites) {
        supabase.removeChannel(favorites);
      }
      favorites.unsubscribe();
    };
  }, [getFavorites, session]);

return(<FavoritesContext.Provider value={{favorites, setFavorites, addFavorites, removeFavorite}}>{children}</FavoritesContext.Provider>)


}