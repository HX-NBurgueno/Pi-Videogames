const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const {
  crearJuego,
  getById,
  getGamesParams,
} = require("../../controlador/Videogame");

//.localhost:3001/videogames asi van a llegar la request xq lo definimso en el index de routes

//?ESTAMOS MODULARIZANDO LAS RUTAS.. TODA LA LOGICA ESTA CREADA EN EL CONTROLADOR DESDE ALLI LAS EXPORTAMOS Y ACA LAS IMPORTAMOS Y LAS PASAMOS COMO 2DO PARAMETRO

router.get("/", getGamesParams);

router.get("/:id", getById);
router.post("/", crearJuego);

module.exports = router;
