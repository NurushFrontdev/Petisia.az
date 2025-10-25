import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Home.scss";
import Allcard from "./Allcard";
import World from "../assets/Wold map.png";
import { Link } from "react-router-dom";
import helpingAnimals from "../assets/Helping animals.webp";
import downSyndrome from "../assets/Down syndrome.webp";

function Home({ campaigns, setCampaigns }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const popularAndSuccessful = campaigns.filter((c) => {
    const supporters = c.supporters || 0;
    const goal = c.goalSupporters || 1;
    if (supporters >= goal) return true;
    if (supporters >= goal * 0.8) return true;
    return false;
  });

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [popularAndSuccessful.length]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % popularAndSuccessful.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const prevSlide = () => {
    setIndex(
      (prev) =>
        (prev - 1 + popularAndSuccessful.length) % popularAndSuccessful.length
    );
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % popularAndSuccessful.length);
  };
  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("googleUser"));

    if (user) {
      const userId = user.sub || "default";
      const stored =
        JSON.parse(localStorage.getItem(`startedCampaigns_${userId}`)) || [];
      if (stored.length > 0) {
        setCampaigns(stored);
      }
    }
  }, [setCampaigns]);

  useEffect(() => {
    if (location.state?.newCampaign) {
      setCampaigns((prev) => {
        const exists = prev.some((c) => c.id === location.state.newCampaign.id);
        if (!exists) {
          const updated = [...prev, location.state.newCampaign];
          localStorage.setItem("startedCampaigns", JSON.stringify(updated));
          return updated;
        }
        return prev;
      });

      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname, setCampaigns]);
  useEffect(() => {
    const myCampaigns = [
      {
        id: 1,
        image: helpingAnimals,
        title: "Konstitusiya Məhkəməsi Qanunu Ləğv Et, Heyvanlar Yaşasın!",
        description:
          "Türkiyədə heyvan hüquqları hərəkatının yüksəlişdə olduğu, küçə heyvanlarının məhəllə mədəniyyətinin bir parçası olaraq bəslənildiyi və qorunduğu, heyvanlara qarşı ictimai həssaslığın geniş yayıldığı bir mədəniyyət var. Ona görə də qanun layihəsi təqdim edilərkən sorğunun nəticələri nəzərə alınıb.Milli Assambleyanın məlumatına görə, cəmiyyətin 85%-i küçə heyvanlarının öldürülməsinə qarşıdır. Qanun layihəsi qüvvəyə minməzdən əvvəl başlayan kütləvi küçə etirazları qanunun tətbiqindən sonra davamlı olaraq davam edir. Dəyişikliklərdən əvvəl şəhər meydanlarında keçirilən heyvan həyatı ayıqlıqları kəsimlərin aparıldığı heyvan sığınacaqlarının qarşısında davam edir.[8] Heyvan haqları müdafiəçiləri və heyvansevərlər tərəfindən əvvəldən yaxından izlənilən və qarşı çıxan qanun dəyişiklikləri artıq beşinci aydır ki, bir çox əyalətlərdə hələ də etiraz edilir.",
        author: "Mən",
        authorPhoto: World,
        country: "Azərbaycan",
        supporters: 9499,
        goalSupporters: 9500,
        category: "Heyvan hüquqları",
      },
      {
        id: 2,
        image: downSyndrome,
        title: "Daun Sindromlu Şəxslərin Təhsil Saatlarını Artırın !",
        description:
          "Biz Daun sindromlu uşaq analarıyıq . Biz uşaqlarımızın təhsil kimi hüquqlarını dəstəkləmək üçün platforma yaratdıq. Bizim ən aktual məsələlərdən biri odur ki, hökumət uşaqlarımıza ayda yalnız 8 saat dərs keçməyə icazə verir . Bu, həftədə 2 saat təşkil edir, bu, sadəcə olaraq kifayət deyil. Biz dərs saatlarının artırılmasını tələb edirik",
        author: "Mən",
        authorPhoto: World,
        country: "Azərbaycan",
        supporters: 4500,
        goalSupporters: 6000,
        category: "Təhsil və elm",
      },
      {
        id: 3,
        image: World,
        title: "Mənim Yeni Kampaniyam 3",
        description: "Bu kampaniya mənim özüm tərəfindən əlavə edilib.",
        author: "Mən",
        authorPhoto: World,
        country: "Azərbaycan",
        supporters: 850,
        goalSupporters: 1000,
        category: "heyvan hüquqları",
      },
      {
        id: 4,
        image: World,
        title: "Mənim Yeni Kampaniyam 4",
        description: "Bu kampaniya mənim özüm tərəfindən əlavə edilib.",
        author: "Mən",
        authorPhoto: World,
        country: "Azərbaycan",
        supporters: 5000,
        goalSupporters: 5000,
        category: "Sağlamlıq",
      },
      {
        id: 5,
        image: World,
        title: "Mənim Yeni Kampaniyam 5",
        description: "Bu kampaniya mənim özüm tərəfindən əlavə edilib.",
        author: "Mən",
        authorPhoto: World,
        country: "Azərbaycan",
        supporters: 2100,
        goalSupporters: 7000,
        category: "İnsan haqları",
      },
      {
        id: 6,
        image: World,
        title: "Mənim Yeni Kampaniyam 6",
        description: "Bu kampaniya mənim özüm tərəfindən əlavə edilib.",
        author: "Mən",
        authorPhoto: World,
        country: "Azərbaycan",
        supporters: 50,
        goalSupporters: 1000,
        category: "Sosial dəstək",
      },
    ];

    setCampaigns((prev) => {
      const newOnes = myCampaigns.filter(
        (mc) => !prev.some((c) => c.id === mc.id)
      );
      return [...prev, ...newOnes];
    });
  }, [setCampaigns]);
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

  return (
    <div className="home">
      <div className="homeHeader">
        <div className="headerContent">
          <h1 className="headerTitle">
            Dəyişiklik və aktivlik üçün dünyanın platforması
          </h1>
          <p className="headerText">
            {campaigns.reduce((sum, c) => sum + (c.supporters || 0), 0)} nəfər
            hərəkətə keçir.
            <span className="highlight">
              Kampaniyalar hər gün uğur qazanır.
            </span>
          </p>
          <Link to="/kampanya-baslat">
            <button className="startBtn">Kampaniyaya başlayın</button>
          </Link>

          {popularAndSuccessful.length > 0 && (
            <div
              className="popularCampaigns"
              onMouseEnter={stopAutoSlide}
              onMouseLeave={startAutoSlide}
            >
              <div className="slider">
                <button className="slider-btn left" onClick={prevSlide}>
                  {"<"}
                </button>
                <div className="slider-window">
                  <div
                    className="slider-track"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                  >
                    {popularAndSuccessful.map((c) => (
                      <div className="petition-card" key={c.id}>
                        <Allcard {...c} />
                      </div>
                    ))}
                  </div>
                </div>
                <button className="slider-btn right" onClick={nextSlide}>
                  {">"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="cards-container">
        <h2 className="textPetisia">Petisia.az-da nələr baş verir?</h2>
        <div className="cards-grid">
          {campaigns.map((c) => (
            <Allcard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
