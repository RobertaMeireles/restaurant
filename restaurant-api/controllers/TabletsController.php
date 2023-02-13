<?php

use core\SecuredController;
use models\Tablets;

class TabletsController extends SecuredController {

    public $tablets;
    public $value;

    public function __construct($ulrParameter) {
        parent::__construct();
        $this->value = $ulrParameter;
        $this->tablets = new Tablets();
    }

        /*
    * List Tablet
    */
    public function list() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET' ) {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                if ( $this->value ) {
                    $response = json_encode(['status' => 1, 'message' => $this->tablets->getByIdTablet($this->value)], JSON_UNESCAPED_UNICODE);
                } else {
                    $response = json_encode(['status' => 1, 'message' => $this->tablets->getAllTablet()], JSON_UNESCAPED_UNICODE);
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
    * Add new Tablet 
    */
    public function add() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                $data = json_decode(file_get_contents('php://input'));
                if($data->restaurantId != null || $data->restaurantId != '') {
                    $resp = $this->tablets->createTablet($data);
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
    * Update Tablet 
    */
    public function update() {
        if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                $data = json_decode(file_get_contents('php://input'),true);
                if($data != null || $data != '') {
                    $resp = $this->tablets->updateTablet($data, $this->value);
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
    * Delete Tablet 
    */
    public function delete() {
        if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') { 
                if($this->value != null || $this->value != '') {
                    $resp = $this->tablets->deleteTablet($this->value);
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