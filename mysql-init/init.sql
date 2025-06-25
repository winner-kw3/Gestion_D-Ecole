-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 24 juin 2025 à 23:06
-- Version du serveur : 9.2.0
-- Version de PHP : 8.1.25
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
--
-- Base de données : `gestion_etudiants`

CREATE DATABASE IF NOT EXISTS gestion_ecole CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gestion_ecole;

-- ...le reste de ton script...

--
-- --------------------------------------------------------
--
-- Structure de la table `etudiants`
--
CREATE TABLE `etudiants` (
  `id` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `age` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
--
-- Déchargement des données de la table `etudiants`
--
INSERT INTO `etudiants` (`id`, `nom`, `prenom`, `email`, `age`, `created_at`) VALUES
(9, 'Test', 'Test', 'test@gmail.com', 18, '2025-06-21 08:58:17'),
(10, 'Test', 'dfvdvd', 'fvdv@qfq.com', 18, '2025-06-21 11:30:39'),
(11, 'scsc', 'scss', 'scsc@qdcq.fe', 16, '2025-06-21 12:41:23'),
(12, 'qqweweqe', 'qeqeq', 'qeqeq@dqdq.com', 23, '2025-06-23 11:49:22');
-- --------------------------------------------------------
--
-- Structure de la table `users`
--
CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` varchar(50) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
--
-- Déchargement des données de la table `users`
--
INSERT INTO `users` (`id`, `email`, `password`, `created_at`, `updated_at`, `role`) VALUES
(1, 'nouveluser@example.com', '$2b$10$Vl5r6axOInfkKZaeC4CCjOXjlBUgXRtEPbNttaHaerzeE7oDxgGHe', '2025-06-14 10:00:39', '2025-06-14 10:00:39', 'user'),
(5, 'kodjowinnerisac@gmail.com', '$2b$10$6SVQwJfaY2k3Ts1cpIjL2.UCOX1WxPjQocNZl0XlRrFrKBfIw8AsC', '2025-06-21 08:39:28', '2025-06-21 09:47:44', 'admin'),
(6, 'test2@gmail.com', '$2b$10$1FJ/w5zB0YGxyV/9x.SK8uCh66ri9AupQxIehUknirAaIKyCd.83u', '2025-06-21 08:59:50', '2025-06-21 08:59:50', 'user'),
(7, 'fzsfz@fqf.com', '$2b$10$U6/x9bCVuiADva4cHwB9f.BlgMZb1.k5cBdeUEtcQZkLSA1F1wpDG', '2025-06-21 09:51:00', '2025-06-21 09:51:00', 'user'),
(8, 'test3@gmail.com', '$2b$10$89KRWi6/9ZgKPF2zK84k/.KB3zPvdRMAtYmUUlgUd9wo/cPzGCaHO', '2025-06-21 09:52:36', '2025-06-21 09:52:36', 'user'),
(9, 'fefffffffffffffzsdfz@fqf.sc', '$2b$10$vsvzqN/UD9RjmbbOI6y03eWjavF9ffuuvMvCy1jUAE3UbwtWP/GoC', '2025-06-21 10:03:26', '2025-06-21 10:03:26', 'user'),
(10, 'geg@qfq.dz', '$2b$10$/5vkvld3.4Z3jR/9aR7TQ.PrMekENhl.Y5s8W4ErmW88.8EDkAbmW', '2025-06-21 10:14:18', '2025-06-21 10:14:18', 'user'),
(11, 'test4@gmail.com', '$2b$10$2sgL5hh7OqhJiyZMDS5WTO0m3sbazkM0sIMNe47WsdetSKnA9ENXe', '2025-06-21 11:32:10', '2025-06-21 11:32:10', 'user'),
(12, 'test@test.com', '$2b$10$9TiPmhrTzDFegFOD138.ueaUHRCCzsItt.v0JrnXFmmKiUTSWi4zS', '2025-06-21 12:40:32', '2025-06-21 12:40:32', 'user'),
(13, 'test@example.com', '$2b$10$ZXUCIDpeKZPmeC/BbXW.rOREnh8byjJ33QzIarFjANRcZSDxp1a5e', '2025-06-24 07:29:09', '2025-06-24 07:29:09', 'user');
--
-- Index pour les tables déchargées
--
--
-- Index pour la table `etudiants`
--
ALTER TABLE `etudiants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
--
-- AUTO_INCREMENT pour les tables déchargées
--
--
-- AUTO_INCREMENT pour la table `etudiants`
--
ALTER TABLE `etudiants`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
