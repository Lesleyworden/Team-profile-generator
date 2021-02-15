USE employee_db;

CREATE TABLE `employee_db`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(30) NOT NULL,
  `lastname` VARCHAR(30) NOT NULL,
  `role_id` INT NOT NULL,
  `manager_id` INT NULL,
  PRIMARY KEY (`id`));