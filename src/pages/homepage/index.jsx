import {useState, useEffect} from 'react';
import CardGame from "../../components/CardGames.jsx";
import useFetchSolution from '../../costumHooks/hook/useFetch.jsx';

export default function Homepage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
   


    const initialUrl = "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added";

const load = async (url) => {
    try {
        const response = await useFetchSolutionetch(initialUrl);
    if (!response.ok) throw Error(response.statusText);    
        
        const json = await response.json();
        setData(json);
    } catch (error) {
        setError(error.message);
        setData(null);
    }
}

useEffect(() => {
    
})


    return (
        <>
        <h1>Homepage</h1>
       <div className="grid-genres.list">
           {error && <article>{error}</article>}    
           {data && data.results.map((game) => <CardGame key={game.id} game={game} />)}
       </div>
        </>
    )
};