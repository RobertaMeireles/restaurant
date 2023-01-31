<?php

return [
    '/'                     => ['controller' => 'AuthController', 'action' => 'login'],
    'categories'            => ['controller' => 'CategoriesController', 'action' => 'list'],
    'categories/add'       => ['controller' => 'CategoriesController', 'action' => 'add'],
    'categories/update'     => ['controller' => 'CategoriesController', 'action' => 'update'],
    'categories/delete'     => ['controller' => 'CategoriesController', 'action' => 'delete'],
    'users'                 => ['controller' => 'UsersController', 'action' => 'list'],
    'users/add'       => ['controller' => 'UsersController', 'action' => 'add'],
    'users/update'     => ['controller' => 'UsersController', 'action' => 'update'],
    'users/delete'     => ['controller' => 'UsersController', 'action' => 'delete'],
];


