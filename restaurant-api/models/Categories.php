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
    public function createCategory($name) {
        $result = $this->insert($this->table, [
            'name' => $name,
        ]);
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