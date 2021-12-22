const { Videogame, Genre } = require("../db");

const getDbInfo = async () => {
  let dataBase = await Videogame.findAll({
    include: {
      model: Genre, //.HAY QUE PASARLE ESTE OTRO MODELO PARA QUE HAGA LA RELACION, SI NO INCLUYO ESTE MODELO NUNCA ME VA A TRAER EL JUEGO CON EL GENERO QUE LE DIGAMOS
      attributes: ["name"],
      through: {
        //. ESTE THROUGH ES PARA INDICARLE QUE ME TRAIGA ESOS ATRIBUTOS QUE LE INDIQUE
        attributes: [],
      },
    },
  });

  const dbGame = dataBase.map((e) => {
    return {
      id: e.id,
      name: e.name,
      rating: e.rating,
      background_image: e.background_image,
      genres: e.genres.map((e) => e.name),
      createdInDb: e.createdInDb,
      platforms: e.platforms,
      description: e.description,
    };
  });
  return dbGame;
};

module.exports = {
  getDbInfo,
};
