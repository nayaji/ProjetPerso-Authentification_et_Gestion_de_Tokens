import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Email et mot de passe sont requis.");
      return;
    }
  
    try {
      const response = await fetch('https://grown-dynamic-mallard.ngrok-free.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }
  
      navigate('/login');
    } catch (err) {
      console.error("Erreur d'inscription :", err);
      setError(err.message || "Erreur lors de l'inscription");
    }
  };
  

  return (
    <div>
      <h2>S&apos;inscrire</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>{"S'inscrire"}</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignupPage;
