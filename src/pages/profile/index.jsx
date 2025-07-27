import {useContex} from 'react';
import SessionContext from '../../contex/SessionContext.js';
import FavoritesContext from '../../contex/FavoritesContext.js';
import {FaTrashAlt} from 'react-icons/fa';

const favoriteGameUI ={
    dispaly: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

export default function ProfilePage () {
    const {session} = useContext(SessionContext);
    const {favorites, removeFavorite} = useContext(FavoritesContext);

    return (
<div className="container">
<h2>Hey {session?.user.user_metadata.first_name}</h2>
    <details className="dropdown">
        <summary>My Favorites</summary>
       {favorites.length === 0 && <small>Non ci sono favoriti al momento...</small>}
        <ul>
            {favorites.map((favorite) => (
                <li key={favorite.game_id} style={favoriteGameUI}>
                    <p>{favorite.game_name}</p>
                    <button onClick={() => removeFavorite(favorite.game_id)}>
                        <FaTrashAlt />
                    </button>
                </li>
            ))}
        </ul>
    </details>
</div>
    );

}