import React from "react";

function Paginado({ gamesPerPage, allGames, paginado }) {
  const pageNumber = [];

  //?Match.ceil, me redondea para arriba
  for (let i = 1; i < Math.ceil(allGames / gamesPerPage) + 1; i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumber &&
          pageNumber.map((number) => (
            <li className="number" key={number}>
              <button className="pbuton" onClick={() => paginado(number)}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Paginado;
