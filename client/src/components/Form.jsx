import "../css/form.css";

import React, { useEffect, useState } from "react";
import { createVideoGame, getGenres } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

function Form() {
  const dispatch = useDispatch();
  const generos = useSelector((state) => state.genres);

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
    background_image: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckPlatforms = (e) => {
    if (e.target.checked) {
      console.log(input.platforms);
      console.log(e.target.value);
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    } else if (!e.target.checked) {
      setInput({
        ...input,
        platforms: input.platforms.filter((gen) => gen !== e.target.value),
      });
    }
  };

  const handleCheckGenres = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        genres: [...input.genres, { name: e.target.value }],
      });
    } else if (!e.target.checked) {
      setInput({
        ...input,
        genres: input.genres.filter((gen) => gen.name !== e.target.value),
      });
    }
  };

  const borraEstados = (e) => {
    setInput({
      ...input,
      name: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
      background_image: "",
    });
  };

  const { name, description, released, rating, genres, platforms } = input;

  function handleSubmit(e) {
    e.preventDefault();
    //?VALIDAR
    if (name.trim() === "" || name.length < 2 || name.length > 15) {
      return alert("Colocar un nombre: debe tener entre 2 a 15 caracteres");
    } else if (
      description.trim() === "" ||
      description.length < 2 ||
      description.length > 255
    ) {
      return alert(
        "Colocar una descripcion: debe tener entre 2 a 255 caracteres"
      );
    } else if (released.trim() === "") {
      return alert("Colocar Fecha");
    } else if (
      rating === "" ||
      rating > "5" ||
      rating > 5 ||
      rating < "1" ||
      rating < 1
    ) {
      return alert("Colocar Rating: debe tener un valor mayor a 1 y menor a 5");
    } else if (genres.length === 0) {
      return alert("Colocar Al Menos Un Genero");
    } else if (platforms.length === 0) {
      return alert("Colocar Al Menos Una Plataforma");
    } else {
      dispatch(createVideoGame(input));
      alert("Juego Creado");
      borraEstados();
      document.getElementById("myForm").reset();
    }
  }

  useEffect(() => {
    //con este use effect lo que estoy haciendo es disparar el get de generos cada vez que se renderiza el Form
    dispatch(getGenres());
  }, [dispatch]);

  let plataformas = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "GameCube",
    "Game Boy",
    "SNES",
    "NES",
    "Commodore",
    "Atari",
    "Genesis",
    " SEGA",
    "Dreamcast",
    "3DS",
    "Game Gear",
    "Neo Geo",
    "PS5",
    "WiiU",
    "PS2"
  ];

  return (
    <div className="formcontainer">
      <button className="bvolver">
        <Link className="Linkform" to="/home">
          Volver
        </Link>
      </button>
      <h1 className="cgame">CREATE YOUR GAME</h1>
      <div className="divExForm">
        <form className="form" id="myForm" onSubmit={(e) => handleSubmit(e)}>
          <div className="divInForm">
            <div className="divNombre">
              <label className="labelI">Nombre</label>
              <input
                className="inputN"
                type="text"
                name="name"
                value={input.name}
                placeholder="FIFA 22, GTA SAN ANDREAS"
                onChange={handleChange}
              />
            </div>
            <div className="divDescripcion">
              <label className="labelI">Descripcion </label>
              <input
                className="input"
                type="text"
                name="description"
                value={input.description}
                placeholder="..."
                onChange={handleChange}
              />
            </div>
            <div className="divFecha">
              <label className="labelI">Fecha De Lanzamiento </label>
              <input
                className="inputF"
                type="date"
                name="released"
                value={input.released}
                placeholder="10-09-2021"
                onChange={handleChange}
              />
            </div>
            <div className="divRating">
              <label className="labelI">Rating </label>
              <input
                className="inputR"
                type="number"
                name="rating"
                value={input.rating}
                placeholder="4"
                onChange={handleChange}
              />
            </div>
            <div className="divImagen">
              <label className="labelI">Imagen </label>
              <input
                className="inputI"
                type="text"
                name="background_image"
                value={input.background_image}
                placeholder="URL DE IMAGEN ...."
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="checkG">
            <label className="label">Generos: </label>
            <div className="checkGint">
              {generos.map((e) => (
                <label className="Clabel" key={e.id}>
                  <input
                    type="checkbox"
                    name="genres"
                    id="checkg"
                    value={e.name}
                    onClick={handleCheckGenres}
                  />
                  {e.name}
                </label>
              ))}
            </div>
          </div>
          <div className="checkP">
            <label className="label">Plataforma/s: </label>
            <div className="checkPint">
              {plataformas.map((e) => (
                <label className="Plabel" key={e}>
                  <input
                    type="checkbox"
                    onClick={handleCheckPlatforms}
                    value={e}
                    name="platforms"
                  />
                  {e}
                </label>
              ))}
            </div>
          </div>
          <button className="submit" type="submit">
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
