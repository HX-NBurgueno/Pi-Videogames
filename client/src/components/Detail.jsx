import "../css/detail.css";
import "../css/buttonliquid.css";

import React, { useEffect } from "react";
import { gameDetails, resetDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function Detail() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const detail = useSelector((state) => state.details);
  const history = useHistory();

  useEffect(() => {
    dispatch(gameDetails(id));
    return () => dispatch(resetDetail());
  }, [dispatch, id]);

  return (
    <div className="detailHome">
      <button className="button" onClick={() => history.goBack()}>
        <span>Volver</span>
        <div className="liquid"></div>
      </button>
      <div className="contenedor">
        {detail.length > 0 ? (
          <div>
            <h1 className="nombre">{detail.map((e) => e.name)}</h1>
            <img
              className="img"
              src={detail.map((e) => e.background_image)}
              alt="Img Not Found"
            />
            <div className="contenedor2">
              <h4>Rating:</h4>
              <p>{detail.map((e) => e.rating)}</p>

              <h4>Plataformas : </h4>
              <p>{detail && detail.map((e) => e.platforms.join(", "))}</p>

              <h4>Generos : </h4>

              <div>{detail && detail.map((e) => e.genres.join(", "))}</div>

              <h4>Descripción :</h4>
              <p>{detail.map((e) => e.description)}</p>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="nombre">{detail.name}</h1>
            <img className="img" src={detail.img} alt="Img Not Found" />
            <div className="contenedor2">
              <h4>Rating:</h4>
              <p>{detail.rating}</p>

              <h4>Plataformas :</h4>
              <div>{detail.platforms && detail.platforms.join(", ")}</div>

              <h4>Generos :</h4>
              <div>{detail.genres && detail.genres.join(", ")}</div>

              <h4>Descripción :</h4>
              <p dangerouslySetInnerHTML={{ __html: detail.description }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
