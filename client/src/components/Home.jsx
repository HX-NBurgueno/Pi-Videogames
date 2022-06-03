/* eslint-disable no-unused-vars */
//?EL USE EFFECT NOS PERMITE COMO SIMULAR ENTRE COMILLAS, LOS ESTADOS DE UN COMPONENTE

import "../css/home.css";
import "../css/card.css";
import "../css/select.css";
import "../css/paginado.css";
import "../css/search.css";
import "../css/butonrefresh.css";
import "../css/butoncrearjuego.css";

import {
  filterGames,
  filterGenres,
  getGenres,
  getVideogames,
  orden,
  ordenRating,
} from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Card from "./Card";
import { Link } from "react-router-dom";
import Paginado from "./Paginado";
import Paginado2 from "./Paginado2";
import React from "react";
import SearchBar from "./SearchBar";

const Home = () => {
  const dispatch = useDispatch(); //ESTO LO QUE HACE ES GUARDARNOS UNA INSTANCIA DEL DESPACHADOR OSEA EL QUE DISPARA LAS ACCIONES DEL REDUCER, ENTONCES AHORA LO QUE PODEMOS HACER CON ESTA VARIABLE DISPATCH ES PASARLE UNA ACCION Y EL SE VA A ENCARGAR DE ENVIARSELA AL REDUCER.
  const allGenres = useSelector((state) => state.genres);
  const allGames = useSelector((state) => state.videogames); //.esto me trae el arreglo del estado. me trae del reducer el estado de videogames, este estado videogames va a tener todos los personajes(ESTO EN EL M2 ERA EL MAP STATE TO PROPS) ahora con el hook USESELECTO ES MAS SIMPLE Y SELECCIONAMOS EL ESTADO QUE QUEREMOS
  const [currentPage, setCurrentPage] = useState(1); //?que hicimos aca le dijimos, guardame en un estado la pagina actual y una constante que me setee la pagina actual y empieza en 1 porque siempre voy arrancar en la primer pagina
  const gamesPerPage = 15; //?en esta otra que es un estado local, me va a deci, guardame cuantos juegos quiero yo por pagina ... por eso le ponemos 15, asi pide el readme
  const [order, setOrder] = useState("");
  const indexOfLastGame = currentPage * gamesPerPage; //en un principio daria 15 esto ...
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
  const currentGame = allGames.slice(indexOfFirstGame, indexOfLastGame); //?Esto va a tener los juegos que estan en la pagina actual.
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //? LO QUE NECESITO HACER EN ESTE USEEFFECT ES DESPACHAR LA ACCION... PARA ESO LO QUE VAMOS A NECESITAR ES, EL HOOK USEDISPATCH... EN EL M2(LO HACIAMOS A ESO CON EL MAP DISPATCH TO PROPS..AHORA USAMOS ESTE HOOK SUPER SENCILLO) Y IMPORTAR LA ACCION QUE ES LA QUE HACE EL PEDIDO JUSTAMENTE.

  useEffect(() => {
    //con este use effect lo que estoy haciendo es disparar el get de generos cada vez que se renderiza el Form
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (!allGames.length) {
      dispatch(getVideogames());
    }
  }, [dispatch, allGames]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };

  const handleOrden = (e) => {
    e.preventDefault();
    dispatch(orden(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  const handleOrdenRating = (e) => {
    e.preventDefault();
    dispatch(ordenRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  const handleFilterGenres = (e) => {
    dispatch(filterGenres(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterCreados = (e) => {
    console.log(e.target.value);
    dispatch(filterGames(e.target.value));
    setCurrentPage(1);
  };
  return (
    <div className="home">
      <button className="bcreate">
        <Link className="create" to="/create">
          Crear Juego
        </Link>
      </button>
      <h1 className="welcome">FRIKIGAMES</h1>
      <button className="brefresh" onClick={(e) => handleClick(e)}>
        Volver a cargar todos los juegos
      </button>
      <div>
        <select className="cselect" onChange={(e) => handleOrden(e)}>
          <option className="coption" value="orden">
            ORDEN
          </option>
          <option className="coption" value="asc">
            A-Z
          </option>
          <option className="coption" value="desc">
            Z-A
          </option>
        </select>
        <select className="cselect" onChange={(e) => handleFilterGenres(e)}>
          <option className="coption" value="todos">
            GENEROS
          </option>
          <option className="coption" value="todos">
            Todos
          </option>
          {allGenres.map((e) => (
            <option key={e.id} className="coption" value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        <select
          className="cselect"
          onChange={(e) => {
            handleOrdenRating(e);
          }}
        >
          <option className="coption">RATING</option>
          <option className="coption" value="max">
            MAX
          </option>
          <option className="coption" value="min">
            MIN
          </option>
        </select>
        <select
          className="cselect"
          onChange={(e) => {
            handleFilterCreados(e);
          }}
        >
          <option className="coption" value="todos">
            JUEGOS
          </option>
          <option className="coption" value="todos">
            TODOS
          </option>
          <option className="coption" value="existentes">
            EXISTENTES
          </option>
          <option value="creados">CREADOS</option>
        </select>
        {/* <Paginado
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          paginado={paginado}
        /> */}
        <Paginado2 games={allGames} />
        <SearchBar />
        <div className="container">
          {allGames &&
            allGames.map((e) => {
              return (
                <div key={e.id}>
                  <Link to={`/home/${e.id}`} className="linkhome">
                    <Card
                      name={e.name}
                      image={e.background_image}
                      genres={e.genres.join(", ")}
                      rating={e.rating}
                      id={e.id}
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
