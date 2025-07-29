import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function CardGame({ game }) {
  const genres = game.genres.map((genre) => genre.name).join(", ");

  return (
    <article key={game.id} className="card-game">
      <LazyLoadImage
        src={game.background_image}
        alt={game.name}
        effect="blur"
        width="100%"
      />
      <strong>{game.name}</strong>
      <small>{genres}</small>
      <p> {game.released}</p>
      
      <Link to={`/game/${game.slug}/${game.id}`}>
        <button>Vedi Dettagli</button>
      </Link>
    </article>
  );
}
