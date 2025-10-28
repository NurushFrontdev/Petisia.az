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
  const [paid, setPaid] = useState(false);
  const [copied, setCopied] = useState(false);
  const fullName = ad ? `${ad} ${soyad || ""}` : "Dostum";
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [supporters, setSupporters] = useState(initialSupporters || 0);
  const [mode, setMode] = useState("default");
  const [activities, setActivities] = useState([]);

  const progress = Math.min(supporters, goalSupporters);
  const getColor = () => {
    if (progress < goalSupporters * 0.4) return "#ff0000";
    if (progress < goalSupporters * 0.7) return "#ffa500";
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

    setPaid(true);
    setTimeout(() => setPaid(false), 3000);

    setCardNumber("");
    setAmount("");
  };

  const handleShare = () => {
    const newActivity = {
      type: "share",
      name: fullName,
      photo: authorPhoto || null,
    };
    setActivities((prev) => [...prev, newActivity]);

    const shareLink = `${window.location.origin}/detail/${id}`;
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="payshare-container">
      <div className="payshare-content">
        <img src={image} alt="Kampanya" className="payshare-image" />

        {mode === "default" && (
          <>
            <h2>{fullName}, imzalamaktan fazlasını yapabilirsin!</h2>
            <Bar progress={supporters} goal={goalSupporters} />{" "}
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
            <button
              className="support-btn"
              onClick={handleShare}
              style={{
                backgroundColor: copied ? "#2ecc71" : "#f1c40f",
                color: copied ? "white" : "black",
                transition: "all 0.3s ease",
              }}
            >
              {copied ? "Link kopyalandı " : "Linki kopyalayın"}
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
                <button
                  type="submit"
                  style={{
                    backgroundColor: paid ? "#2ecc71" : "#f1c40f",
                    color: paid ? "white" : "black",
                    transition: "all 0.3s ease",
                  }}
                  disabled={paid}
                >
                  {paid ? "Ödəniş edildi " : "Ödənişi təsdiqlə"}
                </button>
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
                ? ` ${a.amount}AZN miqdarında dəstək verdi`
                : "kampanyanı paylaştı"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PayShare;
