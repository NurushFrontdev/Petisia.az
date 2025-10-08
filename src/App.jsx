import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./pages/layout";
import Search from "./pages/Search";
import Mycampaign from "./pages/Mycampaign";
import CompanyStart from "./pages/CompanyStart";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Detail from "./pages/CardDedals";
import PayShare from "./pages/PayShare";
import Profile from "./pages/Profile";
import Authorİnformation from "./pages/Authorİnformation";
import About from "./pages/About";
import ContactAuthor from "./pages/ContactAuthor";

function App() {
  const [campaigns, setCampaigns] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Home campaigns={campaigns} setCampaigns={setCampaigns} />}
          />

          <Route
            path="kampanyalarım"
            element={<Mycampaign campaigns={campaigns} />}
          />
          <Route path="haqqımızda" element={<About />} />
          <Route path="kampanyalarım/profil" element={<Profile />} />
          <Route path="axtar" element={<Search campaigns={campaigns} />} />
          <Route path="contact-author" element={<ContactAuthor />} />
          <Route
            path="kampanya-baslat"
            element={<CompanyStart setCampaigns={setCampaigns} />}
          />

          <Route path="daxil-ol" element={<Login />} />

          <Route path="detail/:id" element={<Detail />} />

          <Route path="pay-or-share" element={<PayShare />} />
          <Route
            path="author-info"
            element={<Authorİnformation campaigns={campaigns} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
