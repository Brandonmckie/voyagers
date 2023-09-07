import React from "react";
import "../styles/carousel.css";
import card1 from "../img/img000.png";
import card2 from "../img/card3.jpeg";
import card3 from "../img/card6.jpeg";
import img00 from "../img/img00.png";
import { useNavigate } from "react-router-dom";

type Props = {
  user: any;
};

const LastSection = ({ user }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="container containerset" style={{ height: "359px", position: "relative" }}>
      <img
        className="imagebg0"
        src={img00}
        style={{
          position: "absolute",
          top: "0",
          width: "95%",
          height: "455px",
          zIndex: "-1",
          opacity: "0.6",
        }}
        alt=""
      />
      <div
        className="steps1 section00"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
          opacity: "100",
          height: "100%",
          gap: "14px",
        }}
      >
        <span className="lastsection0" style={{ display: "flex", flexDirection: "row" }}>
          BECOME A <span style={{ color: "#EF7A03" }}> VERIFIED VOYAGER</span>
        </span>
        <h4
          className="lastsection2"
          style={{ textAlign: "center", fontWeight: "bold", width: "70%", fontSize: "22px" }}
        >
          Join Our Verified Voyager Community
        </h4>
        {!user && (
          <span
            onClick={() => {
              navigate("/auth/sign-up");
            }}
            className="lastsection1"
            style={{
              background: "#EF7A03",
              borderRadius: "5px",
              color: "white",
              fontSize: "27px",
              padding: "1px 12px",
              lineHeight: "45px",
              cursor: "pointer",
            }}
          >
            SIGN UP
          </span>
        )}
      </div>
    </div>
  );
};

export default LastSection;
