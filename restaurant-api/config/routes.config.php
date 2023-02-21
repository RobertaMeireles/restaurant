<?php

return [
    '/'                     => ['controller' => 'AuthController', 'action' => 'login'],
    'categories'            => ['controller' => 'CategoriesController', 'action' => 'list'],
    'categories/add'       => ['controller' => 'CategoriesController', 'action' => 'add'],
    'categories/update'     => ['controller' => 'CategoriesController', 'action' => 'update'],
    'categories/delete'     => ['controller' => 'CategoriesController', 'action' => 'delete'],
    'users'                 => ['controller' => 'UsersController', 'action' => 'list'],
    'users/add'             => ['controller' => 'UsersController', 'action' => 'add'],
    'users/update'          => ['controller' => 'UsersController', 'action' => 'update'],
    'users/delete'          => ['controller' => 'UsersController', 'action' => 'delete'],
    'tablets'               => ['controller' => 'TabletsController', 'action' => 'list'],
    'tablets/add'           => ['controller' => 'TabletsController', 'action' => 'add'],
    'tablets/update'        => ['controller' => 'TabletsController', 'action' => 'update'],
    'tablets/delete'        => ['controller' => 'TabletsController', 'action' => 'delete'],
    'ingredients'           => ['controller' => 'IngredientsController', 'action' => 'list'],
    'ingredients/add'       => ['controller' => 'IngredientsController', 'action' => 'add'],
    'ingredients/update'    => ['controller' => 'IngredientsController', 'action' => 'update'],
    'ingredients/delete'    => ['controller' => 'IngredientsController', 'action' => 'delete'],
    'recipes'               => ['controller' => 'RecipesController', 'action' => 'list'],
    'recipesbycategory'     => ['controller' => 'RecipesController', 'action' => 'recipesbycategory'],
    'recipes/add'           => ['controller' => 'RecipesController', 'action' => 'add'],
    'recipes/update'        => ['controller' => 'RecipesController', 'action' => 'update'],
    'recipes/delete'        => ['controller' => 'RecipesController', 'action' => 'delete'],
    'orders'                => ['controller' => 'OrdersController', 'action' => 'list'],
    'companyorders'         => ['controller' => 'OrdersController', 'action' => 'listCompanyOrders'],
    'orders/add'            => ['controller' => 'OrdersController', 'action' => 'add'],
    'orders/update'         => ['controller' => 'OrdersController', 'action' => 'update'],
    'orders/delete'         => ['controller' => 'OrdersController', 'action' => 'delete'],
];


