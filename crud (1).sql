-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2024 at 02:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `internship`
--

CREATE TABLE `internship` (
  `proj_id` int(4) NOT NULL,
  `sid` int(4) NOT NULL,
  `proj_name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `internship`
--

INSERT INTO `internship` (`proj_id`, `sid`, `proj_name`) VALUES
(1, 1, 'CRUD Operations'),
(2, 2, 'CSV file upload');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `sid` int(4) NOT NULL,
  `name` varchar(25) NOT NULL,
  `dep` varchar(5) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`sid`, `name`, `dep`, `address`) VALUES
(1, 'Rupesh', 'MCA', 'Nipani\r'),
(2, 'Demo', 'MBA', 'Belgaum'),
(3, 'Niranjan', 'MCA', 'Nipani'),
(4, 'chiro', 'CS', 'Belgaum'),
(5, 'Rupesh', 'MCA', 'Nipani\r'),
(6, 'Reyna', 'MCA', 'Nipani\r'),
(7, 'Rupesh', 'MCA', 'Nipani'),
(9, 'somesh', 'MCA', 'angol');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `internship`
--
ALTER TABLE `internship`
  ADD KEY `sid` (`sid`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`sid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `internship`
--
ALTER TABLE `internship`
  ADD CONSTRAINT `internship_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `student` (`sid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
