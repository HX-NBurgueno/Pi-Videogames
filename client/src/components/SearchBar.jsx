import React, { useState } from "react";

import { getNameGames } from "../actions/index";
import { useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      return alert("Ingresar un nombre por favor.");
    } else {
      dispatch(getNameGames(name));
      setName("");
      document.getElementById("search").reset();
    }
  };

  return (
    <form id="search">
      <input
        className="Sinput"
        type="text"
        placeholder="Buscar..."
        onChange={handleInputChange}
      />
      <button className="Sbuton" type="submit" onClick={handleSubmit}>
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
