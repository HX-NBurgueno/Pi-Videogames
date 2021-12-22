// ?EL USE EFFECT NOS PERMITE COMO SIMULAR ENTRE COMILLAS, LOS ESTADOS DE UN COMPONENTE

// import "../App";

// import { getGenres, getVideogames } from "../actions/index";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";

// import Card from "./Card";
// import Paginado2 from "./Paginado2";
// import React from "react";

// const Home2 = () => {
//   const dispatch = useDispatch(); //ESTO LO QUE HACE ES GUARDARNOS UNA INSTANCIA DEL DESPACHADOR OSEA EL QUE DISPARA LAS ACCIONES DEL REDUCER, ENTONCES AHORA LO QUE PODEMOS HACER CON ESTA VARIABLE DISPATCH ES PASARLE UNA ACCION Y EL SE VA A ENCARGAR DE ENVIARSELA AL REDUCER.

//   const allGames = useSelector((state) => state.videogames); //.esto me trae el arreglo del estado. me trae del reducer el estado de videogames, este estado videogames va a tener todos los personajes(ESTO EN EL M2 ERA EL MAP STATE TO PROPS) ahora con el hook USESELECTO ES MAS SIMPLE Y SELECCIONAMOS EL ESTADO QUE QUEREMOS
//   const currentGame = allGames.slice(0, 15);

//   ? LO QUE NECESITO HACER EN ESTE USEEFFECT ES DESPACHAR LA ACCION... PARA ESO LO QUE VAMOS A NECESITAR ES, EL HOOK USEDISPATCH... EN EL M2(LO HACIAMOS A ESO CON EL MAP DISPATCH TO PROPS..AHORA USAMOS ESTE HOOK SUPER SENCILLO) Y IMPORTAR LA ACCION QUE ES LA QUE HACE EL PEDIDO JUSTAMENTE.
//   useEffect(() => {
//     dispatch(getVideogames());
//   }, [dispatch]);

//   return (
//     <div className="home">
//       <h1>VIDEO JUEGOS PI !</h1>
//       <div>
//         <div className="container">
//           {currentGame.map((e) => {
//             return (
//               <Card
//                 key={e.id}
//                 name={e.name}
//                 image={e.background_image}
//                 genres={e.genres}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home2;
