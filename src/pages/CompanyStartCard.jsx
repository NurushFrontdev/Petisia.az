import { useNavigate } from "react-router-dom";
import "../css/CompanyStartCard.scss";

const CompanyStartCard = ({ formData, handleBack }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    const user = JSON.parse(localStorage.getItem("googleUser"));
    const userId = user?.sub;

    const newCampaign = {
      id: Date.now(),
      status: "Yeni",
      image: formData.imagePreview,
      title: formData.title,
      description: formData.text,
      author: formData.author,
      authorPhoto: formData.authorPhoto || null,
      category: formData.category,
      country: "Azərbaycan",
      supporters: 0,
      goalSupporters: Number(formData.goalSupporters),
    };

    const storedCampaigns =
      JSON.parse(localStorage.getItem(`startedCampaigns_${userId}`)) || [];
    const updatedCampaigns = [newCampaign, ...storedCampaigns];
    localStorage.setItem(
      `startedCampaigns_${userId}`,
      JSON.stringify(updatedCampaigns)
    );

    navigate("/", { state: { newCampaign } });
  };

  return (
    <>
      <div className="petition-card">
        <div className="petition-category">
          {formData.category || "Kateqoriya seçilməyib"}
        </div>

        <div className="petition-body">
          <div className="petition-left">
            <h3 className="petition-title">{formData.title}</h3>
            <div
              className="petition-text"
              dangerouslySetInnerHTML={{ __html: formData.text }}
            />
          </div>

          <div className="petition-right">
            {formData.imagePreview ? (
              <img src={formData.imagePreview} alt="petition visual" />
            ) : (
              <div className="image-placeholder"></div>
            )}
          </div>
        </div>

        <div className="petition-footer">
          <div className="petition-author">
            {formData.authorPhoto ? (
              <>
                <img
                  src={formData.authorPhoto}
                  alt={formData.author}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginRight: 8,
                  }}
                />
                <span>{formData.author}</span>
              </>
            ) : (
              <span>{formData.author}</span>
            )}
          </div>
          <div className="petition-supporters">0 dəstəkçi</div>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={handleBack} className="secondary-btn">
          Geri qayıt
        </button>
        <button onClick={handleConfirm} className="primary-btn">
          Təsdiqlə
        </button>
      </div>
    </>
  );
};

export default CompanyStartCard;
