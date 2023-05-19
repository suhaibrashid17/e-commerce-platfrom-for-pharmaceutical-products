-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2023 at 09:22 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_comm_pharma`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`, `status`) VALUES
('admin', '1234', 'admin'),
('ali', '1234', 'moderator');

-- --------------------------------------------------------

--
-- Table structure for table `ban_requests`
--

CREATE TABLE `ban_requests` (
  `moderator_name` varchar(100) NOT NULL,
  `seller_username` varchar(100) NOT NULL,
  `ban_reason` varchar(1000) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `Product_id` varchar(100) NOT NULL,
  `Buyer_uname` varchar(50) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`Product_id`, `Buyer_uname`, `Quantity`) VALUES
('645e62e13589d', 'talha', 7),
('646108b8b6a24', 'suhaib', 3);

-- --------------------------------------------------------

--
-- Table structure for table `customermessages`
--

CREATE TABLE `customermessages` (
  `message_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customermessages`
--

INSERT INTO `customermessages` (`message_id`, `email`, `message`, `date`, `time`) VALUES
(2, 'Suhaibrashid3731@gmail.com', 'testing', '2023-05-14', '15:09:27'),
(4, 'suhaibrashid2003@gmail.com', 'ok', '2023-05-17', '06:38:19');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(50) NOT NULL,
  `productId` varchar(50) NOT NULL,
  `buyer_username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `productId`, `buyer_username`) VALUES
(5, '646108a52a3b4', 'suhaib'),
(6, '645e318caff6f', 'suhaib'),
(7, '645f438a33d85', 'suhaib'),
(8, '646108a52a3b4', 'suhaib'),
(9, '645f438a33d85', 'suhaib'),
(10, '645e318caff6f', 'suhaib'),
(11, '645f438a33d85', 'yasoob'),
(12, '645e318caff6f', 'suhaib'),
(13, '645e318caff6f', 'suhaib');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `orderId` int(100) NOT NULL,
  `quantity` int(100) NOT NULL,
  `payment_Method` varchar(10) NOT NULL,
  `delivery_Address` varchar(100) NOT NULL,
  `City` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `review_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`orderId`, `quantity`, `payment_Method`, `delivery_Address`, `City`, `Status`, `review_status`) VALUES
(5, 1, 'COD', 'Faisal Town', 'Lahore', 'recieved', 1),
(6, 1, 'COD', 'Faisal Town', 'Lahore', 'recieved', 1),
(7, 1, 'COD', 'Faisal Town', 'Lahore', 'recieved', 1),
(8, 1, 'Card', 'abc', 'Lahore', 'recieved', 0),
(9, 3, 'COD', 'Faisal Town', 'Lahore', 'pending', 0),
(10, 3, 'COD', 'c', 'Lahore', 'recieved', 1),
(11, 4, 'COD', 'Allama Iqbal Town', 'Lahore', 'recieved', 1),
(12, 1, 'COD', 'Faisal Town', 'Lahore', 'recieved', 1),
(13, 3, 'COD', 'Faisal Town', 'Lahore', 'recieved', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `pname` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `inventory` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `username` varchar(100) NOT NULL,
  `product_id` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`pname`, `price`, `inventory`, `description`, `username`, `product_id`, `category`) VALUES
('Wheel  Chair    ', 18000, 17, 'For physically disabled people', 'suhaib', '645e318caff6f', 'Prescription medications'),
('Brufen', 12, 93, 'This medicine is used to treat mild to moderate pain (from headaches, menstrual periods, toothaches, backaches, osteoarthritis, or cold/flu aches and pains) and to reduce fever.', 'riaz', '645e62e13589d', 'Prescription medications'),
('Vitamin', 340, 90, '--', 'suhaib', '645f438a33d85', 'Prescription medications'),
('Panadol', 35, 198, 'This medicine is used to treat mild to moderate pain (from headaches, menstrual periods, toothaches, backaches, osteoarthritis, or cold/flu aches and pains) and to reduce fever.', 'suhaib', '646108a52a3b4', 'Prescription medications'),
('Brufen', 35, 197, 'This medicine is used to treat mild to moderate pain (from headaches, menstrual periods, toothaches, backaches, osteoarthritis, or cold/flu aches and pains) and to reduce fever.', 'suhaib', '646108b8b6a24', 'Prescription medications'),
('Hydrylline Syrup', 60, 100, 'This medication is used in patients to treat dry cough.', 'suhaib', '64641f4e6e3f9', 'Prescription medications');

-- --------------------------------------------------------

--
-- Table structure for table `registered_buyers`
--

CREATE TABLE `registered_buyers` (
  `FName` varchar(100) NOT NULL,
  `LName` varchar(100) NOT NULL,
  `PhoneNo` varchar(11) NOT NULL,
  `CNIC` bigint(13) NOT NULL,
  `username` varchar(50) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Date_of_birth` date NOT NULL,
  `City` varchar(50) NOT NULL,
  `Address` varchar(150) DEFAULT NULL,
  `password_` varchar(50) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registered_buyers`
--

INSERT INTO `registered_buyers` (`FName`, `LName`, `PhoneNo`, `CNIC`, `username`, `Gender`, `Date_of_birth`, `City`, `Address`, `password_`, `status`) VALUES
('Muhammad Suhaib', 'Rashid', '03324320296', 3502026529680, 'suhaib', 'Male', '2023-02-01', 'Lahore', 'Faisal Town', '12345', 0),
('Talha', 'Mohy', '03324323456', 352028756432, 'talha', 'Male', '2023-05-12', 'Karachi', 'Faisal Town', '123', 0),
('Yasoob', 'Tahavi', '033333333', 3520202020202, 'yasoob', 'Rather not', '2003-08-05', 'Lahore', 'Allama Iqbal Town', '12345', 0);

-- --------------------------------------------------------

--
-- Table structure for table `registered_sellers`
--

CREATE TABLE `registered_sellers` (
  `PharmName` varchar(100) NOT NULL,
  `Phone_no` varchar(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `City` varchar(30) NOT NULL,
  `Address` varchar(150) NOT NULL,
  `cnic_no` varchar(13) NOT NULL,
  `password_` varchar(50) NOT NULL,
  `owner_name` varchar(100) NOT NULL,
  `account_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registered_sellers`
--

INSERT INTO `registered_sellers` (`PharmName`, `Phone_no`, `user_name`, `City`, `Address`, `cnic_no`, `password_`, `owner_name`, `account_status`) VALUES
('E-Phrama', '03324320299', 'riaz', 'Karachi', '-', '2147483647', '123', 'Malik Riaz', 0),
('Servaid', '03324320296', 'suhaib', 'Lahore', '-', '3520265296808', '1234', 'suhaib rashid', 0);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `orderId` int(11) NOT NULL,
  `stars` int(11) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `product_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`orderId`, `stars`, `comment`, `product_id`) VALUES
(5, 4, 'ok', '646108a52a3b4'),
(6, 2, 'ok', '645e318caff6f'),
(7, 1, 'ok', '645f438a33d85'),
(10, 2, 'ok', '645e318caff6f'),
(11, 2, 'driver was black', '645f438a33d85'),
(12, 1, 'ok', '645e318caff6f'),
(13, 3, 'ok', '645e318caff6f');

-- --------------------------------------------------------

--
-- Table structure for table `riderdetails`
--

CREATE TABLE `riderdetails` (
  `orderId` int(11) NOT NULL,
  `rider_name` varchar(100) NOT NULL,
  `rider_bike_number` varchar(30) NOT NULL,
  `uber_link` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `riderdetails`
--

INSERT INTO `riderdetails` (`orderId`, `rider_name`, `rider_bike_number`, `uber_link`) VALUES
(5, 'Parker', 'LEQ 1234', 'uber.com/parker'),
(6, 'Parker', 'LEQ 1234', 'uber.com/parker'),
(7, 'Parker', 'LEQ 1234', 'uber.com/parker'),
(8, 'Parker', 'LEQ 1234', 'uber.com/parker'),
(10, 'Parker', 'LEQ 1234', 'uber.com/parker'),
(11, 'Parker', 'LEQ 1234', 'uber.com/parker'),
(12, 'Parker', 'LEQ 1234', 'uber.com/parker'),
(13, 'Parker', 'LEQ 1234', 'uber.com/parker');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `product_id` varchar(50) NOT NULL,
  `buyer_username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`product_id`, `buyer_username`) VALUES
('645e30a579b3e', 'suhaib'),
('645e30d12154e', 'suhaib'),
('645e62e13589d', 'talha'),
('646108a52a3b4', 'suhaib'),
('645f438a33d85', 'suhaib'),
('645e318caff6f', 'yasoob'),
('645e318caff6f', 'suhaib');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD KEY `FK_cart2` (`Buyer_uname`),
  ADD KEY `FK_cart1` (`Product_id`);

--
-- Indexes for table `customermessages`
--
ALTER TABLE `customermessages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `fk_orders_product` (`productId`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD KEY `fk_order_id` (`orderId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `FK_product` (`username`);

--
-- Indexes for table `registered_buyers`
--
ALTER TABLE `registered_buyers`
  ADD UNIQUE KEY `unique_username` (`username`);

--
-- Indexes for table `registered_sellers`
--
ALTER TABLE `registered_sellers`
  ADD PRIMARY KEY (`user_name`) USING BTREE;

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD KEY `fk_review_product` (`product_id`);

--
-- Indexes for table `riderdetails`
--
ALTER TABLE `riderdetails`
  ADD KEY `fk_riderdetails_order` (`orderId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customermessages`
--
ALTER TABLE `customermessages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `FK_cart1` FOREIGN KEY (`Product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `FK_cart2` FOREIGN KEY (`Buyer_uname`) REFERENCES `registered_buyers` (`username`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_product` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_product_id` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_order_id` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_product` FOREIGN KEY (`username`) REFERENCES `registered_sellers` (`user_name`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_review_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `riderdetails`
--
ALTER TABLE `riderdetails`
  ADD CONSTRAINT `fk_riderdetails_order` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
