import "../css/TopicFilter.scss";

function TopicsFilter({
  statusFilter,
  setStatusFilter,
  signatureRange,
  setSignatureRange,
  selectedTopic,
  setSelectedTopic,
  topics,
}) {
  const resetFilters = () => {
    setStatusFilter("all");
    setSignatureRange("");
    // selectedTopic qalır, sıfırlanmır
  };

  return (
    <div className="filters-panel">
      <fieldset>
        <legend>Vəziyyət</legend>
        <label>
          <input
            type="radio"
            name="status"
            value="all"
            checked={statusFilter === "all"}
            onChange={() => setStatusFilter("all")}
          />
          Bütün kampaniyalar
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="success"
            checked={statusFilter === "success"}
            onChange={() => setStatusFilter("success")}
          />
          Uğur qazanan kampaniyalar
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="new"
            checked={statusFilter === "new"}
            onChange={() => setStatusFilter("new")}
          />
          Yeni Kampanyalar
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="popular"
            checked={statusFilter === "popular"}
            onChange={() => setStatusFilter("popular")}
          />
          Məşhur Kampanyalar
        </label>
      </fieldset>

      <fieldset>
        <legend>Kampaniya İmza Sayı</legend>
        <label>
          <input
            type="radio"
            name="signatures"
            value="0-2500"
            checked={signatureRange === "0-2500"}
            onChange={() => setSignatureRange("0-2500")}
          />
          0-2500
        </label>
        <label>
          <input
            type="radio"
            name="signatures"
            value="2500-5000"
            checked={signatureRange === "2500-5000"}
            onChange={() => setSignatureRange("2500-5000")}
          />
          2500-5000
        </label>
        <label>
          <input
            type="radio"
            name="signatures"
            value="5000-7500"
            checked={signatureRange === "5000-7500"}
            onChange={() => setSignatureRange("5000-7500")}
          />
          5000-7500
        </label>
        <label>
          <input
            type="radio"
            name="signatures"
            value="7500+"
            checked={signatureRange === "7500+"}
            onChange={() => setSignatureRange("7500+")}
          />
          7500+
        </label>
      </fieldset>

      <button className="reset-filters" onClick={resetFilters}>
        Filtrləri sıfırla
      </button>
      <div className="topics-section">
        <h4>Mövzular</h4>
        <div className="topics-list">
          {topics.map((topic) => (
            <button
              key={topic}
              className={`topic-btn ${selectedTopic === topic ? "active" : ""}`}
              onClick={() =>
                setSelectedTopic(selectedTopic === topic ? "" : topic)
              }
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopicsFilter;
