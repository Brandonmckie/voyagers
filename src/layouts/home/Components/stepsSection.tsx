import React from "react";
import "../styles/carousel.css";
import card1 from "../img/img000.png";
import card2 from "../img/image1.png";
import card3 from "../img/image4.png";
import card4 from "../img/image2.png";
import card5 from "../img/image3.png";

import card6 from "../img/image22.jpeg";
import card7 from "../img/image33.jpeg";

const StepsSection = () => {
  return (
    <div style={{}} className="steps0 container">
      <div className="steps1" style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ display: "flex", flexDirection: "row", gap: "9px" }}>
          <p>HOW IT</p> <p style={{ color: "#EF7A03" }}> WORKS</p>
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
            <span>
              Connect with likeminded voyagers from around the world, create a profile of your past
              voyages , itineraries and reviews
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
          <img src={card6} alt="" className="STEPSimage" />

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
          <div style={{ position: "relative" }}>
            <img
              src={card7}
              alt=""
              className="STEPSimage"
              style={{ position: "relative", zIndex: "10" }}
            />
            {/* <img
              src={card4}
              className="image0001"
              alt=""
              style={{
                position: "absolute",
                top: "-15px",

                right: "-106px",
                width: "166px",
                zIndex: 7,
              }}
            /> */}
            {/* <img
              src={card5}
              className="image0001"
              alt=""
              style={{
                position: "absolute",
                right: "101px",
                width: "210px",
                zIndex: "11",
                bottom: "-47px",
              }}
            /> */}
          </div>

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
