import axios from "axios";

//?aca la primera funcion es la funcion clave que hace conexion con nuestro backend...y lo que estamos haciendo justamente en esa funcion es traernos los videojuegos desde nuestro back ...

export const getVideogames = () => {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/videogames"); //conexion con el back
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data, // nuestro arreglo de videojuegos
    });
  };
};

// !FORMA DE PROMESA CON FETCH ... COMENTARIO PASO A PASO

// ?CREAMOS UNA VARIABLE A LA QUE LE ASIGNAMOS UNA FUNCION QUE RETORNA OTRA FUNCION CON EL ARGUMENTO DISPATCH Y ESA FUNCION RETORNA UN OBJETO QUE VA A CONTENER UN FETCH CON LAS PROMESAS DE ESA PETICION.
// export const getVideogames = () => (dispatch) => {
//   ?SI O SI TENEMOS QUE PONER EL RETURN ANTES DEL FETCH.. LO QUE HACEMOS ES HACER LA PETICION A NUESTRA RUTA EN EL BACKEND... O YA SEA TAMBIEN A UNA API.. (ESA PETICION YA PASA A SER UNA PROMESA...PORQUE TIENE QUE HACER UNA CONSULTA Y VA A DEMORAR, Y A SU VEZ PUEDE O NO RESOLVERSE Y ENVIARNOS LO QUE PEDIMOS O INDICARNOS UN ERROR)
//   return (
//     fetch("http://localhost:3001/videogames")
//       ?UNA VEZ ECHA ESA PETICION.. LO QUE DICE EN EL PRIMER THEN PRACTICAMENTE SERIA QUE NOS PROMETE QUE CUANDO OBTENGA LA RESPUESTA DE LA PETICION .. LE DECIMOS QUE CUANDO LA TENGA, NOS LA DEVUELVA EN FORMATO JSON.. POR ENDE ESTO NO ES INSTANTANEO ASI QUE SIGUE SIENDO UNA PROMESA... ENTONCES PASAMOS AL SEGUNDO THEN
//       .then((respuesta) => respuesta.json()) //.importante poner los parentesis despues del json..()
//       ?EN ESTE SEGUNDO THEN LO QUE HACEMOS ES OBTENER LA DATA O INFORMACION DE LA PROMESA QUE NOS HIZO EN EL PRIMER THEN, NOSOTRO CON ESA DATA LO QUE HACEMOS ES RETORNAR UN OBJETO EN DONDE UTILIZAMOS EL DISPATCH PASANDOLE UN OBJETO CON EL TYPE DE LA ACCION Y UN PAYLOAD.
//       .then((data) => {
//         console.log("ESTA ES LA DATA:", data);
//         dispatch({ type: "GET_VIDEOGAMES", payload: data });
//       })
//       ?Y POR ULTIMO LE COLOCAMOS UN CATCH.. PARA QUE OBTENGA EL ERROR EN CASO DE QUE ASI SUCEDA
//       .catch((err) => console.log(err))
//   );
// };

export const getGenres = () => {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
};

export const getNameGames = (name) => {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: "GET_NAME_GAMES",
        payload: json.data, //ESTO ME VA A DEVOLVER LO QUE ME DEVUELVA LA RUTA DEL JSON.. QUE SERIA EN ESTE CASO, EL JUEGO QUE LE PASO POR QUERY
      });
    } catch (error) {
      alert("Juego No Encontrado");
      console.log(error);
    }
  };
};

export const createVideoGame = (payload) => {
  return async (dispatch) => {
    const info = await axios.post("http://localhost:3001/videogames", payload);
    return dispatch({
      type: "CREATE_VIDEOGAME",
      info,
    });
  };
};

export const orden = (payload) => {
  return {
    type: "ORDER",
    payload,
  };
};

export const ordenRating = (payload) => {
  return {
    type: "ORDER_RATING",
    payload,
  };
};

export const filterGames = (payload) => {
  return {
    type: "FILTER_CREATE",
    payload,
  };
};

export const filterGenres = (payload) => {
  return {
    type: "FILTER_GENRES",
    payload,
  };
};

export const gameDetails = (id) => {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/videogame/${id}`); //conexion con el back
    return dispatch({
      type: "GAME_DETAILS",
      payload: json.data,
    });
  };
};

export const resetDetail = () => {
  return {
    type: "RESET_DETAIL",
  };
};

/*
//! QUE ES UN PAYLOAD?:
//? Un objeto de acción tiene un type:
//?  {
//?  type: "DELETE_POST",
//?  id: 123
//?  }

//? junto al type, por lo general, tiene algún tipo de datos que brindan más información sobre esta acción. Esto se llama "carga útil". En el objeto de acción anterior, el ides la carga útil.

//. Algunos programadores lo escribirían de esta manera:

//?   {
//?   type: "DELETE_POST",
//?   payload: {
//?   id: 123
//?            }
//?   }

//! y es principalmente una cuestión de estilo / convención. 
*/
