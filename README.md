

# ProjetPerso-Authentification_et_Gestion_de_Tokens
Ce projet est une application SaaS qui permet aux utilisateurs de s'inscrire, se connecter et gérer leur session via des tokens JWT. Les comptes utilisateurs et les tokens sont stockés dans une base de données MySQL.

## Fonctionnalités
- Inscription avec hachage sécurisé des mots de passe
- Connexion avec génération de token JWT
- Stockage des tokens en base de données pour la gestion des sessions
- Vérification de la validité des tokens
- Frontend React pour l'authentification des utilisateurs

## Endpoints API
### Authentification
- `POST /api/auth/signup` : Inscription d'un utilisateur (email + mot de passe haché)
- `POST /api/auth/login` : Connexion et génération d'un token JWT
- `POST /api/auth/verify-token` : Vérification de la validité d'un token JWT

## Base de Données
### Tables principales
#### `users`
| id  | email       | password          |
|-----|------------|-------------------|
| 1   | test@mail.com | hash_du_mot_de_passe |

#### `user_tokens`
| id  | user_id | token       | expires_at          |
|-----|---------|------------|---------------------|
| 1   | 1       | jwt_token  | 2025-02-07 12:00:00 |

## Frontend
Le frontend est développé avec React et utilise React Router pour la navigation. Les pages principales incluent :
- `LandingPage` : Page d'accueil
- `LoginPage` : Page de connexion
- `SignupPage` : Page d'inscription
- `HomePage` : Page principale après connexion

