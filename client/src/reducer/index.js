//?LO QUE HACEMOS ACA EN EL REDUCER ES RECIBIR LAS ACCIONES ..
//CUANDO EJECUTEMOS UNA ACCION, POR EJEMPLO EN EL COMPONENTE HOME EL USEEFECT HACE JUSTAMENTE UNA EJECUCION DE LA ACCION GET_VIDEOGAMES, ENTONCES CUANDO ESO SUCEDA ESA ACCION LO QUE VA A HACER ES LO QUE LE DEFINIMOS QUE HAGA.. OSEA QUE NOS DEVUELVE EL STADO INICIAL(SI HAY ALGO O SINO) Y LE AGREGA LO QUE SE RECIBIO POR EL ACTION.PAYLOAD EN ESTE CASO EL ARREGLO CON TODOS LOS VIDEOJUEGOS.

const initialState = {
  videogames: [],
  allVideoGames: [],
  genres: [],
  platforms: [],
  details: [],
};
//!ES IMPORTANTE PASAR LOS ARGUMENTOS AL ROOT REDUCER EN ORDEN.. PRIMERO RECIBE EL STATE  Y DESPUES LA ACCION, NO PUEDE SER AL REVEZ, OJO !

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload, //arreglo de videojuegos
        allVideoGames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_NAME_GAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    case "CREATE_VIDEOGAME":
      return {
        ...state,
      };
    case "ORDER":
      const orden =
        action.payload === "asc" || action.payload === "orden"
          ? state.videogames.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: orden,
      };
    case "ORDER_RATING":
      const ordenRating =
        action.payload === "min"
          ? state.videogames.sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: ordenRating,
      };
    case "FILTER_CREATE":
      const tjuegos = [...state.allVideoGames];
      const gamesFilter =
        action.payload === "creados"
          ? tjuegos.filter((e) => e.createdInDb)
          : tjuegos.filter((e) => !e.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "todos" ? state.allVideoGames : gamesFilter,
      };
    case "FILTER_GENRES":
      let juegos = state.allVideoGames;
      let filterGenre = juegos.filter((e) => e.genres.includes(action.payload));
      return {
        ...state,
        videogames:
          action.payload === "todos" ? state.allVideoGames : filterGenre,
      };
    case "GAME_DETAILS":
      return {
        ...state,
        details: action.payload,
      };
    case "RESET_DETAIL":
      return {
        ...state,
        details: [],
      };

    default:
      return state;
  }
};

export default rootReducer;
