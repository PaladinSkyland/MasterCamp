-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: creditexpressdb
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID_user` int NOT NULL AUTO_INCREMENT,
  `LastName` varchar(50) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `UserType` enum('customer','employee','admin') NOT NULL DEFAULT (_utf8mb4'customer'),
  PRIMARY KEY (`ID_user`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'adminLastName','adminFirstName','admin@gmail.com','$2a$10$HIuiYRowLFyKs9L3sYm2Q.Ioizu.MvAoHDveNeJ9rAKoOtCbfvgWK','admin'),(2,'Brancolini','Lucas','lucas.brancolini@gmail.com','$2a$10$ut3wwd09T4DxtIDqHfgmOuFcGDEgRzF7HTXbPSos7Vlq1EhyyCYde','employee'),(3,'Kohler','Arnaud','arnaud.kohler@gmail.com','$2a$10$52xKtSkDV2PegweHDbPbV.weCCUUByeRPs/G4N8aKJsDpprCwBQ1u','employee'),(4,'Parmentier','Hugo','hugo.parmentier@gmail.com','$2a$10$2sFnLoTW7uFVCR5N3me9b.SYQZaEdvlVg1RHLEybO65Qjwufn5F2u','employee'),(5,'Morel','Nathan','nathan.morel@gmail.com','$2a$10$gGaVISKDA0iavWu2zcZ9Feh9/CyApryqTxNlkoBMbR.1JBtBdm49S','employee'),(6,'Liu Chi Pioa','Ludovic','ludovic.liuchipioa@gmail.com','$2a$10$WPFbtZQIJ7bse6vKk9l/o.7/zgAahA/bikmj6mifiKDKw9iYlYm/S','employee'),(7,'Dujardin','Jean','jean.dujardin@gmail.com','$2a$10$0ftylgYQ9LJqUJl2xiQyceevylTfZFHbijXkxpUUeaZs8NsiDhVgC','employee'),(8,'Djuna','Gandhi','gandhi.djuna@gmail.com','$2a$10$6EeJtAlcNQvrrgRjv6rCDemIgXtvX/F9msePjM/bz77oE3VNt6Bk.','employee'),(9,'Vorlander','Christian','christian.vorlander@gmail.com','$2a$10$K4WZReWTHiMDnw53q9f7oemqWstBLKukuZk3RlKVRvloW7hA25YPG','employee'),(10,'Heeger','Simon','simon.heeger@gmail.com','$2a$10$/bCGAgBtTVyBZmRqIPhZceklttip7uvL4YgRI2o9x/H.DI8kY/3aW','employee'),(11,'Billebaut','Arthur','arthur.billebaut@gmail.com','$2a$10$s5n0ziJPKh2uEyRHVGQ9r.aUnOmj/DEYQAxmwtpulITs.nOauHfGa','employee'),(12,'Balkany','Patrick','patrick.balkany@gmail.com','$2a$10$dDtDKcLQPR6AfFTPXJ9dZeUG.4ijKE8pxZc0exofUyNmj/REig7vC','customer'),(13,'Ali','Mohamed','mohamed.ali@gmail.com','$2a$10$Aqq466jMbO/yYl40pTOH7eTXhnYXXNszc4pZbb3KghENJSY6MXkqe','customer'),(14,'Bezos','Jeff','jeff.bezos@gmail.com','$2a$10$.zi8p4LkKf.OPR1Qil5on.ZlWcyd4IefS6BcjxsiQ/Pyggne57Kbm','customer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-04 16:24:51
