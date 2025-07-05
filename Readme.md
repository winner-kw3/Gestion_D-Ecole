# Gestion D-Ecole

**Gestion D-Ecole** est une application de gestion scolaire complète, composée d’un frontend web (React), d’une interface lourde (Electron) et d’une base de données MySQL, le tout orchestré avec Docker.

---

## Sommaire

- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation & Lancement](#installation--lancement)
- [Utilisation du Makefile](#utilisation-du-makefile)
- [Structure des dossiers](#structure-des-dossiers)
- [Base de données](#base-de-données)
- [Développement](#développement)
- [Dépannage](#dépannage)
- [Auteurs](#auteurs)

---

## Architecture

- **frontend_** : Application React (interface web)
- **frontend_lourd** : Application Electron (interface lourde)
- **mysql-init** : Scripts d’initialisation de la base MySQL
- **docker-compose.yml** : Orchestration des services (frontend, backend, base de données)
- **Makefile** : Automatisation des tâches courantes

---

## Prérequis

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/)

---

## Installation & Lancement

1. **Cloner le dépôt**
   ```sh
   git clone <url_du_repo>
   cd Gestion_D-Ecole
   ```

2. **Configurer les variables si besoin**
   - Adapter le mot de passe MySQL dans le `Makefile` (`db-init`).
   - Vérifier les ports dans `docker-compose.yml`.

3. **Build et lancement complet**
   ```sh
   make start
   ```
   Cela va :
   - Installer les dépendances et builder le frontend et Electron
   - Démarrer les conteneurs Docker
   - Lancer l’application Electron

4. **Accéder à l’application**
   - **Web** : [http://localhost:3000](http://localhost:3000)
   - **Electron** : L’interface lourde se lance automatiquement

---

## Utilisation du Makefile

| Commande           | Description                                      |
|--------------------|-------------------------------------------------|
| `make build`       | Build le frontend React et Electron              |
| `make docker-up`   | Démarre les conteneurs Docker                    |
| `make docker-down` | Arrête les conteneurs Docker                     |
| `make db-init`     | Réinitialise la base MySQL avec le script SQL    |
| `make electron`    | Lance l’application Electron                     |
| `make clean`       | Supprime les builds et dépendances               |
| `make start`       | Build + Docker + Electron                        |

---

## Structure des dossiers

```
Gestion_D-Ecole/
├── frontend_/           # Application React (web)
├── frontend_lourd/      # Application Electron (lourde)
├── mysql-init/          # Scripts SQL d'init de la base
├── docker-compose.yml   # Orchestration Docker
├── Makefile             # Automatisation des tâches
└── Readme.md            # Documentation
```

---

## Base de données

- **Type** : MySQL
- **Init** : `mysql-init/init.sql`
- **Tables principales** : `users`, `etudiants`, etc.
- **Pour réinitialiser** :
  ```sh
  make db-init
  ```

---

## Développement

- **Frontend web** :
  ```sh
  cd frontend_
  npm install
  npm run dev
  ```
- **Frontend lourd (Electron)** :
  ```sh
  cd frontend_lourd
  npm install
  npm run build
  npx electron dist/main.js
  ```
- **Base de données** :  
  Les scripts d’init sont dans `mysql-init/init.sql`.

---

## Dépannage

- **Indentation Makefile** : Utiliser des TAB, pas des espaces.
- **Ports** : Vérifier que les ports ne sont pas déjà utilisés.
- **Mot de passe MySQL** : Adapter dans le Makefile et `docker-compose.yml`.
- **Logs Docker** :  
  ```sh
  docker-compose logs
  ```
- **Problème de build** :  
  ```sh
  make clean
  make build
  ```

---

## Auteurs

- Kodjo Winner Isac

---
