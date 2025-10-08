import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="appLayout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
