import React from "react";
import "../css/About.scss";
import IconsAboutUser from "../assets/icons-about-user.webp";
import IconsAboutDecision from "../assets/icons-about-decision.webp";
import IconsAboutOrganization from "../assets/icons-about-organization.webp";
import IconsAboutMedia from "../assets/icons-about-media.webp";
import IconsAboutArrow from "../assets/icons-about-arrow.svg";

function About() {
  return (
    <div className="about">
      <h1 className="about__title">Dünyanın dəyişim platforması</h1>

      <div className="about__text">
        Petisia.az – Dünyanın dəyişim platformu insanların səsini eşitdirmək,
        birlikdə addım atmaq və gələcəyi daha yaxşı qurmaq üçün mövcuddur. Biz
        bu platformanı yaratmaqla hər kəsə öz fikrini, narahatlığını və ümidini
        paylaşmaq imkanı veririk. Çünki inanırıq ki, heç bir insanın səsi kiçik
        deyil, heç bir problem görməzlikdən gəlinməməlidir. Petisia.az –
        vətəndaşların bir-birindən ayrı deyil, birlikdə daha güclü ola
        biləcəyini sübut edən bir məkandır. Burada hər kəsin səsi dəyərlidir,
        hər dəstəyin gücü var.
      </div>

      <div className="about__text">
        Bizim məqsədimiz sadəcə müraciət toplamaq deyil, eyni zamanda dəyişimin
        mədəniyyətini yaratmaqdır. İnsanların gündəlik həyatda qarşılaşdığı
        çətinliklərin həllini birlikdə axtarmaq, haqsızlıqlara qarşı dayanmaq və
        cəmiyyət üçün daha ədalətli yollar tapmaq bizim əsas missiyamızdır.
      </div>

      <div className="about__text">
        Biz inanırıq ki, kiçik bir səs böyük dəyişikliklərin başlanğıcı ola
        bilər. Bəzən bir imza, bəzən bir dəstək və bəzən də sadəcə birlikdə
        dayanmaq – bütün dünyanı dəyişdirə biləcək gücə malikdir. Hər bir imza,
        gələcək nəsillər üçün daha güclü və ümidli bir sabahın qurulmasına
        atılan təməl addımdır.
      </div>

      <div className="about__text">
        Birlikdə olduğumuz zaman mümkünsüz görünən şeyləri belə həyata keçirmək
        olar. Petisia.az sadəcə bir vebsayt deyil, həm də insanların gücünü,
        inamını və həmrəyliyini birləşdirən bir hərəkatdır. Biz inanırıq ki, hər
        kəs bu dəyişimin bir parçası ola bilər və birlikdə dünyanı daha gözəl
        bir yerə çevirə bilərik.
      </div>
      <div className="who-uses">
        <h2 className="who-uses__title">Petisia.az-dan kim istifadə edir?</h2>

        <div className="who-uses__grid">
          <div className="who-uses__item">
            <img
              src={IconsAboutUser}
              alt={IconsAboutUser}
              className="who-uses__icon"
            />
            <h3>Kampaniya başladanlar və dəstəkçilər</h3>
            <p>
              196 ölkədə milyonlarla insan cəmiyyətlərində dəyişiklik yaratmaq
              üçün Petisia.az-dan istifadə edir.
            </p>
          </div>

          <div className="who-uses__item">
            <img
              src={IconsAboutDecision}
              alt={IconsAboutDecision}
              className="who-uses__icon"
            />
            <h3>Qərar vericilər</h3>
            <p>
              İş yerlərinin və hökumətlərin rəhbərləri vətəndaşlarla və
              müştərilərlə birbaşa əlaqəyə keçir.
            </p>
          </div>

          <div className="who-uses__item">
            <img
              src={IconsAboutOrganization}
              alt={IconsAboutOrganization}
              className="who-uses__icon"
            />
            <h3>Qurumlar</h3>
            <p>
              Lider təşkilatlar mübarizə sahələrində irəliləyir və yeni
              dəstəkçilərlə əlaqə qurur.
            </p>
          </div>

          <div className="who-uses__item">
            <img
              src={IconsAboutMedia}
              alt={IconsAboutMedia}
              className="who-uses__icon"
            />
            <h3>Media</h3>
            <p>
              Jurnalistlər güclü hekayələrə çıxış tapır və hər gün yüzlərlə
              kampaniyanı mediaya daşıyır.
            </p>
          </div>
        </div>
      </div>
      <div className="about">
        <div className="how-it-works">
          <h2 className="how-it-works__title">Petisia.az necə işləyir?</h2>

          <div className="how-it-works__step">
            <h3>Hər kəs kampaniya başlada bilər</h3>
            <p>
              Dünyanın hər yerindən fərdlər və təşkilatlar pulsuz olaraq
              kampaniya başlada bilərlər.
            </p>
          </div>

          <img
            src={IconsAboutArrow}
            alt={IconsAboutArrow}
            className="how-it-works__arrow"
          />

          <div className="how-it-works__step">
            <h3>Kampaniya başladanlar və dəstəkçilər paylaşır</h3>
            <p>
              Kampaniya dostlarla, ailə ilə və digər dəstəkçilərlə paylaşılır və
              ictimai dəstək qazanır.
            </p>
          </div>

          <img
            src={IconsAboutArrow}
            alt={IconsAboutArrow}
            className="how-it-works__arrow"
          />

          <div className="how-it-works__step">
            <h3>Kampaniya yeni insanlara çatır</h3>
            <p>
              Kampaniyanın medianın gündəminə gəlməsi və fəaliyyətlər onu daha
              çox insanla birləşdirir.
            </p>
          </div>

          <img
            src={IconsAboutArrow}
            alt={IconsAboutArrow}
            className="how-it-works__arrow"
          />

          <div className="how-it-works__step">
            <h3>Qərar vericilər reaksiya göstərir</h3>
            <p>
              Qərar vericilər kampaniyaya cavab verərək mövqelərini bildirə
              bilərlər.
            </p>
          </div>

          <img
            src={IconsAboutArrow}
            alt={IconsAboutArrow}
            className="how-it-works__arrow"
          />

          <div className="how-it-works__step">
            <h3>Uğur elan olunur</h3>
            <p>
              Milyonlarla insan birgə çalışaraq yerli, milli və beynəlxalq
              miqyasda dəyişiklik yaradır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
