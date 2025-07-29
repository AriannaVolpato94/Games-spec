import { useState, useEffect } from 'react';
import CardGame from '../../components/CardGames.jsx';

export default function Homepage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const initialUrl = "https://api.rawg.io/api/games?key=be3a09d747db4e29af94d6251eda3a76";

  const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <h1>Homepage</h1>
      <div className="grid-genres-list">
        {error && <article>{error}</article>}
        {data && data.results.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </div>
    </>
  );
}
