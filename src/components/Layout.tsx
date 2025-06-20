import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer'; // justera sökväg om din Footer ligger t.ex. i ../components/Footer

const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-center">
          <Link to="/">
            <img
              src="/logo-tamagotchi.png"
              alt="Wildly logga"
              className="logo-big"
              style={{ cursor: 'pointer' }}
            />
          </Link>
          <p className="navbar-subtitle">
            För djurälskande barn <br /> Där djuren slipper buren
          </p>

          <ul className="nav-links">
            <li><Link to="/">Startsida</Link></li>
            <li><Link to="/animals">Djurparkens djur</Link></li>
          </ul>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <Footer /> {/* 👈 Lägg till detta */}
    </>
  );
};

export default Layout;
