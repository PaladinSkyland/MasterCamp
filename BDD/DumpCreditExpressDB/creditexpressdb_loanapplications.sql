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
-- Table structure for table `loanapplications`
--

DROP TABLE IF EXISTS `loanapplications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loanapplications` (
  `ID_application` int NOT NULL AUTO_INCREMENT,
  `Amount` int DEFAULT NULL,
  `InterestRate` int DEFAULT NULL,
  `Duration` int DEFAULT NULL,
  `InterestType` varchar(50) NOT NULL,
  `MonthlyIncome` int DEFAULT NULL,
  `RepaymentOptions` varchar(50) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `ID_bank` int DEFAULT NULL,
  `Status` enum('Pending','Accepted','Finished','Canceled') NOT NULL DEFAULT (_utf8mb4'Pending'),
  `Creation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `ID_user` int NOT NULL,
  PRIMARY KEY (`ID_application`),
  KEY `ID_bank` (`ID_bank`),
  KEY `ID_user` (`ID_user`),
  CONSTRAINT `loanapplications_ibfk_1` FOREIGN KEY (`ID_bank`) REFERENCES `banks` (`ID_bank`),
  CONSTRAINT `loanapplications_ibfk_2` FOREIGN KEY (`ID_user`) REFERENCES `users` (`ID_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loanapplications`
--

LOCK TABLES `loanapplications` WRITE;
/*!40000 ALTER TABLE `loanapplications` DISABLE KEYS */;
INSERT INTO `loanapplications` VALUES (1,10000,2,180,'fixe',2250,'Remboursement à échéances constantes','Achat d\'un appartement',1,'Pending','2023-07-04 15:46:15',12),(2,1000000,4,360,'variable',5000,'Remboursement in fine','Achat d\'une résidence',2,'Pending','2023-07-04 15:48:34',12),(3,25000,3,200,'fixe',3000,'Remboursement progressif','Investissement immobilier',NULL,'Pending','2023-07-04 15:59:24',13),(4,750000,3,400,'fixe',7500,'Remboursement modulable','acheter une résidence secondaire',NULL,'Pending','2023-07-04 16:04:51',14);
/*!40000 ALTER TABLE `loanapplications` ENABLE KEYS */;
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
