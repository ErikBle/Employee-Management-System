DROP DATABASE IF EXISTS companyDB;
CREATE database companyDB;

USE companyDB;

CREATE TABLE employee  (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2),
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;