import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const [ariainvalid, setAriainvalid] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (typeof search === "string" && search.trim().length !== 0) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
      setSearch("");
      setAriainvalid(false);
    } else {
      setAriainvalid(true);
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    if (ariainvalid) setAriainvalid(false);
  };

  return (
    <form onSubmit={handleSearch}>
      <fieldset role="group">
        <input
          type="text"
          name="search"
          placeholder={ariainvalid ? "Devi cercare qualcosa" : "Search game"}
          onChange={handleChange}
          value={search}
          aria-invalid={ariainvalid}
          aria-describedby={ariainvalid ? "error-msg" : undefined}
        />
        {ariainvalid && (
          <p id="error-msg" style={{ color: "red", marginTop: "0.2em" }}>
            Inserisci un termine di ricerca valido.
          </p>
        )}
      </fieldset>
    </form>
  );
}
