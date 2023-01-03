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
    public function getByIdCategories( $value ) {
        return $this->getById($this->table, '*', 'id =' . $value);
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




}