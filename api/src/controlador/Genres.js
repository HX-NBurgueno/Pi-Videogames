require("dotenv").config();
const axios = require("axios");
const { API } = process.env;
const { Genre } = require("../db");

const getGenres = async (req, res) => {
  //.Creamos una variable en donde Buscamos todos los generos en la BD
  const genreDb = await Genre.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  //.una vez definida esa variable, lo que hacemos es preguntar si no tiene nada, entonces traemos los generos desde la api y mapeamos la info que necesitamos que nos pide en el readme y luego la guardamos en nuestra base de datos
  if (!genreDb.length) {
    try {
      const allGenres = await axios.get(
        `https://api.rawg.io/api/genres?key=${API}`
      );
      const totalGenres = allGenres.data.results.map((e) => e.name);

      totalGenres.forEach((genre) => {
        Genre.findOrCreate({
          where: { name: genre },
        });
      });
      res.send(totalGenres);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send(genreDb);
  }
};
module.exports = {
  getGenres,
};
