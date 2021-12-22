import React from "react";

//?ACA ESTAMOS RECIBIENDO POR PROPS... EL NOMBRE, LA IMAGEN, Y EL GENERO DE UN OBJETO.. ATRAVEZ DEL DESTRUCTURING
function Card({ name, image, genres, rating, id }) {
  return (
    <div className="card" key={id}>
      <h3 className="name">{name}</h3>
      <h5 className="genero">{genres}</h5>
      <h4 className="rating">{rating}</h4>
      <div className="image">
        <img src={image} alt="img not found" />
      </div>
    </div>
  );
}

export default Card;
