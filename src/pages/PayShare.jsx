import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/PayShare.scss";
import "../css/Bar.scss";
import Bar from "./ProgressBar";

function PayShare() {
  const { state } = useLocation();
  const {
    image,
    ad,
    soyad,
    authorPhoto,
    id,
    supporters: initialSupporters,
    goalSupporters,
  } = state || {};

  const fullName = ad ? `${ad} ${soyad || ""}` : "Dostum";
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [supporters, setSupporters] = useState(initialSupporters || 0);
  const [mode, setMode] = useState("default");
  const [activities, setActivities] = useState([]);

  const progress = Math.min(supporters, goalSupporters || 10000);
  const getColor = () => {
    if (progress < (goalSupporters || 10000) * 0.4) return "#ff0000";
    if (progress < (goalSupporters || 10000) * 0.7) return "#ffa500";
    return "#2ecc71";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newActivity = {
      type: "payment",
      name: fullName,
      photo: authorPhoto || null,
      amount,
    };
    setActivities((prev) => [...prev, newActivity]);
    setSupporters((prev) => prev + 1);
    setCardNumber("");
    setAmount("");
    setMode("default");
  };

  const handleShare = () => {
    const newActivity = {
      type: "share",
      name: fullName,
      photo: authorPhoto || null,
    };
    setActivities((prev) => [...prev, newActivity]);
    setSupporters((prev) => prev + 1);

    const shareLink = `${window.location.origin}/detail/${id}`;
    navigator.clipboard.writeText(shareLink).then(() => {
      alert(`Link kopyalandı: ${shareLink}`);
    });

    setMode("default");
  };

  return (
    <div className="payshare-container">
      <div className="payshare-content">
        <img src={image} alt="Kampanya" className="payshare-image" />

        {mode === "default" && (
          <>
            <h2>{fullName}, imzalamaktan fazlasını yapabilirsin!</h2>
            <Bar progress={supporters} goal={goalSupporters || 10000} />{" "}
            {/* ✅ dinamik goal */}
            <div className="payshare-actions">
              <button
                className="payshare-yes"
                onClick={() => setMode("payment")}
              >
                Evet, kampanya hedefine ulaşması için AZN 5,10 destek vereceğim
              </button>
              <button className="payshare-no" onClick={() => setMode("share")}>
                Hayır, kampanyayı paylaşacağım
              </button>
            </div>
          </>
        )}

        {mode === "share" && (
          <div className="share-box">
            <h3>Kampanyanı paylaş</h3>
            <p>Daha çox insanın görməsi üçün dostlarınla paylaş.</p>
            <input
              type="text"
              value={`${window.location.origin}/detail/${id}`}
              readOnly
              style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
            />
            <button className="support-btn" onClick={handleShare}>
              Linki kopyalayın
            </button>
            <p className="payment-back-text" onClick={() => setMode("default")}>
              Geri
            </p>
          </div>
        )}

        {mode === "payment" && (
          <div className="payment-form">
            <h3>
              Sən heyrətamizsən, {fullName}! Büdcənizdən nə qədər vəsait ayıra
              bilərsiniz?
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Kart nömrəsi:</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div>
                <label>Ödəniş məbləği (AZN):</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Mebleği daxil et"
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div className="payment-buttons">
                <button type="submit">Ödənişi təsdiqlə</button>
              </div>
              <p
                className="payment-back-text"
                onClick={() => setMode("default")}
              >
                Geri
              </p>
            </form>
          </div>
        )}
      </div>

      <div className="payshare-supporters">
        <h3>Son fəaliyyətlər</h3>
        <ul>
          {activities.map((a, idx) => (
            <li key={idx}>
              {a.name}{" "}
              {a.type === "payment"
                ? `AZN ${a.amount} miqdarında dəstək verdi`
                : "kampanyanı paylaştı"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PayShare;
