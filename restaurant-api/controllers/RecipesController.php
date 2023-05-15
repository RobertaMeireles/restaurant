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
                $res = $this->recipes->getRecipeByIdWithIngredients($this->value);
                $recipe = array(
                    "id"=>$res[0]->id, 
                    "name"=>$res[0]->name, 
                    "description"=>$res[0]->description, 
                    "image"=>$res[0]->image, 
                    "price"=>$res[0]->price, 
                    "categoryId"=>$res[0]->categoryId, 
                    "categoryName"=>$res[0]->categoryName,
                    "ingredients" => []
                );
                foreach ($res as $key => $ingredients) {
                    $newdata =  array (
                        'ingredientId' => $ingredients->ingredientsId,
                        'ingredientName' => $ingredients->ingredientsName,
                        'ingredientQuantity' => $ingredients->recipeIngredientsQuantity,
                        'ingredientsUnity' => $ingredients->ingredientsUnity
                    );
                    array_push($recipe["ingredients"], $newdata);
                }
                $response = json_encode(['status' => 1, 'message' =>  $recipe], JSON_UNESCAPED_UNICODE);
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
                  $data->categoryId != null || $data->categoryId != '' ||
                  $data->price != null || $data->price != ''||
                  $data->ingredients != null || $data->ingredients != '') {
                    $resp = $this->recipes->createRecipe($data);
                    if ($resp['msg']) {
                        $response = json_encode(['status' => 1, 'createdId' => $resp['lastInsertId'], 'message' => 'Record created successfully.']);
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
    * Add image recipe
    */
    public function addImage() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') {
                $file = $this->saveImage($_FILES['image']['name'],$_FILES['image']['tmp_name'], $_FILES["image"]["size"]);
                if ($file) {
                    $data['image'] = $file;
                    $resp = $this->recipes->includeImageRecipe($data, $this->value);
                    if ($resp) {
                        $response = json_encode(['status' => 1, 'message' => 'Image created successfully.']);
                    } else {
                        $response = json_encode(['status' => 0, 'message' => 'Error in dataBase.']);
                    }
                    echo $response;
                } else {
                    echo json_encode('Incorrect execution');
                }
            } else {
                echo json_encode(['status' => 0, 'message' => 'Access not allowed.']);
            }
        } else {
            echo json_encode('Incorrect execution');
        }
    }

    /*
    * Update image Recipe  
    */
    public function updateImage() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // delete old image
            $recipe = $this->recipes->getRecipeByIdNoIngredients($this->value);
            $path = SITE_ROOT . "\assets\images\\";
            $oldImage = $path . $recipe->image;
            if (file_exists($oldImage)) {
                unlink($oldImage);
                // create new image and update on database
                $file = $this->saveImage($_FILES['image']['name'],$_FILES['image']['tmp_name'], $_FILES["image"]["size"]);
                if ($file) {
                    $data['image'] = $file;
                    $resp = $this->recipes->updateImageRecipe($data, $this->value);
                    if ($resp) {
                        $response = json_encode(['status' => 1, 'message' => 'Image created successfully.']);
                    } else {
                        $response = json_encode(['status' => 0, 'message' => 'Error in dataBase.']);
                    }
                    echo $response;
                } else {
                    echo json_encode(['status' => 0, 'message' => 'Could not delete. This file does not exist.']);
                }
            } else {
                echo json_encode('Incorrect execution');
            }
        } else {
            echo json_encode('Incorrect execution');
        }
    }

    /*
    * Update recipe 
    */
    public function update() {
        if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
            $user = $this->userIsAuthenticated();
            if ($user['type'] == 'adm') { 
                $data = json_decode(file_get_contents('php://input'),true);
                if($data != null || $data != '') {
                    $resp = $this->recipes->updateRecipe($data, $this->value);
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
    * Save image
    */
    public function saveImage($fileName, $fileTempName, $fileSize) {
        $path = SITE_ROOT . "\assets\images\\";
        $hash = md5(uniqid());
        $date = date('Y-m-d');
        $targetFile = sprintf("%s%s_%s_%s", $path, $date, $hash, $fileName["image"]);
        $file = sprintf("%s_%s_%s", $date, $hash, $fileName["image"]);
        $target_file=$path.basename($fileName["image"]);
        $imageFileType=pathinfo($target_file,PATHINFO_EXTENSION);
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" ) {
            echo json_encode(['status' => 0, 'message' => 'Sorry, only JPG, JPEG e PNG files are allowed.']);
            die();   
        }
        if ($fileSize["image"] > 1048576) {
            echo json_encode(['status' => 0, 'message' => 'Sorry, your image is too large. Upload less than 1 MB KB in size.']);
            die();   
        }
        $upload = move_uploaded_file($fileTempName["image"], $targetFile);
        if (!$upload) {
            return false;
        }
        return $file;
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