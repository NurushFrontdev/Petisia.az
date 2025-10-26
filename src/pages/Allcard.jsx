import { Link } from "react-router-dom";
import "../css/Allcard.scss";
import NotePen from "../assets/note-pen.png";

const Allcard = ({
  id,
  category,
  image,
  title,
  description,
  author,
  authorPhoto,
  country,
  supporters,
  goalSupporters,
}) => {
  let badgeText = "";
  if (goalSupporters) {
    if (supporters >= goalSupporters) {
      badgeText = "Uğurlu";
    } else if (supporters >= goalSupporters * 0.8) {
      badgeText = "Məşhur";
    } else if (supporters < 100) {
      badgeText = "Yeni";
    }
  }
  const badgeClass =
    badgeText === "Yeni"
      ? "yeni"
      : badgeText === "Məşhur"
      ? "meshuru"
      : badgeText === "Uğurlu"
      ? "ugurlu"
      : "";

  return (
    <Link
      to={`/detail/${id}`}
      state={{
        id,
        image,
        title,
        description,
        author,
        authorPhoto,
        supporters,
        country,
        category,
        goalSupporters,
      }}
      className="petition-card"
    >
      <div className="card-image-wrapper">
        {badgeText && (
          <span className={`petition-badge ${badgeClass}`}>{badgeText}</span>
        )}
        {image ? (
          <img src={image} alt={title} className="card-image" />
        ) : (
          <div className="image-placeholder"></div>
        )}
      </div>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="card-supporters">
          <img src={NotePen} alt={NotePen} />
          {supporters || 0} imza
        </div>
      </div>
    </Link>
  );
};

export default Allcard;
