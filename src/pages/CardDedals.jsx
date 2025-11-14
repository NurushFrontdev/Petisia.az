import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "../css/CardDedals.scss";

function Detail() {
  const { id } = useParams();
  const { state } = useLocation();
  const { image, title, description, author, authorPhoto, goalSupporters } =
    state || {};

  const [supporters, setSupporters] = useState(Number(state?.supporters) || 0);
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    gmail: "",
  });
  const [supportError, setSupportError] = useState("");

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || localStorage.getItem("googleUser");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setFormData({
        ad: parsed.first_name || parsed.given_name || "",
        soyad: parsed.last_name || parsed.family_name || "",
        gmail: parsed.username || parsed.email || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSupport = (e) => {
    const storedUser = localStorage.getItem("googleUser");

    if (!storedUser) {
      e.preventDefault(); // 🔥 Link yönləndirməsini dayandırır
      setSupportError("Siz sayta daxil olmamısınız!");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.sub;
    const signedKey = `signedCampaigns_${userId}`;
    const signedCampaigns = JSON.parse(localStorage.getItem(signedKey)) || [];

    const newSupporters = supporters + 1;

    const newCampaign = {
      id,
      image,
      title,
      description,
      author,
      authorPhoto,
      supporters: newSupporters,
    };

    const exists = signedCampaigns.find((c) => String(c.id) === String(id));
    if (!exists) {
      signedCampaigns.push(newCampaign);
      localStorage.setItem(signedKey, JSON.stringify(signedCampaigns));
    }

    setSupporters(newSupporters);
    window.dispatchEvent(new Event("campaignsUpdated"));
  };

  const remainingSupporters = goalSupporters - supporters;

  return (
    <div className="detail-container">
      <div className="detail-content">
        <h1 className="detail-title">{title}</h1>
        <img src={image} alt={title} className="detail-image" />
        <p className="detail-text">{description}</p>

        <div className="detail-author">
          <div className="author-card">
            {authorPhoto ? (
              <>
                <div className="author-left">
                  <Link
                    to="/author-info"
                    state={{
                      first_name: author.split(" ")[0],
                      last_name: author.split(" ")[1] || "",
                      photo: authorPhoto,
                      username: state?.authorEmail || "",
                      about: state?.authorAbout || "",
                      country: state?.authorCountry || "",
                    }}
                  >
                    <img
                      src={authorPhoto}
                      alt={author}
                      className="author-photo"
                    />
                  </Link>
                </div>

                <div className="author-right">
                  <Link
                    to="/author-info"
                    state={{
                      first_name: author.split(" ")[0],
                      last_name: author.split(" ")[1] || "",
                      photo: authorPhoto,
                      username: state?.authorEmail || "",
                      about: state?.authorAbout || "",
                      country: state?.authorCountry || "",
                    }}
                    className="author-name"
                  >
                    {author}
                  </Link>
                  <p className="author-subtitle">Kampaniyanı başladan</p>
                </div>
              </>
            ) : (
              <div className="author-right">
                <p className="author-name">{author}</p>
                <p className="author-subtitle">Kampaniyanı başladan</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="detail-right">
        <div className="support-box">
          <h2 className="support-count">{supporters}</h2>
          <p className="support-verify">✅ Doğrulanmış imza</p>

          {remainingSupporters > 0 ? (
            <>
              <p className="support-text">
                Dəstəyin sayəsində kampaniyanın qazanmaq üçün bir şansı var.{" "}
                Hədəfə çatmaq üçün {remainingSupporters} imza daha lazımdır.
                Yardım edərsənmi?
              </p>

              <div className="support-inputs">
                <input
                  type="text"
                  name="ad"
                  placeholder="Ad"
                  value={formData.ad}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="soyad"
                  placeholder="Soyad"
                  value={formData.soyad}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="gmail"
                  placeholder="Gmail"
                  value={formData.gmail}
                  onChange={handleChange}
                />
                {supportError && (
                  <p className="support-error" style={{ color: "red" }}>
                    {supportError}
                  </p>
                )}
              </div>

              <button className="support-btn">
                <Link
                  to="/pay-or-share"
                  state={{
                    id,
                    image,
                    title,
                    description,
                    author,
                    authorPhoto,
                    goalSupporters,
                    supporters: supporters + 1,
                    ad: formData.ad,
                    soyad: formData.soyad,
                  }}
                  onClick={handleSupport}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Kampanyanı imzala
                </Link>
              </button>
            </>
          ) : (
            <p className="success-message">
              Bu kampaniyaya dəstək olan {supporters} nəfərə Petisia.az
              komandası olaraq dərin təşəkkürümüzü bildiririk. Sizin birliyiniz,
              təmiz qəlbiniz və ədalətli ruhunuz sayəsində bu kampaniya uğurla
              başa çatdı. Unutmayaq, biz birlikdə güclüyük — hər bir imza
              dəyişimin səsi, hər bir dəstək gələcəyin ümididir.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
