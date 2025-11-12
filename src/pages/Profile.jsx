import { useState, useEffect } from "react";
import "../css/Profile.scss";
import IconGoogleUser from "../assets/icon-google-user.svg";

const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    country: "",
  });
  const [saved, setSaved] = useState(false); // ✅ Yadda saxlanıldı statusu

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setFormData(parsed);
      if (parsed.photo) setPhoto(parsed.photo);
    }
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...formData, photo };

    const googleUser = JSON.parse(localStorage.getItem("googleUser"));
    if (googleUser) {
      const mergedUser = { ...googleUser, ...updatedUser };
      localStorage.setItem("googleUser", JSON.stringify(mergedUser));
    } else {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    // ✅ Buttonu yaşıl və mesaj göstər
    setSaved(true);
    setTimeout(() => setSaved(false), 5000); // 5 saniyə sonra geri qayıt
  };

  return (
    <main className="profile-wrap">
      <div className="profile-card">
        <h1>Profilini düzəlt</h1>

        <div className="avatar-section">
          <div className="avatar">
            {photo ? (
              <img src={photo} alt="Profil" />
            ) : (
              <img src={IconGoogleUser} alt="Default profil" />
            )}
          </div>

          <input
            type="file"
            id="photo"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
          <label htmlFor="photo" className="btn">
            Foto yüklə
          </label>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="grid two">
            <div className="field">
              <label htmlFor="first_name">Ad</label>
              <input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Ad"
              />
            </div>
            <div className="field">
              <label htmlFor="last_name">Soyad</label>
              <input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Soyad"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="username">Email</label>
            <input
              id="username"
              name="username"
              type="email"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="country">Ölkə</label>
            <input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Ölkə"
            />
          </div>

          <div className="actions">
            <button
              type="submit"
              className="btn primary"
              style={{ backgroundColor: saved ? "green" : "" }}
            >
              {saved ? "Yadda saxlanıldı" : "Yadda saxla"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Profile;
