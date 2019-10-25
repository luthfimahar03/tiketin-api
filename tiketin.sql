
-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2019 at 10:27 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tiketin`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL,

-- --------------------------------------------------------
-- Host:                         tiketin.c7zy3dpl9od5.us-east-1.rds.amazonaws.com
-- Server version:               5.7.22 - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table tiketin.car
CREATE TABLE IF NOT EXISTS `car` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_city` int(11) unsigned zerofill NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `passengers` int(2) NOT NULL,

  `baggage` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`id`, `id_city`, `name`, `price`, `passengers`, `baggage`) VALUES
(0000000001, 1, 'Toyota Avanza', 230000, 6, 2),
(0000000002, 1, 'Toyota Agya', 200000, 5, 2),
(0000000003, 2, 'Daihatsu Xenia', 220000, 6, 2),
(0000000004, 2, 'Daihatsu Ayla', 210000, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `car_booked`
--

CREATE TABLE `car_booked` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `baggage` int(2) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_city` (`id_city`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.car: ~4 rows (approximately)
DELETE FROM `car`;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` (`id`, `id_city`, `name`, `price`, `passengers`, `baggage`, `created_at`, `updated_at`) VALUES
	(0000000001, 00000000001, 'Toyota Avanza', 230000, 6, 2, '2019-10-23 07:02:49', '2019-10-23 07:02:49'),
	(0000000002, 00000000001, 'Toyota Agya', 200000, 5, 2, '2019-10-23 07:02:49', '2019-10-23 07:02:49'),
	(0000000003, 00000000002, 'Daihatsu Xenia', 220000, 6, 2, '2019-10-23 07:02:49', '2019-10-23 07:02:49'),
	(0000000004, 00000000002, 'Daihatsu Ayla', 210000, 5, 2, '2019-10-23 07:02:49', '2019-10-23 07:02:49');
/*!40000 ALTER TABLE `car` ENABLE KEYS */;

-- Dumping structure for table tiketin.car_booked
CREATE TABLE IF NOT EXISTS `car_booked` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_users` int(11) unsigned zerofill NOT NULL,
  `id_car` int(11) unsigned zerofill NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `price` int(11) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_proof` text,
  `booking_code` varchar(6) DEFAULT NULL,
  `information` text,
  `booked_status` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.car_booked: ~0 rows (approximately)
DELETE FROM `car_booked`;
/*!40000 ALTER TABLE `car_booked` DISABLE KEYS */;
INSERT INTO `car_booked` (`id`, `id_users`, `id_car`, `from_date`, `to_date`, `price`, `payment_method`, `payment_proof`, `booking_code`, `information`, `booked_status`, `created_at`, `updated_at`) VALUES
	(0000000001, 00000000001, 00000000001, '2019-10-24', '2019-10-24', 230000, 'OVO', 'Sam9Uv_bukti.jpg', 'HXRUSC', '', 'Payment Accept', '2019-10-23 18:38:56', '2019-10-23 18:52:08');
/*!40000 ALTER TABLE `car_booked` ENABLE KEYS */;

-- Dumping structure for table tiketin.city
CREATE TABLE IF NOT EXISTS `city` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.city: ~2 rows (approximately)
DELETE FROM `city`;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(0000000001, 'Bogor', '2019-10-22 15:06:04', '2019-10-22 15:06:04'),
	(0000000002, 'Jakarta', '2019-10-22 15:06:04', '2019-10-22 15:06:04');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;

-- Dumping structure for table tiketin.hotel
CREATE TABLE IF NOT EXISTS `hotel` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_city` int(11) unsigned zerofill NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_city` (`id_city`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.hotel: ~4 rows (approximately)
DELETE FROM `hotel`;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */;
INSERT INTO `hotel` (`id`, `id_city`, `name`, `created_at`, `updated_at`) VALUES
	(00000000001, 00000000001, 'Fave Hotel', '2019-10-22 15:06:34', '2019-10-22 15:06:34'),
	(00000000002, 00000000001, 'Hotel Santika', '2019-10-22 15:06:34', '2019-10-22 15:06:34'),
	(00000000003, 00000000002, 'Hotel JW Mariot', '2019-10-22 15:06:34', '2019-10-22 15:06:34'),
	(00000000004, 00000000002, 'Hotel Shangri La', '2019-10-22 15:06:34', '2019-10-22 15:06:34');
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */;

-- Dumping structure for table tiketin.hotel_booked
CREATE TABLE IF NOT EXISTS `hotel_booked` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_users` int(11) unsigned zerofill NOT NULL,
  `id_hotel_rooms` int(11) unsigned zerofill NOT NULL,
  `check_in_at` date NOT NULL,
  `check_out_at` date NOT NULL,
  `number_guests` int(2) NOT NULL,
  `price` int(11) NOT NULL,

  `payment_method` varchar(100) NOT NULL,
  `payment_proof` varchar(50) NOT NULL,

  `payment_method` varchar(100) DEFAULT NULL,
  `payment_proof` text,
  `booking_code` varchar(6) DEFAULT NULL,
  `booked_status` varchar(50) NOT NULL,
  `information` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_hotel_rooms` (`id_hotel_rooms`),
  KEY `id_users` (`id_users`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.hotel_booked: ~1 rows (approximately)
DELETE FROM `hotel_booked`;
/*!40000 ALTER TABLE `hotel_booked` DISABLE KEYS */;
INSERT INTO `hotel_booked` (`id`, `id_users`, `id_hotel_rooms`, `check_in_at`, `check_out_at`, `number_guests`, `price`, `payment_method`, `payment_proof`, `booking_code`, `booked_status`, `information`, `created_at`, `updated_at`) VALUES
	(0000000001, 00000000001, 00000000001, '2019-10-23', '2019-10-24', 2, 400000, 'GoPay', 'IqdCoV_bukti.jpg', 'TQKVZP', 'Payment Accept', '', '2019-10-23 09:47:10', '2019-10-23 17:06:03');
/*!40000 ALTER TABLE `hotel_booked` ENABLE KEYS */;

-- Dumping structure for table tiketin.hotel_rooms
CREATE TABLE IF NOT EXISTS `hotel_rooms` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_hotel` int(11) unsigned zerofill NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `stock` int(11) NOT NULL,

  `maximum_guests` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hotel_rooms`
--

INSERT INTO `hotel_rooms` (`id`, `id_hotel`, `name`, `price`, `from_date`, `to_date`, `stock`, `maximum_guests`) VALUES
(1, 1, 'Deluxe', 500000, '2019-10-27', '2019-10-28', 5, 4),
(2, 1, 'Melati', 200000, '2019-10-27', '2019-10-28', 4, 2),
(3, 3, 'Economy', 400000, '2019-10-27', '2019-10-28', 6, 2),
(4, 3, 'VIP', 900000, '2019-10-27', '2019-10-28', 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`id`, `name`) VALUES
(0000000001, 'Transfer Bank - BCA'),
(0000000002, 'GoPay');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED ZEROFILL NOT NULL,
  `maximum_guests` int(2) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_hotel` (`id_hotel`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.hotel_rooms: ~4 rows (approximately)
DELETE FROM `hotel_rooms`;
/*!40000 ALTER TABLE `hotel_rooms` DISABLE KEYS */;
INSERT INTO `hotel_rooms` (`id`, `id_hotel`, `name`, `price`, `from_date`, `to_date`, `stock`, `maximum_guests`, `created_at`, `updated_at`) VALUES
	(00000000001, 00000000001, 'Deluxe', 500000, '2019-10-27', '2019-10-28', 5, 4, '2019-10-23 07:05:06', '2019-10-23 07:05:06'),
	(00000000002, 00000000001, 'Melati', 200000, '2019-10-27', '2019-10-28', 4, 2, '2019-10-23 07:05:06', '2019-10-23 07:05:06'),
	(00000000003, 00000000003, 'Economy', 400000, '2019-10-27', '2019-10-28', 6, 2, '2019-10-23 07:05:06', '2019-10-23 07:05:06'),
	(00000000004, 00000000003, 'VIP', 900000, '2019-10-27', '2019-10-28', 3, 4, '2019-10-23 07:05:06', '2019-10-23 07:05:06');
/*!40000 ALTER TABLE `hotel_rooms` ENABLE KEYS */;

-- Dumping structure for table tiketin.payment_method
CREATE TABLE IF NOT EXISTS `payment_method` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.payment_method: ~2 rows (approximately)
DELETE FROM `payment_method`;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
INSERT INTO `payment_method` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(0000000001, 'Transfer Bank - BCA', '2019-10-23 07:03:59', '2019-10-23 07:03:59'),
	(0000000002, 'GoPay', '2019-10-23 07:03:59', '2019-10-23 07:03:59');
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;

-- Dumping structure for table tiketin.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `email` varchar(70) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `num_phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo_profile` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.users: ~1 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `num_phone`, `password`, `photo_profile`, `created_at`, `updated_at`) VALUES
	(00000000001, 'jumaidilfadillah@gmail.com', 'Jumaidil', 'Fadillah', '085267906085', '$2a$10$qSdBAhv2krDCRPxZJ.buFuax4zfq0/dy236EG.qt4VvywNeOFbnNG', NULL, '2019-10-22 14:23:22', '2019-10-22 14:23:22'),
	(00000000002, 'sutan.gnst@gmail.com ', 'Gading', 'Nasution', '6281271377018', '$2a$10$Fk8rzc9SrXj5LZKcJqzh5uyEXyI3RACPXl2/Jmp.v1yOkZf6dumGe', NULL, '2019-10-23 15:50:55', '2019-10-23 15:50:55'),
	(00000000003, 'suta.gnst@gmail.com ', 'Gading', 'Nasution', '6281271377018', '$2a$10$6eqKLuNSDQXyEj07n82Uj.TaeN6VG7Pbt97uxh8l/h1xoQqbuMSFe', NULL, '2019-10-23 15:58:52', '2019-10-23 15:58:52');
--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_city` (`id_city`);

--
-- Indexes for table `car_booked`
--
ALTER TABLE `car_booked`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_city` (`id_city`);

--
-- Indexes for table `hotel_booked`
--
ALTER TABLE `hotel_booked`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_hotel_rooms` (`id_hotel_rooms`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `hotel_rooms`
--
ALTER TABLE `hotel_rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_hotel` (`id_hotel`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `car_booked`
--
ALTER TABLE `car_booked`
  MODIFY `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hotel_booked`
--
ALTER TABLE `hotel_booked`
  MODIFY `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hotel_rooms`
--
ALTER TABLE `hotel_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (`id_city`) REFERENCES `city` (`id`);

--
-- Constraints for table `hotel`
--
ALTER TABLE `hotel`
  ADD CONSTRAINT `hotel_ibfk_1` FOREIGN KEY (`id_city`) REFERENCES `city` (`id`);

--
-- Constraints for table `hotel_booked`
--
ALTER TABLE `hotel_booked`
  ADD CONSTRAINT `hotel_booked_ibfk_1` FOREIGN KEY (`id_hotel_rooms`) REFERENCES `hotel_rooms` (`id`),
  ADD CONSTRAINT `hotel_booked_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`);

--
-- Constraints for table `hotel_rooms`
--
ALTER TABLE `hotel_rooms`
  ADD CONSTRAINT `hotel_rooms_ibfk_1` FOREIGN KEY (`id_hotel`) REFERENCES `hotel` (`id`);
COMMIT;
 
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
