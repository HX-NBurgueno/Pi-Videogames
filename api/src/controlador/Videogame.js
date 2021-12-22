require("dotenv").config();
const axios = require("axios");
const { API } = process.env;
const { Videogame, Genre } = require("../db");
const { getDbInfo } = require("./DataDB");

//? ---------------------------------------------------------------

const getApiInfo = async () => {
  let videogames = [];
  let url = `https://api.rawg.io/api/games?key=${API}`;
  try {
    for (let i = 0; i < 5; i++) {
      let pages = await axios.get(url);
      pages.data.results.map((e) => {
        videogames.push({
          id: e.id,
          name: e.name,
          released: e.released,
          rating: e.rating,
          platforms: e.platforms.map((e) => e.platform.name),
          background_image: e.background_image,
          genres: e.genres.map((e) => e.name),
        });
      });
      url = pages.data.next;
      console.log("url: ", url);
    }
    console.log("videogames!!!: ", videogames);
    return videogames;
  } catch (error) {
    console.error(error);
  }
};
//?-----------------------------------------------------------------
const crearJuego = async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    platforms,
    background_image,
    genres,
    createdInDb,
  } = req.body;

  const newVideogame = await Videogame.create({
    name,
    description,
    released,
    rating,
    platforms,
    background_image:
      background_image ||
      "https://www.narbis.com/wp-content/uploads/2021/01/GAME.jpg",
    genres,
    createdInDb,
  });

  genres.forEach(async (g) => {
    // recorro por los generos que me pasen y los busco en mi base de datos

    let genderDB = await Genre.findAll({ where: { name: g.name } });
    newVideogame.addGenre(genderDB); // le agrego a mi juego creado el genero seleccionado de la base
  });
  res.status(200).json({ message: "Juego creado con exito", newVideogame });

  // const genresDB = await Genres.findAll({
  //   where: { name: genre },
  // });

  // newVideogame.addGenres(genresDB);

  // res.json(newVideogame);
  // // console.log(game.toJSON()); //?ASI HAY QUE CONSOLOGUEAR.. SI ES QUE QUEREMOS VER CON UN CONSOLE.LOG, UTILIZAR EL toJSON
};

//?---------------------------------------------------------------------

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length > 6) {
      const gameCreated = await getDbInfo();
      const gameId = await gameCreated.filter((e) => e.id === id);

      return res.status(200).json(gameId);
    }
    if (id.length < 6) {
      const game = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API}`
      );
      const result = {
        id: game.data.id,
        name: game.data.name,
        img: game.data.background_image,
        genres: game.data.genres.map((e) => e.name),
        platforms: game.data.platforms.map((e) => e.platform.name),
        description: game.data.description,
        rating: game.data.rating,
        released: game.data.released,
      };
      return res.status(200).json(result);
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "No se encontro el juego por id que se solicito" });
  }
};

//?---------------------------------------------------------------------
const getGamesParams = async (req, res) => {
  const { name } = req.query;
  let allGames = await getAllVideogames();
  if (name) {
    let filteredGames = await allGames.filter((e) => {
      return e.name.toLowerCase().includes(name.toLowerCase());
    });
    filteredGames.length
      ? res.status(200).json(filteredGames.splice(0, 15))
      : res.status(404).send("No se encuentra el juego solicitado");
  } else {
    res.status(200).json(allGames);
  }
};

module.exports = {
  crearJuego,
  getById,
  getGamesParams,
};
