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
        $result = (array) $this->insert($this->table, $fieldsAsString, $valuesString);
        if ($result) {
            return [
                'msg' =>  isset($result['message']) ? $result['message'] : false,
                'lastInsertId' =>  isset($result['last_id']) ? $result['last_id'] : false
            ];
        } else {
            echo json_encode(['status' => 0, 'message' => 'Incorrect execution.']);
            die();
        }
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
        $result = (array) $this->update($this->table, $str, 'id = ' . $where);
        if ($result) {
            return [
                'msg' =>  isset($result['message']) ? $result['message'] : false,
            ];
        } else {
            echo json_encode(['status' => 0, 'message' => 'Incorrect execution.']);
            die();
        }
    }

    /*
    * Delete category
    */
    public function deleteCategory($where) {
        $result = (array) $this->delete($this->table, "id = $where");
        if ($result) {
            return [
                'msg' =>  isset($result['message']) ? $result['message'] : false,
            ];
        } else {
            echo json_encode(['status' => 0, 'message' => 'Incorrect execution.']);
            die();
        }
    }

}