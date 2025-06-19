import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
<nav className="navbar">
  <div className="navbar-center">
    <img src="/logo-tamagotchi.png" alt="Wildly logga" className="logo-big" />
    {/* <h1 className="navbar-title">Wildly</h1> */}
    <p className="navbar-subtitle">Ett virtuellt zoo för djurälskande barn</p>

    <ul className="nav-links">
      <li><Link to="/">Start</Link></li>
      <li><Link to="/animals">Djur</Link></li>
    </ul>
  </div>
</nav>


      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
