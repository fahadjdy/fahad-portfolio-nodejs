-- phpMyAdmin SQL Dump
-- version 6.0.0-dev
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 12, 2025 at 08:23 AM
-- Server version: 8.0.26
-- PHP Version: 8.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fahad_portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `university_name` varchar(100) NOT NULL,
  `location` varchar(50) NOT NULL,
  `year` varchar(50) NOT NULL,
  `persantage` varchar(10) NOT NULL,
  `sgpa` float(10,2) DEFAULT NULL,
  `cgpa` float(10,2) DEFAULT NULL,
  `order_sequence` int NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `education`
--

INSERT INTO `education` (`id`, `name`, `university_name`, `location`, `year`, `persantage`, `sgpa`, `cgpa`, `order_sequence`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'S.S.C.', 'Mahatma Gandhi Vidhyalaya', 'Mumbai', '2013-14', '74.40%', NULL, NULL, 1, 'I have studient at mumbai school ', 1, '2025-08-12 11:08:52', '2025-08-12 11:08:52'),
(2, 'H.S.C.', 'Adarsh Vidhyalaya Basu', 'Gujarat', '2015-16', '80%', NULL, NULL, 2, 'I Have studient at Adasrh vidhyalaya basu at gujarat', 1, '2025-08-12 11:11:43', '2025-08-12 11:11:43');

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `id` int NOT NULL,
  `designation` varchar(50) NOT NULL,
  `office` varchar(50) NOT NULL,
  `year` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `order_sequence` int DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `experience`
--

INSERT INTO `experience` (`id`, `designation`, `office`, `year`, `description`, `order_sequence`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Internship', ' M. Tech websolutions', '2019-21', 'I have started my journy for web development ', 1, 1, '2025-08-12 11:45:27', '2025-08-12 11:45:27'),
(2, 'PHP Developer', 'Namaste Hindustan', '2021-22', 'I have dveloped so many websites', 2, 1, '2025-08-12 11:46:47', '2025-08-12 11:46:47');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `contact` bigint NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `name`, `image`, `email`, `contact`, `address`) VALUES
(1, 'FHD', 'assets/profile/1754981740832-205437471.jpeg', 'fahad@example.com', 7203070468, 'Basu');

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`id`, `name`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'html', '', 1, '2025-08-12 11:02:39', '2025-08-12 11:02:39'),
(2, 'php', '', 1, '2025-08-12 11:02:51', '2025-08-12 11:02:51'),
(3, 'css', '', 1, '2025-08-12 11:02:51', '2025-08-12 11:02:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `status`) VALUES
(2, 'fahadjd12@gmail.com', '$2b$10$wJ.9SVIlzkMq0B9oAnPF7.OE5fkScG023Cu18fhbhk7yS96JPANKy', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `experience`
--
ALTER TABLE `experience`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;