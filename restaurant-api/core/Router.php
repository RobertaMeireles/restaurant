<?php

// This class knows all routers

namespace core;

use Exception;

class Router {

    private $routes;


    public function __construct() {
        $this->routes = require '../config/routes.config.php';
    }

    /*
    * Send router to aplication class (Application.php)
    */
    public function get($uri) {
        try {
            if (in_array($uri, array_keys($this->routes))) {
                foreach($this->routes as $key => $row){
                    if($key == $uri){
                        return $row;
                    }
                }
            }
        } catch (Exception $e) {
            header("HTTP/1.1 404 Not found");
            die($e->getMessage());
        }
    }
}