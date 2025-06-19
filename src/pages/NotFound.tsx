import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="fade-in">
      <h2>404 - Sidan finns inte</h2>
      <p>Vi hittade tyvärr inte sidan du letade efter.</p>
      <Link to="/">Gå till startsidan</Link>
    </section>
  );
};

export default NotFound;
