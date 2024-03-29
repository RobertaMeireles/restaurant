<?php

use core\SecuredController;
use models\Categories;

class CategoriesController extends SecuredController {

    private $categories;
    private $value;

    public function __construct($ulrParameter) {
        parent::__construct();
        $this->value = $ulrParameter;
        $this->categories = new Categories();
    }

    /*
    * List categories
    */
    public function list() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET' ) {
            if ( $this->value ) {
                $response = json_encode(['status' => 1, 'message' => $this->categories->getByIdCategories($this->value)] , JSON_UNESCAPED_UNICODE);
            } else {
                $response = json_encode(['status' => 1, 'message' => $this->categories->getAllCategories()] , JSON_UNESCAPED_UNICODE);
            }
            echo $response;
        } else {
            echo json_encode('Incorrect execution.');
        }
    }

    /*
    * Add new category 
    */
    public function add() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                $data = json_decode(file_get_contents('php://input'));
                if($data->name != null || $data->name != '') {
                    $resp = $this->categories->createCategory($data);
                    if ($resp['msg']) {
                        $response = json_encode(['status' => 1, 'message' => 'Record created successfully.']);
                    } else {
                        $response = json_encode(['status' => 0, 'message' => 'Error in dataBase.']);
                    }
                }
                else {
                    $response = json_encode(['status' => 0, 'message' => 'Value not allowed.']);
                }
                echo $response;
            } else {
                echo json_encode(['status' => 0, 'message' => 'Access not allowed.']);
            }
        } else {
            echo json_encode('Incorrect execution.');
        }
    }

    /*
    * Update category 
    */
    public function update() {
        if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                $data = json_decode(file_get_contents('php://input'),true);
                if($data != null || $data != '') {
                    $resp = $this->categories->updateCategory($data, $this->value);
                    if ($resp['msg']) {
                        $response = json_encode(['status' => 1, 'message' => 'Record updated successfully.']);
                    } else {
                        $response = json_encode(['status' => 0, 'message' => 'Error in dataBase.']);
                    }
                } else {
                    $response = json_encode(['status' => 0, 'message' => 'Value not allowed.']);
                }
                echo $response;
            } else {
                echo json_encode(['status' => 0, 'message' => 'Access not allowed.']);
            }
        } else {
            echo json_encode('Incorrect execution.');
        }
    }

    /*
    * Delete category 
    */
    public function delete() {
        if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') { 
                if($this->value != null || $this->value != '') {
                    $resp = $this->categories->deleteCategory($this->value);
                    if ($resp['msg']) {
                        $response = json_encode(['status' => 1, 'message' => 'Record deleted successfully.']);
                    } else {
                        $response = json_encode(['status' => 0, 'message' => 'Error in dataBase.']);
                    }
                } else {
                    $response = json_encode(['status' => 0, 'message' => 'Value not allowed.']);
                }
                echo $response;
            } else {
                echo json_encode(['status' => 0, 'message' => 'Access not allowed.']);
            }
        } else {
            echo json_encode('Incorrect execution.');
        }
    }
}