import { useParams } from "react-router";
import { useState, useEffect } from "react";
import CardGame from "../../components/CardGames.jsx";


export default function GenrePage () {
    const { genre } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games?genres=${genre}&key=be3a09d747db4e29af94d6251eda3a76`;

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) 
                throw new Error(response.statusText);
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message);
            setData(null);
        }
    };

    useEffect(() => {
        load();
    }, [genre]);

    return (
        <div className="grid-genres.list">
            <h1> Benvenuti nella{genre} pagina</h1>
            {error && <article>{error}</article>}
            {data && data.results.map((game) =>
                 <CardGame key={game.id} game={game} />)}
        </div>
    );
}



   