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
        $dsn = sprintf('mysql:host=%s;dbname=%s;port=%d', $host, $name, $port);
        try {
            return new PDO($dsn, $user, $pass, [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
            ]);
        } catch (PDOException $e) {
            die('Error connecting to database');
        }

    }

    /*
    * Send query to database
    */
    public function query($sql, $table, $fields = null, $values = null) {
       $this->conn = $this->connect();
       $stmt = $this->conn->prepare($sql);
       if ($fields || $values ) {
            $stmt->bindParam(1, $table,  PDO::PARAM_STR);
            $stmt->bindParam(2, $fields, PDO::PARAM_STR);
            $stmt->bindParam(3, $values, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt;
        } else {
            $stmt->bindParam(1, $table, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt;
        }
    }

    /*
    * Insert value in database
    */
    public function insert($table, $data) {
       $fields = array_keys($data);
       $values = array_values($data);
       $fieldsAsString = implode(', ', $fields);
       $valuesAsString = implode(", ", $values);
       $stmt = $this->query("call include_data (?,?,?)", $table, $fieldsAsString, $valuesAsString);
       return [
           'stmt' => $stmt,
           'lastInsertId' => $this->conn->lastInsertId()
       ];
   }
}
