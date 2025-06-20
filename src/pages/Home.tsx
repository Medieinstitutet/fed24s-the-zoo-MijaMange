import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="home-hero">
      <div className="hero-bg" />

      <div className="home-intro fade-in">
        <img src="/hero-djur.png" alt="Djur tillsammans" className="intro-image" />
        <h1>
          Välkommen till <span>Wildly</span>
        </h1>
        <p>
          Ett virtuellt zoo där djuren slipper burar.
          Här kan ditt barn lära sig om djurens behov, personligheter och naturliga liv – med omsorg och nyfikenhet.
        </p>
        <p className="highlight">Mata djuren och följ deras status.</p>

        <button className="cta-button" onClick={() => (window.location.href = '/animals')}>
          Utforska djuren 🐾
        </button>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <Link to="/animals">
            <img src="/icons/learn.png" alt="Lär dig" className="feature-icon" />
          </Link>
          <p>Upptäck fakta om hotade arter och deras livsmiljöer.</p>
        </div>
        <div className="feature-card">
          <Link to="/animals">
            <img src="/icons/feed.png" alt="Mata" className="feature-icon" />
          </Link>
          <p>Följ djurens hungerstatus och hjälp dem trivas.</p>
        </div>
        <div className="feature-card">
          <Link to="/animals">
            <img src="/icons/protect.png" alt="Skydda" className="feature-icon" />
          </Link>
          <p>Bygg förståelse och empati för djur i det vilda.</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
