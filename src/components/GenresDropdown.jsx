
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GenresDropdown() {
  const [genres, setGenres] = useState(null);
  const [error, setError] = useState(null);

  const initialUrl =
    "https://api.rawg.io/api/genres?key=be3a09d747db4e29af94d6251eda3a76";

  const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();
      setGenres(json);
    } catch (error) {
      setError(error.message);
      setGenres(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <details className="dropdown">
      <summary>Genres</summary>
      {error && <small>{error}</small>}
      <ul>
        {genres?.results?.map((genre) => (
          <li key={genre.id}>
            <Link to={`/genres/${genre.slug}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
