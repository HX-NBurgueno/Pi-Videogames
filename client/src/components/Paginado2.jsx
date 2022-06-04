import "../App";

import Card from "./Card";
import { ImArrowLeft } from "react-icons/im";
import { Link } from "react-router-dom";
import React from "react";
import SearchBar from "./SearchBar";

function Paginado2({ games, setCurrentPage, currentPage }) {
  //? paso a paso --->

  const gamesPerPage = 15; //?este estado local es para decir la cantidad de juegos que queremos mostrar por pagina

  const indexOfLastItem = currentPage * gamesPerPage; //? lo que hacemos en esta variable es declarar el indice de nuestro ultimo elemento dentro del paginado seria 15
  console.log("Vamos viendo nuestro utlimo indice", indexOfLastItem);
  const indexOfFirstItem = indexOfLastItem - gamesPerPage; //? lo que hacemos en esta variable es declarar el indice de nuestro primer elemento dentro del paginado seria 0
  console.log("Vamos viendo nuestro primer indice", indexOfFirstItem);

  const juegosActuales = games.slice(indexOfFirstItem, indexOfLastItem); //? estamos partiendo nuestro array de juegos en 15, que es lo que queremos mostrar...
  //.El método slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido)
  console.log("Juegos actuales", juegosActuales);
  const handleClick = (e) => {
    setCurrentPage(e.target.id);
    // console.log(e.target.id); //? esto es para que cuando hagamos click en un numero de paginado, nos lleve a esa pagina
  };

  const prevClick = (e) => {
    if (e.target.id > 1) {
      return setCurrentPage(e.target.id - 1);
    }
  };

  const nextClick = (e) => {
    if (e.target.id < pages.length) {
      console.log("antes", e.target.id);
      ++e.target.id;
      console.log("despues", e.target.id);
      console.log(pages.length);
      console.log(currentPage);
      return setCurrentPage(e.target.id);
    }
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(games.length / gamesPerPage); i++) {
    pages.push(i);
  }
  //.La función Math.ceil() devuelve el entero mayor o igual más próximo a un número dado.
  //? En nuestro array de paginas vamos a tener las paginas que necesitamos por la cantidad de juegos que tenemos... eso lo logramos haciendo el for que esta arriba, en donde la logica del for consiste en inicializar i en 1 que seria la primer pagina y mientras sea menor o igual a la division de todos los juegos dividido los juegos por pagina, que en este caso seria (100 / 15) = 6.66666 y con el Math.ceil nos quedaria en 7 que es la cantidad de paginas que necesitamos.
  console.log("cantidad de paginas", pages);
  return (
    <div>
      <SearchBar />
      <div className="row">
        <ul className="ul">
          <button id={currentPage} className="flecha" onClick={prevClick}>
            <ImArrowLeft />
          </button>
          {pages &&
            pages.map((number) => (
              <li className="number" key={number}>
                <button id={number} className="pbuton" onClick={handleClick}>
                  {number}
                </button>
              </li>
            ))}
          <button id={currentPage} onClick={nextClick}>
            next
          </button>
        </ul>
      </div>
      <div className="container">
        {juegosActuales &&
          juegosActuales.map((e) => {
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
  );
}

export default Paginado2;
