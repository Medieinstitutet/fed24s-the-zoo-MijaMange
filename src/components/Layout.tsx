import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <img src="/wildly-logo.png" alt="Wildly logo" className="logo" />
        <span className="logo-sub">Virtuellt zoo för fridlysta arter</span>
        <ul className="nav-links">
          <li><Link to="/">Start</Link></li>
          <li><Link to="/animals">Djur</Link></li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
