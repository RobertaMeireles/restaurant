<?php

namespace core;

use core\Router;
use Exception;

class Application
{

    private $router;

    public function __construct() {
        $this->router = new Router();
    }
 
    /*
    * Send to class Router the URI (Router.php)
    */
    public function start() {
        $uri = $this->getUri();
         try {
            $route = $this->router->get($uri);
            $this->run($route);
         } catch (Exception $e) {
            header("HTTP/1.1 404 Not found");
            die($e->getMessage());
         }
     }

    /*
    * Run controller
    */
    private function run($route) {
        $controller = $route['controller'];
        $action = $route['action'];
        $controllerPath = "../controllers/$controller.php";
        if (file_exists($controllerPath)) {
            require_once $controllerPath; 
            $instance = new $controller();
            $instance->$action();
        } else {
            header("HTTP/1.1 404 Not found");
        }
    }
 
    /*
    * Get URI
    */
    private function getUri() {
        $url = explode('/public/', $_SERVER['REQUEST_URI']);
        if ($url[1] === '') {
            $path = '/';
        } else {
            $path = $url[1];
        }
        return $path;
    }

}