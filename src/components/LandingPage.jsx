import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div>
    <h1>Bienvenue</h1>
    <p>
      <Link to="/login">Se connecter</Link> | <Link to="/signup">S&apos;inscrire</Link>
    </p>
  </div>
);

export default LandingPage;
