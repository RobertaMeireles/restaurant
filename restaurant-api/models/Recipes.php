<?php

namespace models;

use core\Database;

class Recipes extends Database {
    private $tableRecipes = 'recipes';
    private $tableRecipesIngredients = 'recipesIngredients';

    /*
    * List all Recipes 
    */
    public function getAllRecipes() {
        return $this->queryFullRecipe();
    }

    /*
    * List recipe by ID
    */
    public function getRecipe( $where ) {
        return $this->queryFullRecipe($where);
    }

    /*
    * Add new line recipe-Ingredients
    */
    public function createLineRecipeIngredients($data, $lastRecipeId = null, ) {
        foreach ($data as $value) {
            $valuesString = $lastRecipeId . ' , ' . $value->id . ' , ' . $value->quantity ;
            $result = (array) $this->insert($this->tableRecipesIngredients, "recipeId, ingredientId, quantity", $valuesString );
            if ($result["message"] == 0) {
                return false;
            } 
        }
        return true;
    }
    

    /*
    * Update new line recipe-Ingredients
    */
    public function updateRecipeIngredients($data, $recipeIdToUpdate) {
        if($recipeIdToUpdate) {
            $valuesString = $recipeIdToUpdate . ' , ' . $data[0]['id'] . ' , ' . $data[0]['quantity'] ;
            $result = $this->insert($this->tableRecipesIngredients, "recipeId, ingredientId, quantity", $valuesString );
            if ($result) {
                return [
                    'msg' =>  isset($result['message']) ? $result['message'] : false,
                ];
            } else {
                echo json_encode(['status' => 0, 'message' => 'Incorrect execution.']);
                die();
            }
        } else {
            $lastRecipeId = $this->queryGetLastId($this->tableRecipes);
            if(!empty($lastRecipeId)) {
                foreach ($data as $value) {
                    $valuesString = $lastRecipeId . ' , ' . $value->id . ' , ' . $value->quantity ;
                    return $this->insert($this->tableRecipesIngredients, "recipeId, ingredientId, quantity", $valuesString );
                }
                
            } else {
                echo json_encode(['status' => 0, 'message' => 'Incorrect execution.']);
                die();
            }
        }
    }

    /*
    * Add new recipe 
    */
    public function createRecipe($data) {
        $recipeData = (array) $data;
        $ingredients = array_pop($recipeData);
        $fields = array_keys($recipeData);
        $fieldsAsString = implode(", ", $fields);
        $valuesString = '';
        $i = 0;
        $len = count($recipeData);
        foreach ($recipeData as $value) {
            if ($len == 1 || $i == $len - 1) {
                $valuesString .= '"' . $value . '"';
            } else {
                $valuesString .= '"' . $value . '"' . ",";
            }
            $i++;
        }    
        $insertRecipe = (array) $this->insert($this->tableRecipes, $fieldsAsString, $valuesString);
        if ($insertRecipe) {
            $returnRecipe = [
                'msg' =>  isset($insertRecipe['message']) ? $insertRecipe['message'] : false,
                'lastInsertId' =>  isset($insertRecipe['last_id']) ? $insertRecipe['last_id'] : false
            ];
            $return = $this->createLineRecipeIngredients($ingredients, $returnRecipe['lastInsertId']);
            // if error delete recipe created!
            if(!$return) {
                $where = $returnRecipe['lastInsertId'];
                $this->delete($this->tableRecipesIngredients, "recipeId = $where");
                $this->delete($this->tableRecipes, "id = $where");
            } 
            return $return;
        } else {
            echo json_encode(['status' => 0, 'message' => 'Incorrect execution.']);
            die();
        }

    }

    /*
    * Update recipe 
    */
    public function updateRecipes($data, $where) {
        if($this->getRecipe($where)) {
            $auxArray = [];
            if(!empty($data['ingredients'])) {
                $auxArray = $data;
                array_pop($data); //removed last item in $data ($data['ingredients']).
            }
            $isSuccess = true;
            // update recipes table
            if (!empty($data['name']) || !empty($data['description']) || !empty($data['categoryId']) || !empty($data['price'])) {
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
                $result = (array) $this->update($this->tableRecipes, $str, 'id = ' . $where);
                if (!$result['message']) {
                    $isSuccess = false;
                }
            }
            // update recipe-ingredients table
            if (!empty($auxArray['ingredients'])) {
                // Add an ingredient: Is the item already exist in the database? if not, add the item. 
                // Delete an ingredient:  Is the item already exist in the recipeIngredients database? if yes, is the quantity the same? if yes delete the item.
                // Update the quantity of the ingredient: Is the item already exist id in the recipeIngredients database? if yes, the quantity is different? update the quantity of the item.
                foreach ($auxArray['ingredients'] as $value) {
                    $ingredient = $this->getById($this->tableRecipesIngredients, '*', 'recipeId = ' . $where . ' and ingredientId = '. $value['id']);
                    // There is the ingredient in recipe-ingredients?
                    if($ingredient) {
                        // delete - Because user passed same value in $data['ingredients']
                        if ($ingredient->quantity == $value['quantity']) {
                            $result = (array) $this->delete($this->tableRecipesIngredients, "recipeId = $where and ingredientId = $ingredient->ingredientId");
                            if (!$result['message']) {
                                $isSuccess = false;
                            }
                        // update - Because user passed different value in $data['ingredients']
                        } else {
                            $quantityString =  'quantity  = '  . $value['quantity'] ;
                            $whereString =  'recipeId  = ' . $where . ' and ingredientId = ' . $ingredient->ingredientId;
                            $result = (array) $this->update('recipesingredients', $quantityString, $whereString);
                            if (!$result['message']) {
                                $isSuccess = false;
                            }
                        }
                    } else {
                        // Include - Because there is not this ingredient in this recipe
                        $valuesString = $where . ' , ' . $value['id'] . ' , ' . $value['quantity'];
                        $result = (array) $this->insert($this->tableRecipesIngredients, "recipeId, ingredientId, quantity", $valuesString );
                        if (!$result['message']) {
                            $isSuccess = false;
                        }
                    }
                }
            } 
            return $isSuccess;

        } else {
            echo json_encode(['status' => 0, 'message' => 'Recipe not found.']);
            die();
        }
    
    }

    /*
    * Delete recipe
    */
    public function deleteRecipeAndIngredients($where, $table = null) {
        $isSuccess = true;
        if($table) {
            $result = (array) $this->delete($table, "id = $where");
        } else {
            $result = (array) $this->delete($this->tableRecipesIngredients, "recipeId = $where");
            $result = (array) $this->delete($this->tableRecipes, "id = $where");
        }
        if (!$result['message']) {
            $isSuccess = false;
        }
        return $isSuccess;

    }

}