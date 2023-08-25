import React from "react";
import "../styles/carousel.css";
import card1 from "../img/img000.png";
import card2 from "../img/card3.jpeg";
import card3 from "../img/card6.jpeg";

const StepsSection = () => {
  return (
    <div style={{}} className="steps0 container">
      <div className="steps1" style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ display: "flex", flexDirection: "row" }}>
          HOW IT <p style={{ color: "#EF7A03" }}> WORKS</p>
        </p>
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}
        className="divres2"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "230px",
          }}
          className="divres"
        >
          <img src={card1} alt="" className="STEPSimage" />
          <p className="stepshead">CONNECT</p>
          <div className="text" style={{ height: "74px", textAlign: "center" }}>
            <span>Connect With Voyagers from around the World</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "230px",
          }}
          className="divres"
        >
          <img src={card2} alt="" className="STEPSimage" />
          <p className="stepshead" style={{ color: "#EF7A03" }}>
            DISPLAY
          </p>
          <div className="text" style={{ height: "74px", textAlign: "center" }}>
            <span>
              {" "}
              Display the hidden gems of your voyages. Along with your favorite content from your
              favorite voyages.
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "230px",
          }}
          className="divres"
        >
          <img src={card3} alt="" className="STEPSimage" />
          <p className="stepshead">INSPIRE</p>
          <div className="text" style={{ height: "74px", textAlign: "center" }}>
            <span>
              Inspire & be inspired to Experience new destinations like you have been there before.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;
