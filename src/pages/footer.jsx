import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <Link to="/">
            <h2>Petisia.az</h2>
          </Link>
          <p>
            Hər addım bir dəyişiklikdir, <br /> Bugün bir imza at!
          </p>
        </div>

        <div className="footer-column">
          <h3>Kampaniyalar</h3>
          <ul>
            <li>
              <Link to="/kampanyalarım">Kampaniyalarım</Link>
            </li>
            <li>
              <Link to="/axtar">Axtar</Link>
            </li>
            <li>
              <Link to="/kampanya-baslat">Kampaniya başlat</Link>
            </li>
            <li>
              <Link to="/daxil-ol">Qeydiyyatdan keç</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Haqqımızda</h3>
          <ul>
            <li>
              <Link to="/haqqımızda">Biz kimik?</Link>
            </li>
            <li>
              <Link to="/elaqe">Əlaqə</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Bizi takip edin</h3>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-copy">
        &copy; 2025 Petisia.az. Bütün hüquqlar qorunur.
      </div>
    </footer>
  );
};

export default Footer;
