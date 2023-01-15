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
            $url = explode('/', $uri);
            $value = is_numeric($url[count($url)-1]) ? $url[count($url)-1] : false;
            if ( $value ) {
                array_pop($url);
            } 
            $url = implode('/', $url);
            if (in_array($url, array_keys($this->routes))) {
                foreach($this->routes as $key => $row){
                    if($key == $url){
                        return [$row, $value];
                    }
                }
            }
        } catch (Exception $e) {
            header("HTTP/1.1 404 Not found");
            die($e->getMessage());
        }
    }
}