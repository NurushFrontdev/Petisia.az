import React from "react";
import "..//css/Contact.scss";
import iconTelephoneContact from "../assets/icon-telephone-contact.png";
import iconEmaileContact from "../assets/icon-email-contact.png";
import iconLocationContact from "../assets/icon-location-contact.png";
function Contact() {
  return (
    <section className="contact">
      <div className="contact__card">
        {/* Sol tərəf */}
        <div className="contact__left">
          <h1 className="contact__title">Bizimlə əlaqə</h1>
          <p className="contact__lead">
            Kampaniyanız uğurludursa və hər hansı əməkdaşlıqda çətinliklərlə
            üz-üzə gəlirsiniz və ya əlavə dəstək ehtiyacı varsa — bizimlə əlaqə
            saxlayın. Petisa.az komandası olaraq sizə dəstək vermək, problemləri
            birlikdə həll etmək və kampaniyanızın daha geniş təsirə malik
            olmasını təmin etmək üçün hazırdır. Sizin səsiniz vacibdir — gəlin
            birlikdə daha güclü addımlar ataq.
            <br />
            Sualınız və ya təklifiniz varsa,yənədə bizimlə əlaqə saxlaya
            bilərsiniz.
          </p>

          <div className="contact__info">
            <div className="contact__item">
              <div className="contact__icon" aria-hidden="true">
                <img src={iconLocationContact} alt="" />
              </div>
              <div className="contact__meta">
                <div className="contact__meta-title">Ünvan</div>
                <div className="contact__meta-sub" id="contact-address">
                  Bakı, Nizami küçəsi 34{" "}
                </div>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__icon" aria-hidden="true">
                <img src={iconTelephoneContact} alt="" />
              </div>
              <div className="contact__meta">
                <div className="contact__meta-title">Əlaqə nömrəsi</div>
                <div className="contact__meta-sub" id="contact-phone">
                  <a href="tel:+994501234567">+994 50 123 45 67</a>
                </div>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__icon" aria-hidden="true">
                <img src={iconEmaileContact} alt="" />
              </div>
              <div className="contact__meta">
                <div className="contact__meta-title">E-poçt</div>
                <div className="contact__meta-sub">
                  <a href="mailto:info@petisa.az">info@petisia.az</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__socials" aria-hidden="true">
            {/* Əgər istəsən bu hissəyə sosial ikonlar əlavə edə bilərəm */}
          </div>
        </div>

        {/* Sağ tərəf — xəritə */}
        <div className="contact__right">
          <iframe
            className="contact__map"
            title="Petisa xəritə"
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.1234567890123!2d49.8!3d40.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNDAlMjAnMjAnMScsIDQ5wrA0JzAwJzAnRQ!5e0!3m2!1sen!2saz!4v0000000000000"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Contact;
