const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const videoGamesRouter = require("./api/videogames");
const genresRouter = require("./api/genres");
const videoGamesPost = require("./api/videogames");

router.use("/videogames", videoGamesRouter);
router.use("/videogame", videoGamesPost);
router.use("/genres", genresRouter);

module.exports = router;
