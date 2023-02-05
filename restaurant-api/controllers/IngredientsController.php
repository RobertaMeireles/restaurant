<?php

use core\SecuredController;
use models\Ingredients;

class IngredientsController extends SecuredController {
    private $ingredients;
    private $value;

    public function __construct($ulrParameter) {
        parent::__construct();
        $this->value = $ulrParameter;
        $this->ingredients = new Ingredients();
    }

    /*
    * List ingredients
    */
    public function list() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET' ) {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                if ( $this->value ) {
                    $response = json_encode(['status' => 1, 'message' => $this->ingredients->getByIdIngredient($this->value)],JSON_UNESCAPED_UNICODE);
                } else {
                    $response = json_encode(['status' => 1, 'message' => $this->ingredients->getAllIngredients()] ,JSON_UNESCAPED_UNICODE);
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
    * Add new Ingredient 
    */
    public function add() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                $data = json_decode(file_get_contents('php://input'));
                if($data->name != null || $data->name != '' ||
                    $data->unity != null || $data->unity != '') {
                    $resp = $this->ingredients->createIngredient($data);
                    if (!$resp) {
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
    * Update ingredient 
    */
    public function update() {
        if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                $data = json_decode(file_get_contents('php://input'),true);
                if($data != null || $data != '') {
                    $resp = $this->ingredients->updateIngredient($data, $this->value);
                    if (!$resp) {
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
    * Delete ingredient
    */
    public function delete() {
        if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') { 
                if($this->value != null || $this->value != '') {
                    $resp = $this->ingredients->deleteIngredient($this->value);
                    if (!$resp) {
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