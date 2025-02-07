import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [message, setMessage] = useState('');
  const [hasAccess, setHasAccess] = useState(false);  // Nouvelle state pour savoir si l'utilisateur a accès
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

        // Vérification du statut de paiement après la validation du token
        fetch('https://grown-dynamic-mallard.ngrok-free.app/api/user/check-access', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // On passe le token pour valider la session
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.accessGranted) {
              setHasAccess(true);  // Si l'utilisateur a un abonnement valide, on met à jour l'état
            } else {
              setHasAccess(false);  // Si l'abonnement n'est pas valide ou expiré, on met à jour l'état
            }
          })
          .catch((err) => {
            console.error('Erreur de vérification de l\'accès :', err);
          });
      })
      .catch((err) => {
        console.error('Erreur de vérification du token :', err);
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div>
      {message || 'Chargement...'}
      {/* Affichage conditionnel de la box */}
      {hasAccess ? (
        <div className="access-box">
          <h2>Félicitations ! Vous avez accès au lobby pendant 7 jours.</h2>
          <p>Profitez des fonctionnalités premium sans interruption !</p>
        </div>
      ) : (
        <div className="no-access">
          <p>Pour accéder au lobby pendant 7 jours, veuillez effectuer un paiement de 2€.</p>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
            <input type="hidden" name="cmd" value="_xclick" />
            <input type="hidden" name="business" value="TON_EMAIL_PAYPAL" />
            <input type="hidden" name="item_name" value="Accès au lobby pour 7 jours" />
            <input type="hidden" name="amount" value="2.00" />
            <input type="hidden" name="currency_code" value="EUR" />
            <input type="submit" value="Payer avec PayPal" />
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
