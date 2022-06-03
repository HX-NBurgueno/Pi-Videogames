import "../App";

import React, { useState } from "react";

import { useSelector } from "react-redux";

function Paginado2(props) {
  //? paso a paso --->

  //? traemos el estado de los juegos  y lo guardamos en la variable juegos!

  const juegos = useSelector((e) => e.videogames);

  const [currentPage, setCurrentPage] = useState(1); //?este estado local lo generamos para indicar nuestra pagina actual, y siempre la actual como inical va a ser en 1 y por que siempre hay una pagina que mostrar si tenemos elementos y esa pagina seria la primera de tantas

  const [gamesPerPage, setGamesPerPage] = useState(15); //?este estado local es para decir la cantidad de juegos que queremos mostrar por pagina

  const [pageNumberLimit, setPageNumberLimit] = useState(5); //?este estado local es para decir la cantidad de numeros de paginas que queremos mostrar en el paginado

  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5); //?este estado local es para decir el limite de paginas maximas

  const [minPageNumberLimit, setMinPageNumberLimit] = useState(5); //?este estado local es para decir el limite de paginas minimas

  const indexOfLastItem = currentPage * gamesPerPage; //? lo que hacemos en esta variable es declarar el indice de nuestro ultimo elemento dentro del paginado seria 15
  console.log("Vamos viendo nuestro utlimo indice", indexOfLastItem);
  const indexOfFirstItem = indexOfLastItem - gamesPerPage; //? lo que hacemos en esta variable es declarar el indice de nuestro primer elemento dentro del paginado seria 0
  console.log("Vamos viendo nuestro primer indice", indexOfFirstItem);

  const juegosActuales = props.games.slice(indexOfFirstItem, indexOfLastItem); //? estamos partiendo nuestro array de juegos en 15, que es lo que queremos mostrar...
  //.El método slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido)
  console.log(juegosActuales);
  const handleClick = (e) => {
    setCurrentPage(e.target.id);
    console.log(e.target.id); //? esto es para que cuando hagamos click en un numero de paginado, nos lleve a esa pagina
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(props.games.length / gamesPerPage); i++) {
    pages.push(i);
  }
  //.La función Math.ceil() devuelve el entero mayor o igual más próximo a un número dado.
  //? En nuestro array de paginas vamos a tener las paginas que necesitamos por la cantidad de juegos que tenemos... eso lo logramos haciendo el for que esta arriba, en donde la logica del for consiste en inicializar i en 1 que seria la primer pagina y mientras sea menor o igual a la division de todos los juegos dividido los juegos por pagina, que en este caso seria (100 / 15) = 6.66666 y con el Math.ceil nos quedaria en 7 que es la cantidad de paginas que necesitamos.
  console.log(props.games);
  console.log(pages);
  return (
    <nav>
      <ul>
        {pages &&
          pages.map((number) => (
            <li className="number" key={number}>
              <button id={number} className="pbuton" onClick={handleClick}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Paginado2;
