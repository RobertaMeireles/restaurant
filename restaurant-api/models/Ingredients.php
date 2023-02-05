<?php

namespace models;

use core\Database;

class Ingredients extends Database {
    private $table = 'ingredients';

    /*
    * List all ingredients 
    */
    public function getAllIngredients() {
        return $this->getAll($this->table);
    }

    /*
    * List ingredient by ID
    */
    public function getByIdIngredient( $where ) {
        return $this->getById($this->table, '*', 'id =' . $where);
    }

    /*
    * Add new ingredient 
    */
    public function createIngredient($data) {
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
    * Update ingredient 
    */
    public function updateIngredient($data, $where) {
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
    * Delete ingredient
    */
    public function deleteIngredient($where) {
        $result = $this->delete($this->table, "id = $where");
        return $result->rowCount() > 0;
    }

}