import React from "react";
import "./SpinningImage.css";
import Ibrahim from "./assets/headshot.svg";
import Josh from "./assets/Joshheadshot.png";
import Luke from "./assets/Luke.png";

const SpinningImage = () => {
  return (
    <div className="spinner-container">
      <img src={Ibrahim} alt="Spinning head of Website Creator Ibrahim" className="spin" />
      <img src={Josh} alt="Spinning head of Creator Joshua" className="spin" />
      <img src={Luke} alt="Spinning head of Creator Luke" className="spin" />
    </div>
  );
};

export default SpinningImage;