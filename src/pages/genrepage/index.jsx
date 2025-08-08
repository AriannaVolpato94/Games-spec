import { useParams } from "react-router";
import { useState, useEffect } from "react";
import CardGame from "../../components/CardGames.jsx";


export default function GenrePage() {
  const { genre } = useParams();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "be3a09d747db4e29af94d6251eda3a76";
  const initialUrl = `https://api.rawg.io/api/games?genres=${genre}&key=${API_KEY}`;

  const fetchGames = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) {
        throw new Error(`Errore ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [genre]);

  return (
    <div className="genre-grid">
      <h1>Benvenuti nella pagina {genre}</h1>

      {error && <article className="error-message">{error}</article>}

      {data?.results?.length > 0 ? (
        <div className="games-list">
          {data.results.map((game) => (
            <CardGame key={game.id} game={game} />
          ))}
        </div>
      ) : (
        !error && <p>Caricamento in corso o nessun gioco trovato...</p>
      )}
    </div>
  );
}

   