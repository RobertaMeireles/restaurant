<?php

use core\SecuredController;
use models\Users;

class UsersController extends SecuredController {

    public $users;
    public $value;

    public function __construct($ulrParameter) {
        $this->value = $ulrParameter;
        $this->users = new Users();
    }

    /*
    * List users
    */
    public function list() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET' ) {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                if ( $this->value ) {
                    $response = json_encode(['status' => 1, 'message' => $this->users->getUser($this->value)], JSON_UNESCAPED_UNICODE);
                }else {
                    $response = json_encode(['status' => 1, 'message' => $this->users->getAllUsers()] , JSON_UNESCAPED_UNICODE);
                }
                echo $response;
            } else {
                echo json_encode(['status' => 0, 'message' => 'Access not allowed.']);
            }
        } else {
            echo json_encode('Incorrect execution');
        }
    }

    /*
    * Add new user 
    */
    public function add() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                $data = json_decode(file_get_contents('php://input'));
                if($data->name != null || $data->name != '' || 
                  $data->username != null || $data->username != '' || 
                  $data->password != null || $data->password != '' || 
                  $data->type != null || $data->type != '') {
                    $data->password = hash('sha256',$data->password);
                    $resp = $this->users->createUser($data);
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
            echo json_encode('Incorrect execution');
        }
    }

    /*
    * Update user 
    */
    public function update() {
        if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') { 
                $data = json_decode(file_get_contents('php://input'),true);
                if($data != null || $data != '') {
                    if($data['password'] != null) {
                        $data['password'] = hash('sha256', $data['password']);
                    }
                    $resp = $this->users->updateUser($data, $this->value);
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
            echo json_encode('Incorrect execution');
        }
    }

    /*
    * Delete user 
    */
    public function delete() {
        if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') { 
                if($this->value != null || $this->value != '') {
                    $resp = $this->users->deleteUser($this->value);
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
            echo json_encode('Incorrect execution');
        }
    }

}