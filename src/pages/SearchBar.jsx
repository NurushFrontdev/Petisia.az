import React from "react";
import "../css/SearchBar.scss";
function SearchBar({ query, setQuery }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="search-form">
      <input
        type="text"
        placeholder="Kampaniya axtarın..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Axtar</button>
    </form>
  );
}

export default SearchBar;
