-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2019 at 06:29 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

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
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `id_city` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `passengers` int(2) NOT NULL,
  `baggage` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `id_city`, `name`, `price`, `passengers`, `baggage`) VALUES
(0000000001, 1, 'Toyota Avanza', 230000, 6, 2),
(0000000002, 1, 'Toyota Agya', 200000, 5, 2),
(0000000003, 2, 'Daihatsu Xenia', 220000, 6, 2),
(0000000004, 2, 'Daihatsu Ayla', 210000, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `car_rentals`
--

CREATE TABLE `car_rentals` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `id_car` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `price` int(11) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_proof` text DEFAULT NULL,
  `rentals_code` varchar(6) NOT NULL,
  `information` text DEFAULT NULL,
  `rentals_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Bogor', '2019-10-22 15:06:04', '2019-10-22 15:06:04'),
(2, 'Jakarta', '2019-10-22 15:06:04', '2019-10-22 15:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `id_city` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hotel`
--

INSERT INTO `hotel` (`id`, `id_city`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, 'Fave Hotel', '2019-10-22 15:06:34', '2019-10-22 15:06:34'),
(2, 1, 'Hotel Santika', '2019-10-22 15:06:34', '2019-10-22 15:06:34'),
(3, 2, 'Hotel JW Mariot', '2019-10-22 15:06:34', '2019-10-22 15:06:34'),
(4, 2, 'Hotel Shangri La', '2019-10-22 15:06:34', '2019-10-22 15:06:34');

-- --------------------------------------------------------

--
-- Table structure for table `hotel_booked`
--

CREATE TABLE `hotel_booked` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `id_users` int(11) UNSIGNED ZEROFILL NOT NULL,
  `id_hotel_rooms` int(11) NOT NULL,
  `check_in_at` date NOT NULL,
  `check_out_at` date NOT NULL,
  `number_guests` int(2) NOT NULL,
  `price` int(11) NOT NULL,
  `payment_method` varchar(100) NOT NULL,
  `payment_proof` text DEFAULT NULL,
  `booking_code` varchar(6) NOT NULL,
  `booked_status` varchar(50) NOT NULL DEFAULT 'Choose Payment Method',
  `information` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hotel_booked`
--

INSERT INTO `hotel_booked` (`id`, `id_users`, `id_hotel_rooms`, `check_in_at`, `check_out_at`, `number_guests`, `price`, `payment_method`, `payment_proof`, `booking_code`, `booked_status`, `information`, `created_at`, `updated_at`) VALUES
(0000000002, 00000000001, 1, '2019-10-23', '2019-10-24', 2, 0, 'GoPay', NULL, '', 'Payment Declined', 'Struk tidak sah.', '2019-10-22 22:06:30', '2019-10-22 22:22:33');

-- --------------------------------------------------------

--
-- Table structure for table `hotel_rooms`
--

CREATE TABLE `hotel_rooms` (
  `id` int(11) NOT NULL,
  `id_hotel` int(11) NOT NULL,
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
(1, 1, 'Deluxe', 500000, '2019-10-23', '2019-10-24', 5, 4),
(2, 1, 'Melati', 200000, '2019-10-23', '2019-10-24', 4, 2),
(3, 3, 'Economy', 400000, '2019-10-23', '2019-10-24', 6, 2),
(4, 3, 'VIP', 900000, '2019-10-23', '2019-10-24', 3, 4);

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
  `email` varchar(70) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `num_phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `num_phone`, `password`, `created_at`, `updated_at`) VALUES
(00000000001, 'jum@gmail.com', 'Jumaidil', 'Fadillah', '085267906085', '$2a$10$dSQNtW/ZGxxyNkCSdJS8cOR3BcMi5WvEYX06ZSm2qWg6AZ3jGoxw6', '2019-10-22 14:23:22', '2019-10-22 14:23:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_city` (`id_city`);

--
-- Indexes for table `car_rentals`
--
ALTER TABLE `car_rentals`
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
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `car_rentals`
--
ALTER TABLE `car_rentals`
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
  MODIFY `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`id_city`) REFERENCES `city` (`id`);

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
