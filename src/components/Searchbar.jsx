import { useEffect, useState } from "react";   
import { useNavigate } from "react-router-dom";
import CardGAme from "../components/CardGames.jsx";
import useFetchSolution  from "../costumHooks/hook/useFetch.jsx";

export default function Searchbar() {
    const [ariainvalid, setAriainvalid] = useState (null);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !==0) {
            navigate(`/search?query=${search}`);
      setSearch("");
        } else {
            setAriainvalid(true)
        }
};

return (
    <form onSubmit={handleSearch}>
        <fieldset role="group">
            <input 
            type="text"
            name="search"
            placeholder={ariainvalid ?  "Devi cercare qualcosa" : "Search game"}
            onChange={(event) => setSearch(event.target.value)}
            value={search}
            aria-invalid={ariainvalid}
             />
        </fieldset>
    </form>
);


}
