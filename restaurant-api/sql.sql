create database `api-restaurant`;

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
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


DROP PROCEDURE IF EXISTS `left_join`;
DELIMITER //
CREATE PROCEDURE `left_join`(
		  IN v_table_1               VARCHAR(255)
		, IN v_table_2               VARCHAR(255)
		, IN v_column                VARCHAR(255)
        , IN v_on                    VARCHAR(255)
)
BEGIN
	declare queryString VARCHAR(255);
    
    SET @queryString = (SELECT CONCAT( 'SELECT ', 
    v_column, 
    ' FROM ', v_table_1, '
    LEFT JOIN ',  v_table_2 , 
    ' ON ' , v_on));
    
	PREPARE myQuery FROM @queryString;
	EXECUTE myQuery;
    DEALLOCATE PREPARE myQuery;
    
END;
;;


