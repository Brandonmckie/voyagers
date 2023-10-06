import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import api from "../../utils/api";
import "../../App.css";

const Qrcode = () => {
  const [user, setUser] = useState("");
  const getUser = async () => {
    try {
      const user = await api("/users/get-profile");
      let origin = window.location.origin;
      setUser(`${origin}/${user.data.user.username}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h4 className="qrcodeh1">QRCODE</h4>
      <div style={{ height: "auto", maxWidth: 260, width: "100%" }} className="qrcode">
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={user}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
};

export default Qrcode;
