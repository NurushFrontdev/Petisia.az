import "../css/Header.scss";
import { Link } from "react-router-dom";
import IconGoogleUser from "../assets/icon-google-user.svg";
import { useState, useEffect } from "react";

function Header() {
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    const profileUser = localStorage.getItem("user");
    if (profileUser) {
      const parsedProfile = JSON.parse(profileUser);
      if (parsedProfile.photo) {
        setUserPhoto(parsedProfile.photo);
        return;
      }
    }

    const googleUser = localStorage.getItem("googleUser");
    if (googleUser) {
      const parsedGoogle = JSON.parse(googleUser);
      if (parsedGoogle.picture) {
        setUserPhoto(parsedGoogle.picture);
      }
    }
  }, []);

  return (
    <header>
      <div className="left">
        <Link to="/">
          <h1 className="logo">Petisia.az</h1>
        </Link>
        <div className="navigation">
          <Link to="/kampanyalarım">Kampanyalarım</Link>
          <Link to="/axtar">Axtar</Link>
          <Link to="/haqqımızda">Haqqımızda</Link>
          <Link to="/elaqe">Əlaqə</Link>
        </div>
      </div>
      <div className="button">
        <Link to="/kampanya-baslat" className="companyButton">
          Kampanya başlat
        </Link>
        <Link to="/daxil-ol" className="loginButton">
          <img src={userPhoto || IconGoogleUser} alt="User" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
