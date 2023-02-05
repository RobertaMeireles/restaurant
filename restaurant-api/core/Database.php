<?php

// Classe que faz a ligação do modelo com a base de dados.

namespace core;

use PDO;
use PDOException;

class Database
{
    private $conn;
    /*
    * Connect database
    */
    private function connect()
    {
        $config = require '../config/database.config.php';
        extract($config);
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s;port=%d', $host, $name, $charset, $port);
        $options = [
            \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_OBJ,
            \PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        // SET CHA
        
       try {
            $this->conn = new PDO($dsn, $user, $pass, $options);
            return $this->conn;
        } catch (PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }

    }

    /*
    * get last id table on database
    */
    public function queryGetLastId($table) {
        $this->conn = $this->connect();
        $sql = "SELECT id FROM $table order by id desc LIMIT 1;";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchColumn();
    }

    /*
    * send view to database
    */
    public function queryFullRecipe($id = null) {
        $this->conn = $this->connect();
        if($id) {
            $sql = "SELECT * FROM fullRecipes WHERE recipeId = $id;";
        } else {
            $sql = "SELECT * FROM fullRecipes;";
        }
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    /*
    * Send procedure to database
    */
    public function query($sql, $table = null, $firstParameter= null, $secondParameter = null) {
       $this->conn = $this->connect();
       $stmt = $this->conn->prepare($sql);
       if ($firstParameter && $secondParameter ) {
            $stmt->bindParam(1, $table,  PDO::PARAM_STR);
            $stmt->bindParam(2, $firstParameter, PDO::PARAM_STR);
            $stmt->bindParam(3, $secondParameter, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt;
        } elseif ($firstParameter) {
            $stmt->bindParam(1, $table,  PDO::PARAM_STR);
            $stmt->bindParam(2, $firstParameter, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt;
        } else {
            $stmt->bindParam(1, $table, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt;
        }
    }

    /*
    * Get value in database
    */
    public function getAll($table) {
        $stmt = $this->query("call get_data (?)", $table);
        return $stmt->fetchAll();
    }

    /*
    * Get value by UserName in database
    */
    public function getUserByUserName($table, $where) {
        $stmt = $this->query("call get_user (?,?)", $table, $where);
        return $stmt->fetch();
    }

    /*
    * Get value by id in database
    */
    public function getById($table, $fieldsAsString, $where) {
        $stmt = $this->query("call get_where_data (?,?,?)", $table, $fieldsAsString, $where);
        return $stmt->fetch();
    }

    /*
    * Insert value in database
    */
    public function insert($table, $fieldsAsString, $valuesString) {
       $stmt = $this->query('call insert_data (?,?,?)', $table, $fieldsAsString, $valuesString);
       return [
           'stmt' => $stmt,
           'lastInsertId' => $this->conn->lastInsertId()
       ];
    }

    /*
    * Update value in database
    */
    public function update($table, $data, $where) {
        return $this->query("call update_data (?,?,?)", $table, $data, $where);
    }

    /*
    * Delete value in database
    */
    public function delete($table, $where) {
        return $this->query("call delete_data (?,?)", $table, $where);
    }
}
