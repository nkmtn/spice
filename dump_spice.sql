-- MySQL dump 10.13  Distrib 8.0.17, for Linux (x86_64)
--
-- Host: localhost    Database: spice
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `batch`
--

DROP TABLE IF EXISTS `batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch` (
  `batch_id` int(11) NOT NULL AUTO_INCREMENT,
  `batch_number` varchar(45) DEFAULT NULL,
  `spice_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`batch_id`),
  KEY `fk_batch_spice1_idx` (`spice_id`),
  KEY `fk_batch_store1_idx` (`store_id`),
  KEY `fk_batch_user1_idx` (`user_id`),
  CONSTRAINT `fk_batch_spice1` FOREIGN KEY (`spice_id`) REFERENCES `spice` (`spice_id`),
  CONSTRAINT `fk_batch_store1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`),
  CONSTRAINT `fk_batch_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch`
--

LOCK TABLES `batch` WRITE;
/*!40000 ALTER TABLE `batch` DISABLE KEYS */;
INSERT INTO `batch` VALUES (1,'2',1,1,1),(2,'4',2,4,1),(3,'1',2,3,1),(4,'1',3,2,1),(5,'2',4,3,1),(6,'3',5,3,1);
/*!40000 ALTER TABLE `batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `brand_id` int(11) NOT NULL AUTO_INCREMENT,
  `brand_title` varchar(255) NOT NULL,
  `brand_description` varchar(4096) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`brand_id`),
  KEY `fk_brand_user1_idx` (`user_id`),
  CONSTRAINT `fk_brand_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Knorr','Knorr – вкусен и скор!',1),(2,'Maggi','Maggi. Живите вкусно! ',1),(3,'bonvida',NULL,1),(5,'Uncle Ben`s','Неизменно превосходный результат',1),(6,'1','2',1);
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spice`
--

DROP TABLE IF EXISTS `spice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spice` (
  `spice_id` int(11) NOT NULL AUTO_INCREMENT,
  `spice_title` varchar(255) NOT NULL,
  `spice_description` varchar(4096) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`spice_id`),
  KEY `fk_spice_brand_idx` (`brand_id`),
  KEY `fk_spice_user1_idx` (`user_id`),
  CONSTRAINT `fk_spice_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_spice_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spice`
--

LOCK TABLES `spice` WRITE;
/*!40000 ALTER TABLE `spice` DISABLE KEYS */;
INSERT INTO `spice` VALUES (1,'tmin','ggg',2,1),(2,'rozmarine','ohoho',5,1),(3,'solt with garlic','',2,1),(4,'garlic','ddd',3,1),(5,'ukrop','',2,1),(6,'test','tt',2,1),(7,'test','tt',2,1),(8,'test','tt',2,1),(9,'test','tt',2,1),(10,'test','tt',2,1),(11,'test','tt',2,1),(12,'ggg','ggg',2,1),(13,'ggg','ggg',2,1),(14,'ggg','ggg',2,1),(15,'','',1,1),(16,'fff','444',1,1),(17,'fff','444',1,1),(18,'rozmarine','',2,1),(19,'newAdd','ohoho',5,1);
/*!40000 ALTER TABLE `spice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spice_tag`
--

DROP TABLE IF EXISTS `spice_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spice_tag` (
  `spice_tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `spice_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`spice_tag_id`),
  KEY `fk_spice_tag_spice1_idx` (`spice_id`),
  KEY `fk_spice_tag_tag1_idx` (`tag_id`),
  KEY `fk_spice_tag_user1_idx` (`user_id`),
  CONSTRAINT `fk_spice_tag_spice1` FOREIGN KEY (`spice_id`) REFERENCES `spice` (`spice_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_spice_tag_tag1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_spice_tag_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=214 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spice_tag`
--

LOCK TABLES `spice_tag` WRITE;
/*!40000 ALTER TABLE `spice_tag` DISABLE KEYS */;
INSERT INTO `spice_tag` VALUES (202,1,1,1),(203,1,2,1),(204,2,2,1),(205,2,3,1),(206,3,2,1),(207,3,1,1),(208,7,1,1),(209,6,1,1),(210,6,2,1),(211,6,3,1),(212,5,2,1),(213,5,1,1);
/*!40000 ALTER TABLE `spice_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_title` varchar(255) NOT NULL,
  `store_description` varchar(4096) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`store_id`),
  KEY `fk_store_user1_idx` (`user_id`),
  CONSTRAINT `fk_store_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'konteiner 1','1 polka',1),(2,'konteiner 2','1 polka',1),(3,'konteiner 3','1 polka',1),(4,'konteiner 4','2 polka',1);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_title` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`tag_id`),
  KEY `fk_tag_user1_idx` (`user_id`),
  CONSTRAINT `fk_tag_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'miaso',1),(2,'chicken',1),(3,'fish',1),(5,'fffnc',1),(6,'ggg',1),(16,'мясо',1),(17,'макароны',1),(18,'плов',1);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_pass` char(32) NOT NULL,
  `user_salt` char(32) NOT NULL,
  `user_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_status` int(11) NOT NULL DEFAULT '0',
  `user_activation_hash` char(32) NOT NULL,
  `user_activation_sent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_passforgot_hash` char(32) DEFAULT NULL,
  `user_passforgot_requested` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'example@email.ru','12345','67','2020-06-03 20:05:23','2020-06-03 20:05:23',0,'54321','2020-06-03 20:05:23',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-08 18:33:33
