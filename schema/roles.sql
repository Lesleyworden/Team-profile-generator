USE employee_db;

CREATE TABLE `employee_db`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL NOT NULL,
  `department_id` INT NOT NULL,
  PRIMARY KEY (`id`));