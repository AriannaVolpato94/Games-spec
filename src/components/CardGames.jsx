import { Link } from "react-router-dom";

export default function CardGAme ({game}){

const genres = game.genres.map((genre) => genre.name).join(", ");

return (
    <article key={game.id}>
    <LazyLoadImage image={image} />
    <strong>{game.name}</strong>
    <small>{genres}</small>
    <p>{game.released}</p>
    <button> 
    <Link to={`/game/${game.slug}/${game.id}`}> </Link>
    </button>        
    </article>
);



}