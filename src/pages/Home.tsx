// src/pages/Home.tsx
const Home = () => {
    return (
      <section className="home-hero">
        <div className="hero-bg" />
  
        <div className="home-intro fade-in">
          {/* 🔽 Bild som header i kortet */}
          <img
            src="/hero-djur.png"
            alt="Djur tillsammans"
            className="intro-image"
          />
  
          <h1>Välkommen till <span>Wildly</span></h1>
          <p>
            Ett virtuellt zoo där djuren slipper burar.
            Här kan barn lära sig om djurens behov, personligheter och naturliga liv – med omsorg och nyfikenhet.
          </p>
          <p className="highlight">
            Mata djuren, följ deras status och ta del av deras berättelser.
          </p>
          <button className="cta-button" onClick={() => window.location.href = '/animals'}>
            Utforska djuren 🐾
          </button>
        </div>
  
        <div className="features-grid">
          <div className="feature-card">
            <h3>💚 Lär dig</h3>
            <p>Upptäck fakta om hotade arter och deras livsmiljöer.</p>
          </div>
          <div className="feature-card">
            <h3>🍼 Mata</h3>
            <p>Följ djurens hungerstatus och hjälp dem trivas.</p>
          </div>
          <div className="feature-card">
            <h3>🌍 Skydda</h3>
            <p>Bygg förståelse och empati för djur i det vilda.</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Home;
  