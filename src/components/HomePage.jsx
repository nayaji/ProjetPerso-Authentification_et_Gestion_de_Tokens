import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Utilisation de fetch pour vérifier le token
    fetch('https://grown-dynamic-mallard.ngrok-free.app/api/auth/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur de vérification du token');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Réponse du serveur :', data);
        setMessage(data.message || 'Token valide. Bienvenue !');
      })
      .catch((err) => {
        console.error('Erreur de vérification du token :', err);
        navigate('/login');
      });
  }, [navigate]);

  return <div>{message || 'Chargement...'}</div>;
};

export default HomePage;
