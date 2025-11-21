import React, { useState, useRef, useEffect } from "react";
import "../css/CompanyStart.scss";
import CompanyStartCard from "./CompanyStartCard";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

const VITE_RECAPTCHA_SITE_KEY = "6LdkbL8rAAAAAGFIYPTNK9RQLSvAndEHYnjX6Axk";

const CompanyStart = () => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    author: "",
    authorPhoto: "",
    email: "",
    image: null,
    imagePreview: "",
    category: "",
    goalSupporters: "",
  });

  const [useProfileName, setUseProfileName] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const [userProfile, setUserProfile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || localStorage.getItem("googleUser");
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser));
    }

    const savedFormData = localStorage.getItem("companyFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "goalSupporters") {
      if (parseInt(value, 10) > 10000) {
        setErrors((prev) => ({
          ...prev,
          goalSupporters: "10000 nəfərdən çox ola bilməz.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, goalSupporters: "" }));
      }
    }

    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    localStorage.setItem("companyFormData", JSON.stringify(updatedData));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedData = {
          ...formData,
          image: file,
          imagePreview: reader.result,
        };
        setFormData(updatedData);
        localStorage.setItem("companyFormData", JSON.stringify(updatedData));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Başlıq boş buraxıla bilməz.";
    }

    if (!formData.goalSupporters) {
      newErrors.goalSupporters = "Lazım olan insan sayını daxil edin.";
    } else if (parseInt(formData.goalSupporters, 10) > 10000) {
      newErrors.goalSupporters = "10000 nəfərdən çox ola bilməz.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email boş ola bilməz.";
    }

    if (!captchaToken) {
      newErrors.captcha = "Captcha təsdiqlənməyib. Yenidən cəhd edin.";
      recaptchaRef.current?.reset();
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitted(true);

    localStorage.removeItem("companyFormData");
  };

  const handleBack = () => {
    setSubmitted(false);
  };

  return (
    <div className="petition-container">
      {!submitted ? (
        <form className="petition-form" onSubmit={handleSubmit}>
          <h2>Kampanya Başlat</h2>

          <label>
            Kampanyanın adı
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="input-error">{errors.title}</p>}
          </label>

          <label>
            Kampanyanın mətni
            <textarea
              name="text"
              value={formData.text || ""}
              onChange={(e) => {
                const updatedData = { ...formData, text: e.target.value };
                setFormData(updatedData);
                localStorage.setItem(
                  "companyFormData",
                  JSON.stringify(updatedData)
                );
              }}
            />
          </label>

          <div className="author-section">
            <p>Kampanyanın müəllifi</p>
            <div className="author-options">
              <label>
                <input
                  type="radio"
                  name="useProfileName"
                  value="yes"
                  checked={useProfileName === "yes"}
                  onChange={() => {
                    setUseProfileName("yes");
                    if (userProfile) {
                      const updatedData = {
                        ...formData,
                        author: `${userProfile.first_name || ""} ${
                          userProfile.last_name || ""
                        }`.trim(),
                        authorPhoto: userProfile.photo || "",
                      };
                      setFormData(updatedData);
                      localStorage.setItem(
                        "companyFormData",
                        JSON.stringify(updatedData)
                      );
                    }
                  }}
                />
                <span>Profil məlumatlarından götür</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="useProfileName"
                  value="no"
                  checked={useProfileName === "no"}
                  onChange={() => {
                    setUseProfileName("no");
                    const updatedData = {
                      ...formData,
                      author: "",
                      authorPhoto: "",
                    };
                    setFormData(updatedData);
                    localStorage.setItem(
                      "companyFormData",
                      JSON.stringify(updatedData)
                    );
                  }}
                />
                <span>Əl ilə daxil et</span>
              </label>
            </div>

            {useProfileName === "no" && (
              <>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Ad Soyad daxil edin"
                />
                <p className="note manual-note">
                  Qeyd*: Sizin heç bir şəxsi məlumatlarınız paylaşılmayacaq.
                </p>
              </>
            )}

            {useProfileName === "yes" && userProfile && (
              <>
                <div className="author-preview">
                  {userProfile.photo && (
                    <img src={userProfile.photo} alt="author" />
                  )}
                  <span>
                    {userProfile.first_name} {userProfile.last_name}
                  </span>
                </div>
                {/* <p className="note profile-note no-profile">
                  Profil məlumatlarınız mövcud deyil. Zəhmət olmasa profilinizi
                  yaradın. <Link to="/kampanyalarım">Profilə keç</Link>
                </p> */}
                <p className="note profile-note">
                  Qeyd*: Siz bu seçimi etdikdə kampaniyanı imzalayan şəxslər
                  sizin profil hesabınızı və yaratdığınız digər kampaniyaları da
                  görə biləcək.
                </p>
              </>
            )}
          </div>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="input-error">{errors.email}</p>}
          </label>

          <label>
            Kampanyanın hədəflənmiş imza sayı
            <input
              type="number"
              name="goalSupporters"
              value={formData.goalSupporters || ""}
              onChange={handleChange}
              placeholder="Məsələn: 100"
            />
            {errors.goalSupporters && (
              <p className="input-error">{errors.goalSupporters}</p>
            )}
          </label>

          <label>
            Kampanyanın kateqoriyası
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Seçin...</option>
              <option value="Uşaq hüquqları">Uşaq hüquqları </option>
              <option value="Qadın hüquqları ">Qadın hüquqları</option>
              <option value="Heyvan hüquqları">Heyvan hüquqları</option>
              <option value="Təhsil və elm">Təhsil və elm</option>
              <option value="Siyasət və dövlət idarəçiliyi">
                Siyasət və dövlət idarəçiliyi
              </option>
              <option value="Əlil insanlar və Xəstə hüquqları">
                Əlil insanlar və Xəstə hüquqları
              </option>
              <option value="Media,İncəsənət və Mədəniyyət">
                Media,İncəsənət və Mədəniyyət
              </option>
              <option value="Təbiət hadisələri və Təbii fəlakətlər">
                Təbiət hadisələri və Təbii fəlakətlər
              </option>
            </select>
          </label>

          <label>
            Şəkil yüklə
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          <div className="captcha-section">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => {
                setCaptchaToken(token);
                setErrors((prev) => ({ ...prev, captcha: "" }));
              }}
              onExpired={() => setCaptchaToken(null)}
            />
            {errors.captcha && <p className="input-error">{errors.captcha}</p>}
          </div>

          <button type="submit" className="primary-btn">
            Davam Et
          </button>
        </form>
      ) : (
        <CompanyStartCard formData={formData} handleBack={handleBack} />
      )}
    </div>
  );
};

export default CompanyStart;
