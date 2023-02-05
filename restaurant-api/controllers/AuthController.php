<?php

use models\Users;

// use Firebase\JWT\JWT;
// use Firebase\JWT\Key;

class AuthController {
    private $users;
    public function __construct() {
        $this->users = new Users();
    }

    /*
    * Generate Token jwt
    */
    public function generateToken($user) {
        // TOKEN LIB Firebase\JWT\JWT composer require firebase/php-jwt:
        // $duration = time() + (7 * 24 * 60 * 60);
        // $key = getenv('JWT_KEY');
        // $payload = [
        //     'name' => $userName,
        //     'exp' => $duration,
        // ];
        // $token = JWT::encode($payload,$key,'HS256');
        // return $token;

        // TOKEN WITHOUT LIB 
        $duration = time() + (7 * 24 * 60 * 60);
        $key = getenv('JWT_KEY');

        $header = [
            'alg' => 'HS256',
            'typ' => 'JWT'
        ];

        $header = json_encode($header);
        $header = base64_encode($header);
        $payload = [
            'username' => $user->username,
            'exp' => $duration,
        ];

        $payload = json_encode($payload);
        $payload = base64_encode($payload);
        $signature = hash_hmac('sha256', "$header.$payload", $key, true);
        $signature = base64_encode($signature);

        $token = "$header.$payload.$signature";

        return $token;

    }

    /*
    * Login
    */
    public function login() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST' ) {
            $data = json_decode(file_get_contents('php://input'));
            if($data->username != null || $data->username != '' || 
              $data->password != null || $data->password != '') {
                $user = $this->users->getUser($data->username, 'username');
                if ($user) {
                    $passwordHash = hash('sha256', $data->password);
                    if($user->password == $passwordHash) {  
                        $token = $this->generateToken($user);
                        $response = json_encode(
                            [
                            'status' => 0, 
                            'name' => $user->name, 
                            'username' => $user->username,  
                            'type' => $user->type,
                            'token' => $token
                            ]);
                    } else {
                        $response = json_encode(['status' => 0, 'message' => 'The password is not right.']);
                    }
                } else {
                    $response = json_encode(['status' => 0, 'message' => 'There is not this user in dataBase.']);
                }
            }
            else {
                $response = json_encode(['status' => 0, 'message' => 'Value not allowed.']);
            }
            echo($response);
        } else {
            echo json_encode('Incorrect execution.');
        }
    }
}