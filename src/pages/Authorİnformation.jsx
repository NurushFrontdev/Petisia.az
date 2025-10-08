import { useEffect, useState } from "react";
import Allcard from "./Allcard";
import "../css/Authorİnformation.scss";

const Authorİnformation = ({ campaigns }) => {
  const [author, setAuthor] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthor(JSON.parse(storedUser));
    }
  }, []);

  if (!author) {
    return <p>Məlumat tapılmadı</p>;
  }

  const authorCampaigns =
    campaigns?.filter(
      (c) => c.author === `${author.first_name} ${author.last_name}`
    ) || [];

  return (
    <div className="authorInfo-container">
      <div className="authorInfo-photo">
        {author.photo ? (
          <img src={author.photo} alt="Author" />
        ) : (
          <span className="authorInfo-noPhoto">👤</span>
        )}
      </div>

      <div className="authorInfo-name">
        {author.first_name} {author.last_name}
      </div>
      <div
        className="authorInfo-email"
        onClick={() => window.open("/contact-author", "_blank")}
      >
        {author.username}
      </div>
      <div className="authorInfo-country">{author.country}</div>

      <h3>Müəllifin digər kampaniyaları</h3>

      <div className="authorInfo-campaigns">
        {authorCampaigns.map((c) => (
          <div className="petition-card" key={c.id}>
            <Allcard {...c} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authorİnformation;
