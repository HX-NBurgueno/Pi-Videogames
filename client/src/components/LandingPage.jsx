import "../css/landingpage.css";

import { Link } from "react-router-dom";
import React from "react";
import coverVideo from "../media/landing.mp4";

export default function LandingPage() {
  return (
    <div className="cover-container">
      <video className="video" src={coverVideo} autoPlay loop />
      <h1>Welcome !</h1>
      <p>to the world of videogames</p>
      <Link to="/home" className="go">
        Go 🔫
        {/* <button className="go">Go!</button> */}
      </Link>
    </div>
  );
}
