import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import api from "../../utils/api";
import "../../App.css";
import CircularProgress from "../../components/CircularProgress/CircularProgress";

const Qrcode = () => {
  const [user, setUser] = useState("");
  const [loading, setloading] = useState(false);
  const getUser = async () => {
    setloading(true);
    try {
      const user = await api("/users/get-profile");
      let origin = window.location.origin;
      setUser(`${origin}/user/${user.data.user.username}`);
      setloading(false);
    } catch (err) {
      setloading(false);
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
      {loading ? (
        <div
          style={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <h4 className="qrcodeh1">QRCODE</h4>
          <div style={{ height: "auto", maxWidth: 260, width: "100%" }} className="qrcode">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={user}
              viewBox={`0 0 256 256`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Qrcode;
