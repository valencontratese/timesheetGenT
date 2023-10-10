-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-10-2023 a las 21:19:25
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `timesheetgt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `comercial` varchar(255) NOT NULL,
  `gestion` varchar(255) NOT NULL,
  `fechainicioideal` date NOT NULL,
  `fechainicioreal` date NOT NULL,
  `fechafinIdeal` date NOT NULL,
  `fechafinreal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id`, `nombre`, `tipo`, `comercial`, `gestion`, `fechainicioideal`, `fechainicioreal`, `fechafinIdeal`, `fechafinreal`) VALUES
(1, 'Web Villavicencio', 'Proyecto', 'Miguel', 'Laura', '2023-10-10', '2023-10-27', '2023-10-12', '2023-10-31'),
(2, 'Web Odol', 'Proyecto', 'Fabrizio', 'Marta', '2023-10-09', '2023-10-10', '2023-10-19', '2023-11-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_recurso`
--

CREATE TABLE `proyecto_recurso` (
  `idRecProy` int(11) NOT NULL,
  `idProyecto` int(11) NOT NULL,
  `idRecurso` int(11) NOT NULL,
  `disponibilidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyecto_recurso`
--

INSERT INTO `proyecto_recurso` (`idRecProy`, `idProyecto`, `idRecurso`, `disponibilidad`) VALUES
(1, 2, 4, 75),
(2, 1, 1, 50),
(3, 1, 5, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recurso`
--

CREATE TABLE `recurso` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellido` varchar(200) NOT NULL,
  `disponibilidad` int(11) NOT NULL,
  `rol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recurso`
--

INSERT INTO `recurso` (`id`, `nombre`, `apellido`, `disponibilidad`, `rol`) VALUES
(1, 'Lautaro', 'Martinez', 4, 'Pifiador'),
(2, 'Miguel', 'Julik', 8, 'Dev'),
(3, 'Juan', 'Olir', 8, 'QA'),
(4, 'Laura', 'Erref', 8, 'Dev'),
(5, 'María', 'Lia', 8, 'Dev'),
(6, 'Roberto', 'Junse', 6, 'Dev');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `idRecurso` int(11) NOT NULL,
  `idProyecto` int(11) NOT NULL,
  `esfuerzo` int(11) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyecto_recurso`
--
ALTER TABLE `proyecto_recurso`
  ADD PRIMARY KEY (`idRecProy`);

--
-- Indices de la tabla `recurso`
--
ALTER TABLE `recurso`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `proyecto_recurso`
--
ALTER TABLE `proyecto_recurso`
  MODIFY `idRecProy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `recurso`
--
ALTER TABLE `recurso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
