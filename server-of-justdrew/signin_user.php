<?php

require_once('./app/utils.php');

$errors = ['error' => 'fales', 'name' => '', 'email' => '', 'password' => '',];


if( !empty($_POST) && isset($_POST['submit'])){

   $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
   $email = trim($email);

   $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
   $password = trim($password);

   $form_vaild = true;

   // connection to mysql
   $link = mysqli_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DATA_BASE);
   $email = mysqli_real_escape_string($link,$email);
   $password = mysqli_real_escape_string($link,$password);

   // validate email
   if( !$email  ){
      $errors['email'] = 'A valid email is required';
      $form_vaild = false;
   }

   // validate password
   if( !$form_vaild || !$password  || strlen($password) < 6 || strlen($password) > 20 ){
      $errors['password'] = 'Please fill your password';
      $form_vaild = false;
   }

   // if all fields ok
   if( $form_vaild ){

      $sql = "SELECT * FROM users WHERE email = '$email'";

      $result = mysqli_query($link, $sql);

      if ( $result && mysqli_affected_rows($link) === 1){

         $user = mysqli_fetch_assoc($result);
         
         if( password_verify($password , $user['password']) ){

            
            $user = ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email'], 'date' => $user['signin_date'] ];
            $user = json_encode($user);
            
            echo $user;

         }else{

            $errors['email'] = 'Email or password is wrong';
            send_error($errors);

         }
         
      }else{ 
         
         $errors['email'] = 'Email or password is wrong';
         send_error($errors);

      }
      
   }else{ // if there is error in the field

      send_error($errors);
   }
   
}else{

   http_response_code(401);
   
}