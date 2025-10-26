import React, { useState, useEffect } from "react";
import "../css/Search.scss";
import SearchBar from "./SearchBar";
import TopicsFilter from "./TopicsFilter";
import Allcard from "./Allcard";

function Search({ campaigns, setCampaigns }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [signatureRange, setSignatureRange] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  useEffect(() => {
    const handleCampaignsUpdate = () => {
      const user = JSON.parse(
        localStorage.getItem("user") || localStorage.getItem("googleUser")
      );
      if (user) {
        const userId = user.sub || "default";
        const storedCampaigns = localStorage.getItem(
          `startedCampaigns_${userId}`
        );
        if (storedCampaigns) {
          setCampaigns(JSON.parse(storedCampaigns));
        }
      }
    };

    window.addEventListener("campaignsUpdated", handleCampaignsUpdate);

    return () => {
      window.removeEventListener("campaignsUpdated", handleCampaignsUpdate);
    };
  }, []);

  const filteredCampaigns = campaigns.filter((c) => {
    const matchCategory = selectedCategory
      ? c.category === selectedCategory
      : true;
    const matchTopic = selectedTopic ? c.category === selectedTopic : true;

    let matchStatus = true;
    if (statusFilter) {
      const count = c.supporters;
      switch (statusFilter) {
        case "all":
          matchStatus = true;
          break;
        case "success":
          matchStatus = count >= 10000;
          break;
        case "new":
          matchStatus = count < 100;
          break;
        case "popular":
          matchStatus = count >= 7000 && count < 10000;
          break;
        default:
          matchStatus = true;
      }
    }

    let matchSignature = true;
    if (signatureRange) {
      const count = c.supporters;
      switch (signatureRange) {
        case "0-2500":
          matchSignature = count >= 0 && count <= 2500;
          break;
        case "2500-5000":
          matchSignature = count > 2500 && count <= 5000;
          break;
        case "5000-7500":
          matchSignature = count > 5000 && count <= 7500;
          break;
        case "7500+":
          matchSignature = count > 7500;
          break;
        default:
          matchSignature = true;
      }
    }

    const matchQuery =
      query.trim() !== ""
        ? c.title.toLowerCase().includes(query.toLowerCase())
        : true;

    return (
      matchCategory && matchTopic && matchStatus && matchSignature && matchQuery
    );
  });

  return (
    <div className="campaign-search">
      <h1>İmza kampaniyalarını araşdırın</h1>
      <p>Siz {campaigns.length} kampaniya arasında axtarış edə bilərsiniz.</p>

      <SearchBar query={query} setQuery={setQuery} campaigns={campaigns} />

      <div className="search-layout visible">
        <TopicsFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          signatureRange={signatureRange}
          setSignatureRange={setSignatureRange}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          topics={[
            "Uşaq hüquqları",
            "Qadın hüquqları",
            "Heyvan hüquqları",
            "Təhsil və elm",
            "Siyasət və dövlət idarəçiliyi",
            "Əlil insanlar və Xəstə hüquqları",
            "Media,İncəsənət və Mədəniyyət",
            "Təbiət hadisələri və Təbii fəlakətlər",
          ]}
          campaigns={campaigns}
        />

        <div className="cards-container">
          {filteredCampaigns.length > 0 ? (
            <div className="cards-grid">
              {filteredCampaigns.map((c) => (
                <Allcard key={c.id} {...c} />
              ))}
            </div>
          ) : (
            <p>Heç bir nəticə tapılmadı</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
