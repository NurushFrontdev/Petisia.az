import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Mycampaign.scss";
import Allcard from "./Allcard.jsx";
import DeleteIcon from "../assets/delete icon.png";
import IconGoogleUser from "../assets/icon-google-user.svg";

export default function Mycampaign() {
  const [activeTab, setActiveTab] = useState("imzalanan");
  const [user, setUser] = useState(null);
  const [signedCampaigns, setSignedCampaigns] = useState([]);
  const [startedCampaigns, setStartedCampaigns] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const messages = {
    baslatilan: "Başlatdığınız kampaniyalar burada görünür.",
    imzalanan:
      "Sizi maraqlandıran məsələlərlə bağlı kampaniyalar tapın və dəstəyinizi göstərin.",
  };

  const links = {
    baslatilan: "/kampanya-baslat",
    imzalanan: "/axtar",
  };

  useEffect(() => {
    const storedProfileUser = localStorage.getItem("user");
    if (storedProfileUser) {
      const parsedProfileUser = JSON.parse(storedProfileUser);
      setUser(parsedProfileUser);

      const userId = parsedProfileUser.sub || "default";

      const storedSigned = localStorage.getItem(`signedCampaigns_${userId}`);
      if (storedSigned) setSignedCampaigns(JSON.parse(storedSigned));

      const storedStarted = localStorage.getItem(`startedCampaigns_${userId}`);
      if (storedStarted) setStartedCampaigns(JSON.parse(storedStarted));
    } else {
      const storedGoogleUser = localStorage.getItem("googleUser");
      if (storedGoogleUser) {
        const parsedGoogleUser = JSON.parse(storedGoogleUser);
        setUser(parsedGoogleUser);

        const userId = parsedGoogleUser.sub;

        const storedSigned = localStorage.getItem(`signedCampaigns_${userId}`);
        if (storedSigned) setSignedCampaigns(JSON.parse(storedSigned));

        const storedStarted = localStorage.getItem(
          `startedCampaigns_${userId}`
        );
        if (storedStarted) setStartedCampaigns(JSON.parse(storedStarted));
      }
    }
  }, []);

  const handleDeleteClick = (campaign) => {
    setDeleteTarget(campaign);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget || !user) return;

    const userId = user.sub || "default";

    const updatedStarted = startedCampaigns.filter(
      (c) => c.id !== deleteTarget.id
    );
    setStartedCampaigns(updatedStarted);
    localStorage.setItem(
      `startedCampaigns_${userId}`,
      JSON.stringify(updatedStarted)
    );

    const updatedSigned = signedCampaigns.filter(
      (c) => c.id !== deleteTarget.id
    );
    setSignedCampaigns(updatedSigned);
    localStorage.setItem(
      `signedCampaigns_${userId}`,
      JSON.stringify(updatedSigned)
    );

    setDeleteTarget(null);
    window.dispatchEvent(new Event("campaignsUpdated"));
  };

  return (
    <div className="mycampaign">
      <div className="mycampaign__container">
        <div className="mycampaign__header">
          <div className="mycampaign__user-info">
            {user?.photo || user?.picture ? (
              <img
                src={user.photo || user.picture}
                alt="Profil şəkli"
                className="mycampaign__avatar"
              />
            ) : (
              <img src={IconGoogleUser} alt="" className="mycampaign__avatar" />
            )}

            <div>
              <h1 className="mycampaign__name">
                {user?.first_name
                  ? `${user.first_name} ${user.last_name}`
                  : user?.name || "User"}
              </h1>
              <p className="mycampaign__country">
                {user?.country || user?.locale || ""}
              </p>
            </div>
          </div>

          <Link to="/kampanyalarım/profil" className="mycampaign__edit-btn">
            Profilini düzəlt
          </Link>
        </div>

        <nav className="mycampaign__tabs">
          <button
            onClick={() => setActiveTab("baslatilan")}
            className={`mycampaign__tab-btn ${
              activeTab === "baslatilan" ? "is-active" : ""
            }`}
          >
            Başlatılan ({startedCampaigns.length})
            {activeTab === "baslatilan" && (
              <span className="mycampaign__underline" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("imzalanan")}
            className={`mycampaign__tab-btn ${
              activeTab === "imzalanan" ? "is-active" : ""
            }`}
          >
            İmzalanan ({signedCampaigns.length})
            {activeTab === "imzalanan" && (
              <span className="mycampaign__underline" />
            )}
          </button>
        </nav>

        <section className="mycampaign__content">
          {activeTab === "baslatilan" && (
            <>
              {startedCampaigns.length > 0 ? (
                <div className="cards-container">
                  {startedCampaigns.map((c) => (
                    <div className="allcard-wrapper" key={c.id}>
                      <Allcard {...c} />
                      <img
                        src={DeleteIcon}
                        alt="delete"
                        className="delete-icon"
                        onClick={() => handleDeleteClick(c)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="mycampaign__text">{messages.baslatilan}</p>
                  <Link
                    to={links.baslatilan}
                    className="mycampaign__search-btn"
                  >
                    Bir kampanya başlat
                  </Link>
                </>
              )}
            </>
          )}

          {activeTab === "imzalanan" && (
            <>
              {signedCampaigns.length > 0 ? (
                <div className="cards-container">
                  {signedCampaigns.map((c) => (
                    <div className="allcard-wrapper" key={c.id}>
                      <Allcard {...c} />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="mycampaign__text">{messages.imzalanan}</p>
                  <Link to={links.imzalanan} className="mycampaign__search-btn">
                    Kampaniya arayın
                  </Link>
                </>
              )}
            </>
          )}
        </section>
      </div>

      {deleteTarget && (
        <div className="modal-overlay">
          <div className="modal">
            <p>
              Siz bu kampaniyanı silməyə əminsiniz? Əgər silsəniz, kampaniya
              üçün toplanılan bütün imzalar silinəcək.
            </p>
            <div className="modal-buttons">
              <button onClick={() => setDeleteTarget(null)}>Ləğv et</button>
              <button onClick={handleConfirmDelete}>Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
