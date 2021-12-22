const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      released: DataTypes.STRING,

      background_image: {
        type: DataTypes.STRING,
      },

      rating: DataTypes.INTEGER,

      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      //?ESTO LO ESTAMOS PONIENDO OPCIONAL PARA QUE ENBE DE GENERARNOS AUTOMATICAMENTE EN NUESTRAS TABLAS LAS COLUMNAS CON LOS NOMBRES CREATEDAT Y UPDATEAT, NOS LAS CREE PERO CON LOS NOMPRES QUE NOSOTROS DEFINIMOS ... Y SI NOSOTROS NO QUISIERAMOS QUE NOS LAS CREE DIRECTAMENTE, SOLO TENDRIAMOS QUE PONER TIMESTAMPS: FALSE ... SI NO PONEMOS NADA DE LO QUE TENEMOS ACA ABAJO, NOS VA A GENERAR EN NUESTA TABLAS LAS COLUMNAS CREATEDAT Y UPDATEDAT ASI CON ESOS NOMBRES QUE SON LOS POR DEFECTO
      timestamps: true,
      createdAt: "Creado",
      updatedAt: "Actualizado",
    }
  );
};
