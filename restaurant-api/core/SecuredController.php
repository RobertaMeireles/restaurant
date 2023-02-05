<?php

namespace core;

use models\Users;

class SecuredController {

    public $users;

    public function __construct() {
        $this->users = new Users();
    }

    public function checkToken() {
        $headers = apache_request_headers();
        if(isset($headers['Authorization']) || !empty($headers['Authorization'])) {
            $removedWordBearer = explode("Bearer ", $headers['Authorization']);
            $tokenBase64 = $removedWordBearer[count($removedWordBearer)-1];
            $ArrayToken = explode('.', $tokenBase64);
            $header = $ArrayToken[0];
            $payload = $ArrayToken[1];
            $signature = $ArrayToken[2];
            $key = getenv('JWT_KEY');
            $validateSignature = hash_hmac('sha256', "$header.$payload", $key, true);
            $validateSignature = base64_encode($validateSignature);
            if ($validateSignature == $signature) {
                $dataToken = base64_decode($payload);
                $dataToken = json_decode($dataToken);
                if($dataToken->exp > time()) {
                    return $dataToken;
                }
            } else {
                echo json_encode(['status' => 0, 'message' => 'Token ivalid.']);
                die();
            }
        } else {
            echo json_encode(['status' => 0, 'message' => 'Token has not been sent.']);
            die();
        }
    }

    public function userIsAuthenticated() {
        $username = $this->checkToken();
        if($username) {
            $user = $this->users->getUser($username->username, 'username');
            if (!empty($user)) {
                return [
                    'id' => $user->id,
                    'type' => $user->type
                ];
            } else {
                echo json_encode(['status' => 0, 'message' => 'User not found.']);
                die();
            }
        }
    }

}
