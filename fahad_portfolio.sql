-- phpMyAdmin SQL Dump
-- version 6.0.0-dev
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 14, 2025 at 07:49 AM
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
  `school` varchar(255) NOT NULL,
  `degree` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `from_date` date NOT NULL,
  `to_date` date DEFAULT NULL,
  `is_current` tinyint(1) DEFAULT '0',
  `grade` varchar(50) DEFAULT NULL,
  `description` text,
  `order_no` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `education`
--

INSERT INTO `education` (`id`, `school`, `degree`, `location`, `from_date`, `to_date`, `is_current`, `grade`, `description`, `order_no`, `created_at`, `updated_at`) VALUES
(1, 'HNGU University', 'B.Sc. Computer Science', 'Ahmedabad, India', '2018-06-01', '2022-05-31', 0, '8.5 CGPA', 'Learned core computer science subjects, worked on various projects.', 1, '2025-08-14 06:31:17', '2025-08-14 06:32:09');

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `company` varchar(150) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `from_date` date NOT NULL,
  `to_date` date DEFAULT NULL,
  `is_current` tinyint(1) DEFAULT '0',
  `description` text,
  `order_no` int UNSIGNED DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `experience`
--

INSERT INTO `experience` (`id`, `title`, `company`, `location`, `from_date`, `to_date`, `is_current`, `description`, `order_no`, `created_at`, `updated_at`) VALUES
(2, 'Full Stack Developer', 'Techaxion Pvt Ltd', 'Ahmedabad, India', '2023-06-01', NULL, 1, 'Developed and maintained web applications using Laravel, Vue.js, and MySQL. Integrated REST APIs and optimized performance.', 1, '2025-08-14 06:21:48', '2025-08-14 06:21:48');

-- --------------------------------------------------------

--
-- Table structure for table `hobbies`
--

CREATE TABLE `hobbies` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL COMMENT '(e.g., Photography, Reading)',
  `description` text COMMENT 'Short description or details about the hobby',
  `order_no` int DEFAULT '0' COMMENT 'Sorting order for display',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Stores personal hobbies for the portfolio';

--
-- Dumping data for table `hobbies`
--

INSERT INTO `hobbies` (`id`, `name`, `description`, `order_no`, `created_at`, `updated_at`) VALUES
(1, 'Gaming', 'I like to hear musics', 1, '2025-08-14 06:44:22', '2025-08-14 06:44:44');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int NOT NULL,
  `full_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL COMMENT 'Short tagline or bio',
  `dob` date DEFAULT NULL,
  `age` int DEFAULT NULL COMMENT 'in years ',
  `gender` enum('Male','Female','Other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `nationality` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` bigint DEFAULT NULL,
  `website` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `location_city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `location_country` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Stores main profile information';

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `full_name`, `image`, `tagline`, `dob`, `age`, `gender`, `address`, `nationality`, `email`, `phone`, `website`, `location_city`, `location_country`, `created_at`, `updated_at`) VALUES
(1, 'Fahad Iliyas Jadiya', 'assets/profile/1755155316936-8664275.jpeg', 'Full Stack Developer | AI Enthusiast', '1998-11-05', 27, 'Male', 'Meta', 'Indian', 'fahad@example.com', 919876543210, 'https://fahadportfolio.com', 'Ahmedabad', 'India', '2025-08-14 06:57:20', '2025-08-14 06:57:20');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '(e.g., JavaScript, MySQL)',
  `level` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '(e.g., Beginner, Expert, 90%)',
  `order_no` int DEFAULT '0' COMMENT 'Sorting order for display on the portfolio',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Stores skills for portfolio display';

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
(2, 'fahadjdy12@gmail.com', '$2b$10$wJ.9SVIlzkMq0B9oAnPF7.OE5fkScG023Cu18fhbhk7yS96JPANKy', 1);

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
-- Indexes for table `hobbies`
--
ALTER TABLE `hobbies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
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
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hobbies`
--
ALTER TABLE `hobbies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;