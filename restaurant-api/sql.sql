create database `api-restaurant`;

CREATE TABLE `restaurants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adress` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restaurantId` INT COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (restaurantId) REFERENCES restaurants(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tablets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurantId` INT COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`restaurantId`) REFERENCES restaurants (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unity` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` INT COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` FLOAT COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (categoryId) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `recipes-ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipeId` INT COLLATE utf8mb4_unicode_ci NOT NULL,
  `ingredientId` INT COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` FLOAT COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (recipeId) REFERENCES recipes (id),
  FOREIGN KEY (ingredientId) REFERENCES ingredients (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



DROP PROCEDURE IF EXISTS `insert_data`;
DELIMITER //
CREATE PROCEDURE `insert_data`(
		  IN v_table                 VARCHAR(255)
		, IN v_fields                VARCHAR(255)
        , IN v_value                 VARCHAR(255)
)
BEGIN
	 declare queryString VARCHAR(255);
     
	SET @queryString = (SELECT CONCAT( 'INSERT INTO ', v_table , '(' , v_fields, ')', 'VALUES ',  '(' , v_value , ')'));

	PREPARE myQuery FROM @queryString;
	EXECUTE myQuery;
    DEALLOCATE PREPARE myQuery;
END


DROP PROCEDURE IF EXISTS `get_data`;
DELIMITER //
CREATE PROCEDURE `get_data`(
		  IN v_table       VARCHAR(255)
)
BEGIN
	declare queryString VARCHAR(255);
	SET @queryString = (SELECT CONCAT( 'SELECT * FROM ', v_table));
	PREPARE myQuery FROM @queryString;
	EXECUTE myQuery;
    DEALLOCATE PREPARE myQuery;
END;
;;


DROP PROCEDURE IF EXISTS `get_where_data`;
DELIMITER //
CREATE PROCEDURE `get_where_data`(
		  IN v_table                 VARCHAR(255)
		, IN v_column                VARCHAR(255)
        , IN v_where                 VARCHAR(255)
)
BEGIN
	declare queryString VARCHAR(255);   
    SET @queryString =  (SELECT CONCAT( 'SELECT ',  v_column , ' FROM ', v_table, ' WHERE ', v_where));
    PREPARE myQuery FROM @queryString;
	EXECUTE myQuery;
    DEALLOCATE PREPARE myQuery;

END;
;;


CREATE PROCEDURE `update_data`(
		 IN v_table                  VARCHAR(255)
		, IN v_value                  VARCHAR(255)
        , IN v_where                 VARCHAR(255)
)
BEGIN
	declare queryString VARCHAR(255);   
    SET @queryString =  (SELECT CONCAT( 'UPDATE ',  v_table , ' SET ' , v_value , ' WHERE ',  v_where));
    PREPARE myQuery FROM @queryString;
	EXECUTE myQuery;
    DEALLOCATE PREPARE myQuery;
END;
;;


DROP PROCEDURE IF EXISTS `delete_data`;
DELIMITER // 
CREATE PROCEDURE `delete_data`(
		  IN v_table                 VARCHAR(255)
        , IN v_where                 VARCHAR(255)
)
BEGIN
	declare queryString VARCHAR(255);   
    SET @queryString =  (SELECT CONCAT( 'DELETE FROM  ',  v_table , ' WHERE ',  v_where));
    PREPARE myQuery FROM @queryString;
	EXECUTE myQuery;
    DEALLOCATE PREPARE myQuery;
END;
;;


DROP PROCEDURE IF EXISTS `get_user`;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user`(
		IN v_table                  VARCHAR(255)
        ,IN v_where                 VARCHAR(255)
)
BEGIN
	 declare queryString VARCHAR(255);
     
	SET @queryString =  (SELECT CONCAT( 'SELECT * FROM ' , v_table , ' WHERE username=', "'", v_where, "'"));

	PREPARE myQuery FROM @queryString;
	EXECUTE myQuery;
    DEALLOCATE PREPARE myQuery;
END

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `fullrecipes` AS
    SELECT 
        `r`.`id` AS `recipeId`,
        `r`.`name` AS `recipeName`,
        `r`.`description` AS `recipeDescription`,
        `c`.`id` AS `categoryId`,
        `c`.`name` AS `categoryName`,
        `ri`.`id` AS `recipeIngredientsId`,
        `ri`.`quantity` AS `recipeIngredientsQuantity`,
        `i`.`id` AS `ingredientsId`,
        `i`.`name` AS `ingredientsName`,
        `i`.`unity` AS `ingredientsUnity`
    FROM
        (((`recipes` `r`
        LEFT JOIN `categories` `c` ON ((`r`.`categoryId` = `c`.`id`)))
        LEFT JOIN `recipes-ingredients` `ri` ON ((`ri`.`recipeId` = `r`.`id`)))
        LEFT JOIN `ingredients` `i` ON ((`ri`.`ingredientId` = `i`.`id`)))