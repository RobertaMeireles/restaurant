<?php

use core\SecuredController;
use models\Recipes;

class RecipesController extends SecuredController
{
    public $recipes;
    public $value;

    public function __construct($ulrParameter) {
        parent::__construct();
        $this->value = $ulrParameter;
        $this->recipes = new Recipes();
    }

    /*
    * List Recipes
    */
    public function list() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET' ) {
            if ( $this->value ) {
                $res = $this->recipes->getRecipeById($this->value);
                $response = json_encode(['status' => 1, 'message' =>  $res], JSON_UNESCAPED_UNICODE);
            }else {
                $res =  $this->recipes->getAllRecipes();
                $response = json_encode(['status' => 1, 'message' => $res], JSON_UNESCAPED_UNICODE);
            }
            if (empty($res) ) {
                echo json_encode(['status' => 0, 'message' => 'Recipe not found.'], JSON_UNESCAPED_UNICODE);
            } else {
                echo $response;
            }
        } else {
            echo json_encode('Incorrect execution');
        }
    }

    /*
    * List Recipes by category
    */
    public function recipesbycategory(){
        if ( $this->value ) {
            $res = $this->recipes->getRecipesByCategory($this->value);
            $response =  json_encode(['status' => 1, 'message' =>  $res], JSON_UNESCAPED_UNICODE);
            if (empty($res) ) {
                echo json_encode(['status' => 0, 'message' => 'There is no recipe for this category.'], JSON_UNESCAPED_UNICODE);
            } else {
                echo $response;
            }
        } else {
            echo json_encode('Incorrect execution');
        }
    }

    /*
    * Add new Recipe 
    */
    public function add() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                $data = json_decode(file_get_contents('php://input'));
                if($data->name != null || $data->name != '' || 
                  $data->description != null || $data->description != '' || 
                  $data->password != null || $data->password != '' || 
                  $data->categoryId != null || $data->categoryId != '' ||
                  $data->price != null || $data->price != ''||
                  $data->ingredients != null || $data->ingredients != '') {
                    $resp = $this->recipes->createRecipe($data);
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
                echo json_encode(['status' => 0, 'message' => 'Access not allowed.']);
            }
        } else {
            echo json_encode('Incorrect execution');
        }
    }

    /*
    * Update Recipe 
    */
    public function update() {
        if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') { 
                $data = json_decode(file_get_contents('php://input'),true);
                if($data != null || $data != '') {
                    $resp = $this->recipes->updateRecipes($data, $this->value);
                    if ($resp) {
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
    * Delete Recipe 
    */
    public function delete() {
        if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') { 
                if($this->value != null || $this->value != '') {
                    $resp = $this->recipes->deleteRecipeAndIngredients($this->value);
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