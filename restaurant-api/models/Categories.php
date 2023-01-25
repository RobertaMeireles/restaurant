<?php

namespace models;

use core\Database;

class Categories extends Database {
    private $table = 'categories';

    /*
    * List all categories 
    */
    public function getAllCategories() {
        return $this->getAll($this->table);
    }

    /*
    * List category by ID
    */
    public function getByIdCategories( $where ) {
        return $this->getById($this->table, '*', 'id =' . $where);
    }

    /*
    * Add new category 
    */
    public function createCategory($data) {
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
    * Update category 
    */
    public function updateCategory($data, $where) {
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
    * Delete category
    */
    public function deleteCategory($where) {
        $result = $this->delete($this->table, "id = $where");
        return $result->rowCount() > 0;
    }

}