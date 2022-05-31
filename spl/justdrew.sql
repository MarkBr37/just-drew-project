-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2021 at 05:44 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `justdrew`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorite_posts`
--

CREATE TABLE `favorite_posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `favorite_idpost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `favorite_posts`
--

INSERT INTO `favorite_posts` (`id`, `user_id`, `favorite_idpost`) VALUES
(4, 20, 10),
(12, 20, 63),
(13, 32, 85),
(14, 32, 63);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `article` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `image_name`, `article`, `date`) VALUES
(8, 20, '', 'hello world', '2021-05-07 15:06:31'),
(10, 20, '07.05.2021.14.08.11-jax-mecha-kingdoms-lol-uhdpaper.com-4K-5.1429.jpg', '', '2021-05-07 15:08:11'),
(63, 20, '', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam possimus iusto laboriosam quo ab blanditiis id fuga aliquam molestias quibusdam tempore, hic excepturi alias, reprehenderit eos quis adipisci recusandae modi?', '2021-06-18 15:14:24'),
(85, 30, '31.07.2021.16.22.43-IMG-20200904-WA0017.jpg', 'hello look at this', '2021-07-31 17:12:20'),
(92, 32, '', 'Lorem ipsum dolor sit amet.', '2021-11-10 18:38:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_image` varchar(255) NOT NULL,
  `signin_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `profile_image`, `signin_date`) VALUES
(20, 'qsaw', 'qsaw@gmail.com', '$2y$10$EglIe/YYfcWbUJlmvzPvteulCGsBvWldzOBsxQIYt9Qf9pgODUZOe', 'default-profile.png', '2021-03-22 07:45:30'),
(30, 'bob', 'bob@gmail.com', '$2y$10$/dSSR.UWCJBcxvbi3FGMuOex7yxkts/OexTHijpfNwXFmXI944kue', '22.07.2021.17.09.38-Samurai_Helmet_Icon.png', '2021-07-22 18:09:38'),
(32, 'dreamer', 'dreamer@gmail.com', '$2y$10$tchspagkl.jYP0V2L62ok.8P8zkngt/3d3pX0FAAYBQ/8PjO7WCLC', 'default-profile.png', '2021-11-10 18:36:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorite_posts`
--
ALTER TABLE `favorite_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
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
-- AUTO_INCREMENT for table `favorite_posts`
--
ALTER TABLE `favorite_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
