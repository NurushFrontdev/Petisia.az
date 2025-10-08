import { useState } from "react";
import "../css/ContactAuthor.scss";

const ContactAuthor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada backend API-yə göndərmək üçün kod əlavə oluna bilər
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000); // 4 saniyədən sonra gizlə
  };

  return (
    <div className="contactAuthor-container">
      <div className="contactAuthor-card">
        <h2 className="contactAuthor-title">
          Kampaniya müəllifi ilə əlaqə saxla
        </h2>

        <p className="contactAuthor-text">
          Siz kampaniya müəllifi ilə asanlıqla əlaqə yarada bilərsiniz. Bu imkan
          sayəsində həm suallarınızı ünvanlaya, həm də onların təşəbbüsləri
          haqqında daha dərin məlumat əldə edə bilərsiniz.
        </p>

        <ul className="contactAuthor-list">
          <li>Jurnalist olaraq xəbər məqaləsi hazırlamaq istəyirsinizsə,</li>
          <li>Müxbir kimi araşdırma aparırsınızsa,</li>
          <li>Podkast aparıcısı olaraq maraqlı mövzular axtarırsınızsa,</li>
          <li>
            İnternet yayımçısı və ya kontent istehsalçısı kimi izləyicilərinizə
            yeni məlumat çatdırmaq istəyirsinizsə,
          </li>
        </ul>

        <p className="contactAuthor-text">
          <span className="contactAuthor-highlight">Petisia.az</span> olaraq biz
          kampaniya başladan şəxslərlə əlaqə qurmağınıza məmnuniyyətlə dəstək
          olacağıq. İstər sosial layihə, istərsə də ictimai mövzularla bağlı
          maraqlandığınız suallara cavab tapmaq üçün biz həmişə yanınızdayıq.
        </p>

        <form className="contactAuthor-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Ad və Soyad</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Məktubunuzu qeyd edin:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Məktubunuzu buraya yazın..."
            rows={6}
            required
          />

          <button type="submit" className="contactAuthor-button">
            Göndər
          </button>
        </form>

        {submitted && (
          <div className="contactAuthor-success">
            ✅ Məktubunuz uğurla göndərildi!
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactAuthor;
