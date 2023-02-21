<?php


namespace models;
use \Datetime;
use \DateTimeZone;
use core\Database;

class Orders extends Database {

    private $tableOrders = 'orders';
    private $tableRecipesOrders = '`recipesOrders`';

    /*
    * List all Recipes 
    */
    public function getAllOrders() {
        return $this->queryGetView('fullorders');
    }

    /*
    * List recipe by ID
    */
    public function getOrderById( $where ) {
        return $this->queryGetView('fullorders' , 'orderId =' . $where);
    }

    /*
    * Add new line recipe-Ingredients
    */
    public function createLineRecipesOrders ($data, $lastOrderId ) {
        foreach ($data as $value) {
            $valuesString = $lastOrderId . ' , ' . $value->id . ' , ' . $value->quantity ;
            $result = (array) $this->insert($this->tableRecipesOrders, "orderId, recipeId, quantity", $valuesString );
            if ($result["message"] == 0) {
                return false;
            } 
        }
        return true;
    }

    /*
    * Add new recipe 
    */
    public function createOrder($data) {
        $orderData = (array) $data;
        $date = new DateTime('now', new DateTimeZone('Europe/Lisbon'));
        $date = $date->format('Y-m-d H:i:s');
        $orders = array_pop($orderData);
        $orderData['status'] = 'Elaboração';
        $orderData['date'] = $date;

        $fields = array_keys($orderData);
        $fieldsAsString = implode(", ", $fields);

        $valuesString = '';
        $i = 0;
        $len = count($orderData);
        foreach ($orderData as $value) {
            if ($len == 1 || $i == $len - 1) {
                $valuesString .= '"' . $value . '"';
            } else {
                $valuesString .= '"' . $value . '"' . ",";
            }
            $i++;
        }    

        $insertOrder = (array) $this->insert($this->tableOrders, $fieldsAsString, $valuesString);
        if ($insertOrder) {
            $returnOrder = [
                'msg' =>  isset($insertOrder['message']) ? $insertOrder['message'] : false,
                'lastInsertId' =>  isset($insertOrder['last_id']) ? $insertOrder['last_id'] : false
            ];
            $return = $this->createLineRecipesOrders($orders, $returnOrder['lastInsertId']);
            // if error delete recipe created!
            if(!$return) {
                $where = $returnOrder['lastInsertId'];
                $this->delete($this->tableRecipesOrders, "recipeId = $where");
                $this->delete($this->tableOrders, "id = $where");
            } 
            return $return;
        } else {
            echo json_encode(['status' => 0, 'message' => 'Incorrect execution.']);
            die();
        }

    }

    
    /*
    * Update ingredient 
    */
    public function updateOrder($data, $where) {
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
        $result = (array) $this->update($this->tableOrders, $str, 'id = ' . $where);
        // var_dump($result);
        // die();
        if ($result) {
            return [
                'msg' =>  $result['message'] == 1 ? true : false,
            ];
        } else {
            echo json_encode(['status' => 0, 'message' => 'Incorrect execution.']);
            die();
        }
    }



    /*
    * Delete recipe
    */
    public function deleteRecipeAndOrders($where, $table = null) {
        $isSuccess = true;
        if($table) {
            $result = (array) $this->delete($table, "id = $where");
        } else {
            $result = (array) $this->delete($this->tableRecipesOrders, "orderId = $where");
            $result = (array) $this->delete($this->tableOrders, "id = $where");
        }
        if (!$result['message']) {
            $isSuccess = false;
        }
        return $isSuccess;

    }
}

