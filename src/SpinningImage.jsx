import React from "react";
import "./SpinningImage.css";
import Ibrahim from "./assets/headshot.svg";

const SpinningImage = () => {
  return (
    <div className="spinner-container">
      <img src={Ibrahim} alt="Spinning" className="spin" />
    </div>
  );
};

export default SpinningImage;