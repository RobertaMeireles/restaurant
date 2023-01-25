<?php

use models\Users;

class UsersController {

    private $users;
    private $value;

    public function __construct($ulrParameter) {
        $this->value = $ulrParameter;
        $this->users = new Users();
    }

    /*
    * List users
    */
    public function list() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET' ) {
            if ( $this->value ) {
                $response = $this->users->getByIUsers($this->value);
                echo json_encode($response);
            }else {
                $response = $this->users->getAllUsers();
                echo json_encode($response);
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
            echo json_encode('Incorrect execution');
        }
    }

    /*
    * Update user 
    */
    public function update() {
        if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
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
            }
            else {
                $response = json_encode(['status' => 0, 'message' => 'Value not allowed.']);
            }
            echo $response;
        } else {
            echo json_encode('Incorrect execution');
        }
    }

    /*
    * Delete user 
    */
    public function delete() {
        if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
            if($this->value != null || $this->value != '') {
                $resp = $this->users->deleteUser($this->value);
                if (!$resp) {
                    $response = json_encode(['status' => 1, 'message' => 'Record deleted successfully.']);
                } else {
                    $response = json_encode(['status' => 0, 'message' => 'Error in dataBase.']);
                }
            }
            else {
                $response = json_encode(['status' => 0, 'message' => 'Value not allowed.']);
            }
            echo $response;
        } else {
            echo json_encode('Incorrect execution');
        }
    }

}