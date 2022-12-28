<?php

namespace models;

use core\Database;

class Categories extends Database {
    private $table = 'categories';

    /*
    * List categories 
    */
    public function getAllCategories() {
        return $this->getAll($this->table);
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