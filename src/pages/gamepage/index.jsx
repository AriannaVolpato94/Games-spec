import {data, Link} from "react-router-dom";
import { useEffect, useState } from "react";  


export default function GamePage() {
    const {id} = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=be3a09d747db4e29af94d6251eda3a76`;

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
    }, [id]);

return (
    <>
     {error && <h1>{error}</h1>}
    <div className="style-gamepage">
    <div className="style-game-info">
    <p>{data && data.relased}</p> 
    <h1>{data && data.name}</h1>
    <p>Rating: {data && data.rating}</p>
    <p>{data && data.description_raw}</p>
    </div>
    <div className="style-game-image">
    <img src={data && data.background_image} alt="" />
    </div>
    </div>
    </>
)

}


