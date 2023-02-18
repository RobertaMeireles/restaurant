<?php

use core\SecuredController;
use models\Orders;

class OrdersController extends SecuredController {

    public $orders;
    public $value;

    public function __construct($ulrParameter) {
        parent::__construct();
        $this->value = $ulrParameter;
        $this->orders = new Orders();
    }

    /*
    * List Orders to user
    */
    public function list() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET' ) {
            if ( $this->value ) {
                $response = json_encode(['status' => 1, 'message' => $this->orders->getOrderById($this->value)], JSON_UNESCAPED_UNICODE);
            }else {
                echo json_encode('Incorrect execution');
                die();
            }
            if (empty($response) ) {
                echo json_encode('Order not found.');
            } else {
                echo $response;
            }
        } else {
            echo json_encode('Incorrect execution');
        }
    }

    /*
    * List Orders
    */
    public function listCompanyOrders() {
        $user = $this->userIsAuthenticated();
        if ($_SERVER['REQUEST_METHOD'] == 'GET' ) {
            if( $user['type'] == 'adm' || $user['type'] == 'user') {
                if ( $this->value) {
                    $response = json_encode(['status' => 1, 'message' => $this->orders->getOrderById($this->value)], JSON_UNESCAPED_UNICODE);
                }else {
                    $response = json_encode(['status' => 1, 'message' => $this->orders->getAllOrders()], JSON_UNESCAPED_UNICODE);
                }
            }else {
                echo json_encode(['status' => 0, 'message' => 'Access not allowed.']);
                die();
            }
            if (empty($response) ) {
                echo json_encode('Order not found.');
            } else {
                echo $response;
            }
        } else {
            echo json_encode('Incorrect execution');
        }
    }
    

    /*
    * Add new Order 
    */
    public function add() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $data = json_decode(file_get_contents('php://input'));
            if($data->tabletId != null || $data->tabletId != '' || 
                $data->recipes != null || $data->recipes != '') {
                $resp = $this->orders->createOrder($data);
                if ($resp) {
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
    * Delete Order 
    */
    public function delete() {
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $user = $this->userIsAuthenticated();
        if ($user['type'] == 'adm') { 
            if($this->value != null || $this->value != '') {
                $resp = $this->orders->deleteRecipeAndOrders($this->value);
                if ($resp) {
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