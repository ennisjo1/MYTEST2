import React from "react";
import "./SpinningImage.css";
import Ibrahim from "./assets/headshot.svg";
import Josh from "./assets/Joshheadshot.png";

const SpinningImage = () => {
  return (
    <div className="spinner-container">
      <img src={Ibrahim} alt="Spinning head of Website Creator Ibrahim" className="spin" />
      <img src={Josh} alt="Spinning head of Creator Joshua" className="spin" />
    </div>
  );
};

export default SpinningImage;