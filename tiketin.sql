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
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_city` int(11) unsigned zerofill NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `passengers` int(2) NOT NULL,
  `baggage` int(2) NOT NULL,
  `image` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_city` (`id_city`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.car: ~4 rows (approximately)
DELETE FROM `car`;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` (`id`, `id_city`, `name`, `price`, `passengers`, `baggage`, `image`, `created_at`, `updated_at`) VALUES
	(00000000001, 00000000001, 'Toyota Avanza', 230000, 6, 2, 'toyota-avanza.jpg', '2019-10-23 07:02:49', '2019-10-23 07:02:49'),
	(00000000002, 00000000001, 'Toyota Agya', 200000, 5, 2, NULL, '2019-10-23 07:02:49', '2019-10-23 07:02:49'),
	(00000000003, 00000000002, 'Daihatsu Xenia', 220000, 6, 2, NULL, '2019-10-23 07:02:49', '2019-10-23 07:02:49'),
	(00000000004, 00000000002, 'Daihatsu Ayla', 210000, 5, 2, NULL, '2019-10-23 07:02:49', '2019-10-23 07:02:49');
/*!40000 ALTER TABLE `car` ENABLE KEYS */;

-- Dumping structure for table tiketin.car_booked
CREATE TABLE IF NOT EXISTS `car_booked` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
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
	(00000000001, 00000000001, 00000000001, '2019-10-24', '2019-10-24', 230000, 'OVO', 'Sam9Uv_bukti.jpg', 'HXRUSC', '', 'Payment Accept', '2019-10-23 18:38:56', '2019-10-23 18:52:08');
/*!40000 ALTER TABLE `car_booked` ENABLE KEYS */;

-- Dumping structure for table tiketin.city
CREATE TABLE IF NOT EXISTS `city` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.city: ~3 rows (approximately)
DELETE FROM `city`;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(00000000001, 'Bogor', '2019-10-22 15:06:04', '2019-10-22 15:06:04'),
	(00000000002, 'Jakarta', '2019-10-22 15:06:04', '2019-10-22 15:06:04'),
	(00000000003, 'Bali', '2019-10-25 03:54:59', '2019-10-25 03:54:59');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;

-- Dumping structure for table tiketin.flight_airline
CREATE TABLE IF NOT EXISTS `flight_airline` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.flight_airline: ~3 rows (approximately)
DELETE FROM `flight_airline`;
/*!40000 ALTER TABLE `flight_airline` DISABLE KEYS */;
INSERT INTO `flight_airline` (`id`, `name`, `image`) VALUES
	(00000000001, 'Garuda Indonesia', 'garuda-indonesia.png'),
	(00000000002, 'Citilink', 'citilink.png'),
	(00000000003, 'Lion Air', 'lion-air.png');
/*!40000 ALTER TABLE `flight_airline` ENABLE KEYS */;

-- Dumping structure for table tiketin.flight_airport
CREATE TABLE IF NOT EXISTS `flight_airport` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_city` int(11) unsigned zerofill NOT NULL,
  `name` varchar(50) NOT NULL,
  `code` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.flight_airport: ~2 rows (approximately)
DELETE FROM `flight_airport`;
/*!40000 ALTER TABLE `flight_airport` DISABLE KEYS */;
INSERT INTO `flight_airport` (`id`, `id_city`, `name`, `code`) VALUES
	(00000000001, 00000000002, 'Soekarno Hatta', 'CGK'),
	(00000000002, 00000000003, 'Ngurah Rai', 'DPS');
/*!40000 ALTER TABLE `flight_airport` ENABLE KEYS */;

-- Dumping structure for table tiketin.flight_booked
CREATE TABLE IF NOT EXISTS `flight_booked` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_users` int(11) unsigned zerofill NOT NULL,
  `id_flight_schedule` int(11) unsigned zerofill NOT NULL,
  `price` int(11) NOT NULL,
  `contact_name` varchar(50) NOT NULL,
  `contact_num_phone` varchar(50) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_proof` text,
  `booking_code` varchar(6) DEFAULT NULL,
  `booked_status` varchar(50) NOT NULL,
  `information` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.flight_booked: ~1 rows (approximately)
DELETE FROM `flight_booked`;
/*!40000 ALTER TABLE `flight_booked` DISABLE KEYS */;
INSERT INTO `flight_booked` (`id`, `id_users`, `id_flight_schedule`, `price`, `contact_name`, `contact_num_phone`, `payment_method`, `payment_proof`, `booking_code`, `booked_status`, `information`, `created_at`, `updated_at`) VALUES
	(00000000001, 00000000001, 00000000001, 1100000, 'Jumaidil Fadillah', '085267906085', 'Transfer BCA', 'IeeNnO_bukti.jpg', 'UEMEAB', 'Payment Accept', '', '2019-10-25 06:06:21', '2019-10-25 14:43:14');
/*!40000 ALTER TABLE `flight_booked` ENABLE KEYS */;

-- Dumping structure for table tiketin.flight_passenger
CREATE TABLE IF NOT EXISTS `flight_passenger` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_flight_schedule` int(11) unsigned zerofill NOT NULL,
  `full_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.flight_passenger: ~0 rows (approximately)
DELETE FROM `flight_passenger`;
/*!40000 ALTER TABLE `flight_passenger` DISABLE KEYS */;
INSERT INTO `flight_passenger` (`id`, `id_flight_schedule`, `full_name`) VALUES
	(00000000001, 00000000001, 'Jumaidil Fadillah');
/*!40000 ALTER TABLE `flight_passenger` ENABLE KEYS */;

-- Dumping structure for table tiketin.flight_schedule
CREATE TABLE IF NOT EXISTS `flight_schedule` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_flight_airline` int(11) unsigned zerofill NOT NULL,
  `flight_number` varchar(10) NOT NULL,
  `from_id_city` int(11) unsigned zerofill NOT NULL,
  `from_airport` varchar(50) NOT NULL,
  `from_airport_code` varchar(10) NOT NULL,
  `from_at` datetime NOT NULL,
  `to_id_city` int(11) unsigned zerofill NOT NULL,
  `to_airport` varchar(50) NOT NULL,
  `to_airport_code` varchar(10) NOT NULL,
  `to_at` datetime NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.flight_schedule: ~2 rows (approximately)
DELETE FROM `flight_schedule`;
/*!40000 ALTER TABLE `flight_schedule` DISABLE KEYS */;
INSERT INTO `flight_schedule` (`id`, `id_flight_airline`, `flight_number`, `from_id_city`, `from_airport`, `from_airport_code`, `from_at`, `to_id_city`, `to_airport`, `to_airport_code`, `to_at`, `price`, `created_at`, `updated_at`) VALUES
	(00000000001, 00000000001, 'GA-421', 00000000002, 'Soekarno Hatta', 'CGK', '2019-10-27 11:09:05', 00000000003, 'Ngurah Rai', 'DPS', '2019-10-27 13:09:42', 1100000, '2019-10-25 04:09:51', '2019-10-25 04:09:51'),
	(00000000002, 00000000002, 'QG-19', 00000000002, 'Soekarno Hatta', 'CGK', '2019-10-27 08:09:05', 00000000003, 'Ngurah Rai', 'DPS', '2019-10-27 10:09:42', 800000, '2019-10-25 04:09:51', '2019-10-25 04:09:51');
/*!40000 ALTER TABLE `flight_schedule` ENABLE KEYS */;

-- Dumping structure for table tiketin.hotel
CREATE TABLE IF NOT EXISTS `hotel` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_city` int(11) unsigned zerofill NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_city` (`id_city`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.hotel: ~4 rows (approximately)
DELETE FROM `hotel`;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */;
INSERT INTO `hotel` (`id`, `id_city`, `name`, `image`, `created_at`, `updated_at`) VALUES
	(00000000001, 00000000001, 'Fave Hotel', 'fave-hotel.jpg', '2019-10-22 15:06:34', '2019-10-22 15:06:34'),
	(00000000002, 00000000001, 'Hotel Santika', NULL, '2019-10-22 15:06:34', '2019-10-22 15:06:34'),
	(00000000003, 00000000002, 'Hotel JW Mariot', NULL, '2019-10-22 15:06:34', '2019-10-22 15:06:34'),
	(00000000004, 00000000002, 'Hotel Shangri La', NULL, '2019-10-22 15:06:34', '2019-10-22 15:06:34');
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */;

-- Dumping structure for table tiketin.hotel_booked
CREATE TABLE IF NOT EXISTS `hotel_booked` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_users` int(11) unsigned zerofill NOT NULL,
  `id_hotel_rooms` int(11) unsigned zerofill NOT NULL,
  `check_in_at` date NOT NULL,
  `check_out_at` date NOT NULL,
  `number_guests` int(2) NOT NULL,
  `price` int(11) NOT NULL,
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
	(00000000001, 00000000001, 00000000001, '2019-10-23', '2019-10-24', 2, 400000, 'GoPay', 'IqdCoV_bukti.jpg', 'CXGZSW', 'Payment Accept', '', '2019-10-23 09:47:10', '2019-10-25 14:19:22');
/*!40000 ALTER TABLE `hotel_booked` ENABLE KEYS */;

-- Dumping structure for table tiketin.hotel_rooms
CREATE TABLE IF NOT EXISTS `hotel_rooms` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_hotel` int(11) unsigned zerofill NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `image` text,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `stock` int(11) NOT NULL,
  `maximum_guests` int(2) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_hotel` (`id_hotel`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.hotel_rooms: ~4 rows (approximately)
DELETE FROM `hotel_rooms`;
/*!40000 ALTER TABLE `hotel_rooms` DISABLE KEYS */;
INSERT INTO `hotel_rooms` (`id`, `id_hotel`, `name`, `price`, `image`, `from_date`, `to_date`, `stock`, `maximum_guests`, `created_at`, `updated_at`) VALUES
	(00000000001, 00000000001, 'Deluxe', 500000, 'favehotel-room.jpg', '2019-10-27', '2019-10-28', 5, 4, '2019-10-23 07:05:06', '2019-10-23 07:05:06'),
	(00000000002, 00000000001, 'Melati', 200000, NULL, '2019-10-27', '2019-10-28', 4, 2, '2019-10-23 07:05:06', '2019-10-23 07:05:06'),
	(00000000003, 00000000003, 'Economy', 400000, NULL, '2019-10-27', '2019-10-28', 6, 2, '2019-10-23 07:05:06', '2019-10-23 07:05:06'),
	(00000000004, 00000000003, 'VIP', 900000, NULL, '2019-10-27', '2019-10-28', 3, 4, '2019-10-23 07:05:06', '2019-10-23 07:05:06');
/*!40000 ALTER TABLE `hotel_rooms` ENABLE KEYS */;

-- Dumping structure for table tiketin.payment_method
CREATE TABLE IF NOT EXISTS `payment_method` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image` text,
  `type` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.payment_method: ~2 rows (approximately)
DELETE FROM `payment_method`;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
INSERT INTO `payment_method` (`id`, `name`, `image`, `type`, `created_at`, `updated_at`) VALUES
	(00000000001, 'Transfer Bank - BCA', NULL, 'Transfer', '2019-10-23 07:03:59', '2019-10-23 07:03:59'),
	(00000000002, 'GoPay', NULL, 'e-Wallet', '2019-10-23 07:03:59', '2019-10-23 07:03:59');
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;

-- Dumping structure for table tiketin.promo
CREATE TABLE IF NOT EXISTS `promo` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `feature_image` text NOT NULL,
  `content` text NOT NULL,
  `valid_from` datetime NOT NULL,
  `valid_until` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.promo: ~3 rows (approximately)
DELETE FROM `promo`;
/*!40000 ALTER TABLE `promo` DISABLE KEYS */;
INSERT INTO `promo` (`id`, `title`, `feature_image`, `content`, `valid_from`, `valid_until`, `created_at`, `update_at`) VALUES
	(00000000001, 'Diskon Sewa Hotel', 'diskon-sewa-hotek.jpg', 'Isi content.', '2019-10-23 11:00:00', '2019-11-10 11:00:00', '2019-10-24 11:21:18', '2019-10-24 11:21:19'),
	(00000000002, 'Promo Rental Mobil', 'promo-rental-mobil.jpg', 'S&K promo rental mobil:', '2019-10-23 11:00:00', '2019-12-23 11:00:00', '2019-10-24 05:48:40', '2019-10-24 05:48:40'),
	(00000000003, 'Cashback Pesan Hotel', 'lyM16Y_strike-freedom-wallpaper.jpg', 'Ini adalah isi dari detail promo.', '2019-10-23 10:00:00', '2019-11-22 21:00:00', '2019-10-24 07:09:17', '2019-10-24 07:09:17');
/*!40000 ALTER TABLE `promo` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table tiketin.users: ~5 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `num_phone`, `password`, `photo_profile`, `created_at`, `updated_at`) VALUES
	(00000000001, 'jumaidilfadillah@gmail.com', 'Jumaidil', 'Fadillah', '085267906085', '$2a$10$qSdBAhv2krDCRPxZJ.buFuax4zfq0/dy236EG.qt4VvywNeOFbnNG', NULL, '2019-10-22 14:23:22', '2019-10-22 14:23:22'),
	(00000000002, 'sutan.gnst@gmail.com ', 'Gading', 'Nasution', '6281271377018', '$2a$10$Fk8rzc9SrXj5LZKcJqzh5uyEXyI3RACPXl2/Jmp.v1yOkZf6dumGe', NULL, '2019-10-23 15:50:55', '2019-10-23 15:50:55'),
	(00000000003, 'suta.gnst@gmail.com ', 'Gading', 'Nasution', '6281271377018', '$2a$10$6eqKLuNSDQXyEj07n82Uj.TaeN6VG7Pbt97uxh8l/h1xoQqbuMSFe', NULL, '2019-10-23 15:58:52', '2019-10-23 15:58:52'),
	(00000000004, 'Nasution@gmail.com', 'Fadil', 'Ganteng', '6281271377018', '$2a$10$AYRFYYCXhsKmjvnOS08JmObzIhGly86EuDz6DO5RXiAPxD5Ka3h7.', NULL, '2019-10-23 18:26:47', '2019-10-23 18:26:47'),
	(00000000005, 'zzz@gmail.com', 'Gading', 'Nasution', '6281271377018', '$2a$10$0UeJ1gfYAUWgW6/wFWV0Xu4gGk506tEsY7mzFWujpU8APpzPfST22', NULL, '2019-10-23 18:52:55', '2019-10-23 18:52:55');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
