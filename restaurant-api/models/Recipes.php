<?php

namespace models;

use core\Database;

class Recipes extends Database {
    private $tableRecipes = 'recipes';
    private $tableRecipesIngredients = '`recipes-ingredients`';

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
    public function createLineRecipeIngredients($data, $recipeIdToUpdate = null) {
        if($recipeIdToUpdate) {
            $valuesString = $recipeIdToUpdate . ' , ' . $data[0]['id'] . ' , ' . $data[0]['quantity'] ;
            $result = $this->insert($this->tableRecipesIngredients, "recipeId, ingredientId, quantity", $valuesString );
            return $result['stmt']->rowCount() > 0;
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
        $insertRecipe = $this->insert($this->tableRecipes, $fieldsAsString, $valuesString);
        if(!empty($insertRecipe['stmt'])) {
            $this->createLineRecipeIngredients($ingredients);
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
            $return = false;
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
                $result = $this->update($this->tableRecipes, $str, 'id = ' . $where);
                if($result) {
                    $return = true;
                } 
            }
            // update recipe-ingredients table
            if (!empty($auxArray['ingredients'])) {
                // Acrescentar um ingrediente: esse item já existe na base de dados? se não, acrescenta o item. 
                // Deletar um ingrediente: esse item já existe o id na base de dados recipe-ingredients? se sim, a quantidade é igual? se sim deleta o item.
                // Atualizar a quantidade do ingrediente :esse item já existe id na base de dados recipe-ingredients? se sim, a quantidade é diferente? atualiza a quantidade do item.
                foreach ($auxArray['ingredients'] as $value) {
                    $ingredient = $this->getById($this->tableRecipesIngredients, '*', 'recipeId = ' . $where . ' and ingredientId = '. $value['id']);
                    // There is the ingredient in recipe-ingredients?
                    if($ingredient) {
                        // delete - Because user passed same value in $data['ingredients']
                        if ($ingredient->quantity == $value['quantity']) {
                            $result = $this->deleteRecipeAndIngredients($ingredient->id, $this->tableRecipesIngredients);
                            if( $result == 0 ) {
                                $return = true;
                            } 
                        // update - Because user passed different value in $data['ingredients']
                        } else {
                            $result = $this->update($this->tableRecipesIngredients, 'quantity = ' . $value['quantity'], 'id = ' . $ingredient->id);
                            if( $result) {
                                $return = true;
                            } 
                        }
                    } else {
                        // Include - Because there is not this ingredient in this recipe
                        $result = $this->createLineRecipeIngredients($auxArray['ingredients'], $where);
                        if( $result == 0 ) {
                            $return = true;
                        }
                    }
                }
            } 
            return $return;

        } else {
            echo json_encode(['status' => 0, 'message' => 'Recipe not found.']);
            die();
        }
    
    }

    /*
    * Delete recipe
    */
    public function deleteRecipeAndIngredients($where, $table = null) {
        if($table) {
            $result = $this->delete($table, "id = $where");
        } else {
            $result = $this->delete($this->tableRecipesIngredients, "recipeId = $where");
            $result = $this->delete($this->tableRecipes, "id = $where");
        }
        return $result->rowCount() > 0;

    }

}