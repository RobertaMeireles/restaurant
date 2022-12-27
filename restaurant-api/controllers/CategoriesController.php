<?php

use models\Categories;

class CategoriesController {

    private $categories;

    public function __construct() {
        $this->categories = new Categories();
    }

    /*
    * List categories
    */
    public function list() {
        $response = 'Hello World';
        echo json_encode($response);
    }

    /*
    * Add new category 
    */
    public function add() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $data = json_decode(file_get_contents('php://input'));
            if($data->name != null || $data->name != '') {
                $name = $data->name;
                $resp = $this->categories->createCategory($name);
                if (!$resp) {
                    $response = json_encode(['status' => 1, 'message' => 'Record created successfully.']);
                } else {
                    $response = json_encode(['status' => 0, 'message' => 'Error in dataBase']);
                }
            }
            else {
                $response = json_encode(['status' => 0, 'message' => 'Value not allowed.']);
            }
            echo $response;
        } 
    }

}