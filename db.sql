-- instruction manual to create sql database --

CREATE DATABASE spice;

CREATE USER 'user'@'localhost' IDENTIFIED BY '12345';

GRANT ALL PRIVILEGES ON somedb.* TO 'user'@'localhost';

USE spice;

CREATE TABLE IF NOT EXISTS spiceinfo (
    spice_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    sum INT,
    location VARCHAR(255)
)  ENGINE=INNODB;


