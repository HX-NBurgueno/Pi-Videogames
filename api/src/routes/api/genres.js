const { Router } = require("express");
const router = Router();
const { getGenres } = require("../../controlador/Genres");

//.EN EL CONTROLADOR ESTA TODA LA LOGICA, Y EN EL INDEX DE ROUTER, ESTA PUESTA LA ESPECIFICACION DE SEGUN QUE RUTA PONGAMOS A QUE NOS VA A HACER REFERENCIA
router.get("/", getGenres);

module.exports = router;
