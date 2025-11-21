import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Home.scss";
import Allcard from "./Allcard";
import childern from "../assets/children.jpg";
import ataturk from "../assets/ataturk.jpg";
import covid from "../assets/covid-19.webp";
import media from "../assets/media.jpg";
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
        title: "AYM Yasayı İptal Et Hayvanları Yaşat!",
        description:
          "Türkiye, hayvan hakları hareketinin yükselişte olduğu ve sokakta yaşayan hayvanların mahalle kültürünün bir parçası olarak beslenip korunduğu, hayvanlara yönelik toplumsal duyarlılığın yaygın olduğu bir kültüre sahiptir. Bu nedenledir ki yasa teklifi gündeme geldiğinde yapılan anket sonuçlarınagöre, toplumun %85’i sokakta yaşayan hayvanların öldürülmesine karşıdır. Teklif yasalaşmadan önce başlayan kitlesel sokak eylemleri, yasanın yürürlüğe girmesinden sonra da istikrarlı şekilde devam etmiştir. Yasa değişiklikleri öncesi kent meydanlarında hayvanlar için tutulan yaşam nöbetleri, katliamların gerçekleştiği barınakların[8] önünde sürmektedir. Hayvan hakkı savunucularının ve hayvanseverlerin ilk günden beri yakından takip ettiği ve karşı çıktığı yasa değişiklikleri, beşinci ayında, hâlâ birçok ilde protesto edilmektedir.",
        author: "Fulya",
        authorPhoto: null,
        country: "Antalya",
        supporters: 9378,
        goalSupporters: 9700,
        category: "Heyvan hüquqları",
      },
      {
        id: 2,
        image: downSyndrome,
        title: "Daun Sindromlu Şəxslərin Təhsil Saatlarını Artırın !",
        description:
          "Biz Daun sindromlu uşaq analarıyıq . Biz uşaqlarımızın təhsil kimi hüquqlarını dəstəkləmək üçün platforma yaratdıq. Bizim ən aktual məsələlərdən biri odur ki, hökumət uşaqlarımıza ayda yalnız 8 saat dərs keçməyə icazə verir . Bu, həftədə 2 saat təşkil edir, bu, sadəcə olaraq kifayət deyil. Biz dərs saatlarının artırılmasını tələb edirik",
        author: "Xədicə Əliyeva",
        authorPhoto: null,
        country: "Azərbaycan",
        supporters: 4323,
        goalSupporters: 6800,
        category: "Təhsil və elm",
      },
      {
        id: 3,
        image: childern,
        title: "Evsiz Uşaqları Qoru",
        description:
          "Evsiz uşaqlar yoxsulluqdan, az və ya heç təhsil almamaqdan və zorakılıqdan əziyyət çəkirlər. Onların bir gün bizim kimi yaşaya biləcəklərinə ümidləri var. Soyuqdan, aclıqdan, susuzluqdan, avtomobil qəzalarından ölürlər. Onlar xoşbəxt uşaqları yemək yeyərkən, rahat evlərdə və rahatlıqda görürlər, lakin təəssüf ki, evsizlər bunu görmürlər.Onlar ölüm adlanan dostları ilə görüşmək təhlükəsi ilə üz-üzədirlər ki, bu da evsiz uşaqların gözlərini yummasına səbəb olur. Uşaqlarımıza kömək etməliyik, yoxsa daha az əhali ilə pis gələcəyimiz olacaq. Bəlkə biz onlara kömək edə bilərik ki, onlar da bizim kimi ola bilsinlər və ya bir vaxtlar evsiz qalan milyonçu Kris Qardner kimi daha varlı olsunlar.",
        author: "Sevinc Quliyeva",
        authorPhoto: null,
        country: "Azərbaycan",
        supporters: 857,
        goalSupporters: 1000,
        category: "Uşaq hüquqları",
      },
      {
        id: 4,
        image: ataturk,
        title: "10 Kasım'da Unutmadık, Unutturmayacağız!",
        description:
          "Laik, demokratik, sosyal ve çağdaş bir hukuk devleti olan Türkiye Cumhuriyeti'nin kurucusu, aydınlık Türkiye'nin simgesi, büyük devrimci ve düşünce insanı Gazi Mustafa Kemal Atatürk, gerçekleştirdiği Türk Devrimi'yle bizlere aydınlık yarınların kapılarını açmıştır. O'nun yaktığı ışık, bugünlerde yaşadığımız ve tanık olduğumuz karanlık çabalara karşın hiçbir zaman sönmeyecektir. Türk ulusu, Ata’sından aldığı emanete mutlaka sahip çıkacaktır.Cumhuriyetimizin kurucusu, Büyük Önderimiz Mustafa Kemal Atatürk’ün, aramızdan ayrılışının 87. yılında üzülerek görüyoruz ki, bu yıl da 10 Kasım Atatürk’ü Anma Günü, Milli Eğitim Bakanlığı’nca ara tatile denk getirilmiştir.Atatürk Haftasının 10-16 Kasım tarihleri arasında olduğu herkesin bildiği bir gerçektir. Bu tarihlere ara tatilin denk getirilmesi, bir tesadüf olarak görülemez.Bu uygulama, öğrencilerimizin ve öğretmenlerimizin Atatürk’ü anma törenlerine ve etkinliklerine katılmasını engellemeye yönelik bir uygulamadır. Milli Eğitim Bakanlığı’nın görevi, çocuklarımıza Cumhuriyet’in değerlerini, Atatürk ilke ve devrimlerini öğretmek ve onları bu bilinçle yetiştirmektir.",
        author: "Zeynep Sude",
        authorPhoto: null,
        country: "Izmir",
        supporters: 5000,
        goalSupporters: 5000,
        category: "Siyasət və dövlət idarəçiliyi",
      },
      {
        id: 5,
        image: covid,
        title: "İşçiləri Öldürən COVID-19 Peşə Xəstəliyi Hesab edilməlidir!",
        description:
          "Dekabrın sonlarında Çinin Uhan əyalətində ortaya çıxan və tənəffüs simptomları ilə özünü göstərən COVID-19 tibb işçilərini, xüsusən də tibb işçilərini öldürməyə davam edir.Səhiyyə Nazirliyinin 2 sentyabr 2020-ci il tarixində açıqladığı rəsmi məlumata görə, 29 865 tibb işçisi COVID-19-a yoluxub. Bu rəqəm Türkiyədəki rəsmi hadisələrin 11%-nə uyğundur.Səhiyyə Nazirliyinin açıqladığı digər məlumatlara görə, bu günə qədər 52 tibb işçisi həyatını itirib. Bu vəziyyət işin mahiyyəti və ya taleyi ilə izah edilə bilməyən fundamental insan hüquqları pozuntusudur. Bu pozuntuya göz yummaq və ya “peşə riski” adı altında əhəmiyyətsizləşdirmək olmaz.",
        author: "Nərgiz Məmmədova",
        authorPhoto: null,
        country: "Azərbaycan",
        supporters: 2123,
        goalSupporters: 7000,
        category: "Əlil insanlar və Xəstə hüquqları",
      },
      {
        id: 6,
        image: media,
        title: "Sosial media qadağasını qaldırın!",
        description:
          "Ticarət Nazirliyi saxta reklamların, reklamların dağınıqlığının, spekulyativ qiymət artımının və istehlakçıların şikayətlərinin qarşısını almaq üçün Elektron Reklamların Yoxlanması Sistemi (EADS) çərçivəsində qaydalar tətbiq edib. Bu qaydalar sosial media platformaları da daxil olmaqla daşınmaz əmlak və avtomobil elanlarının dərc olunduğu bütün elektron platformaları əhatə edir.Nazirlik sosial media platformalarında qaydaları pozan reklam fəaliyyətini müəyyən edib və bu platformalara qarşı inzibati cərimələr tətbiq edib. Bundan əlavə, bu günə qədər 1426 sosial media hesabına giriş bloklanıb.",
        author: "Rəhim Rəhimov",
        authorPhoto: null,
        country: "Azərbaycan",
        supporters: 56,
        goalSupporters: 1000,
        category: "Media,İncəsənət və Mədəniyyət",
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

        const startedCampaigns =
          JSON.parse(localStorage.getItem(`startedCampaigns_${userId}`)) || [];
        const signedCampaigns =
          JSON.parse(localStorage.getItem(`signedCampaigns_${userId}`)) || [];

        setCampaigns([...startedCampaigns, ...signedCampaigns]);
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
