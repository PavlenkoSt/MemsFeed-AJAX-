-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 27 2021 г., 23:12
-- Версия сервера: 5.6.37
-- Версия PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `memsFeed`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Игры'),
(2, 'Политика'),
(4, 'Философия'),
(5, 'Комиксы'),
(6, 'Шурыгина'),
(7, 'Коты'),
(8, 'Качок Доге и плачущий Чимс'),
(10, 'Танцующие носильщики гробов'),
(11, 'Directed by Robert B. Weide'),
(12, 'Лапенко'),
(13, 'Nordic Gamer'),
(14, 'Поздравительные открытки'),
(15, 'Анекдоты');

-- --------------------------------------------------------

--
-- Структура таблицы `mems`
--

CREATE TABLE `mems` (
  `id` int(11) NOT NULL,
  `url` varchar(128) NOT NULL,
  `likes` int(11) NOT NULL,
  `date` date NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `mems`
--

INSERT INTO `mems` (`id`, `url`, `likes`, `date`, `category_id`) VALUES
(1, 'https://memepedia.ru/wp-content/uploads/2020/02/vedmak.jpg', 6, '2021-02-25', 1),
(2, 'https://i.pinimg.com/564x/89/a7/90/89a7900d6daf9a1f9232047ae8a6bc69.jpg', 2, '2021-02-25', 1),
(3, 'https://memzzz.com/storage/memes/meme_5cd18a9d25484.png', 2, '2021-02-25', 1),
(4, 'https://pm1.narvii.com/6838/6d7f8ca3d09675e9e944ff5a98bf3a39cdfa4676v2_hq.jpg', 5, '2021-02-25', 1),
(11, 'https://pm1.narvii.com/7795/69a32db94376ee071bc5ce27772352d77b044703r1-385-604v2_00.jpg', 0, '2021-02-27', 5),
(12, 'https://static-sl.insales.ru/images/products/1/3718/250343046/s-vyt1fIjuw.jpg', 2, '2021-02-27', 5),
(14, 'https://cs11.pikabu.ru/post_img/big/2019/09/12/4/156826418815616337.jpg', 5, '2021-02-27', 5);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `mems`
--
ALTER TABLE `mems`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT для таблицы `mems`
--
ALTER TABLE `mems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
