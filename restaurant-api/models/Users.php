<?php

namespace models;

use core\Database;

class Users extends Database {

    private $table = 'users';

    /*
    * List all users 
    */
    public function getAllUsers() {
        return $this->getAll($this->table);
    }

    /*
    * List user by ID
    */
    public function getByIUsers( $where ) {
        return $this->getById($this->table, '*', 'id =' . $where);
    }

    /*
    * Add new user 
    */
    public function createUser($data) {
        $arrayData = (array) $data;
        $fields = array_keys($arrayData);
        $fieldsAsString = implode(", ", $fields);
        $valuesString = '';
        $i = 0;
        $len = count($arrayData);
        foreach ($arrayData as $value) {
            if ($len == 1 || $i == $len - 1) {
                $valuesString .= '"' . $value . '"';
            } else {
                $valuesString .= '"' . $value . '"' . ",";
            }
            $i++;
        }    
        $result = $this->insert($this->table, $fieldsAsString, $valuesString);
        return $result['stmt']->rowCount() > 0;

    }

    /*
    * Update user 
    */
    public function updateUser($data, $where) {
        $str = '';
        $i = 0;
        $len = count($data);
        foreach ($data as $key => $value) {
            if ($len == 1 || $i == $len - 1) {
                $str .= $key . " = " . '"' . $value . '"' ;
            } else {
                $str .= $key . " = " . '"' . $value . '"'. ",";
            }
            $i++;
        }    
        $result = $this->update($this->table, $str, 'id = ' . $where);
        return $result->rowCount() > 0;
    }

    /*
    * Delete user
    */
    public function deleteUser($where) {
        $result = $this->delete($this->table, "id = $where");
        return $result->rowCount() > 0;
    }

}