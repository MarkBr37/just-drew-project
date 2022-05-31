<?php

require_once('./app/utils.php');

$errors = ['error' => 'fales', 'name' => '', 'email' => '', 'password' => '', 'image' => ''];


if( !empty($_POST) && isset($_POST['submit'])){

   $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
   $name = trim($name);

   $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
   $email = trim($email);

   $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
   $password = trim($password);

   $form_vaild = true;

   // connection to mysql
   $link = mysqli_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DATA_BASE);
   $name = mysqli_real_escape_string($link,$name);
   $email = mysqli_real_escape_string($link,$email);
   $password = mysqli_real_escape_string($link,$password);
   $image_name = 'default-profile.png';

   // validate name
   if( !$name || mb_strlen($name) < 2 || mb_strlen($name) > 70 ){
      $errors['name'] = 'Name is required and must be at length 2-70 chars';
      $form_vaild = false;
   }

   // validate email
   if( !$email ){
      $errors['email'] = 'A valid email is required';
      $form_vaild = false;
   }
   elseif( if_email_exist($link, $email)){
      $errors['email'] = 'Email is taken';
      $form_vaild = false;
   }

   // validate password
   if( !$password || strlen($password) < 6 || strlen($password) > 20 ){
      $errors['password'] = 'Password is required and must be at length 6-20 chars';
      $form_vaild = false;
   }
   
   // validate image
   if( $form_vaild && isset($_FILES['image']['error']) && $_FILES['image']['error'] == 0 ){
      
      $max_file_size = 1024 * 1024 * 5;
      $ex = ['png','jpeg','jpg','gif','bmp'];

      if( isset($_FILES['image']['size']) && $_FILES['image']['size'] <= $max_file_size){

         $file_info = pathinfo($_FILES['image']['name']);

         if(in_array(strtolower($file_info['extension']), $ex)){

            if( is_uploaded_file($_FILES['image']['tmp_name'])){

               $image_name = date('d.m.Y.H.i.s') . '-' . $_FILES['image']['name'];
               $file_tmp = $_FILES['image']['tmp_name'];
               $file_directory = './images/profile/'.$image_name;
               
               move_uploaded_file($file_tmp, $file_directory);

            }

         }else{

            $form_vaild = false;
            $errors['image'] = 'Image must be an image';   

         }
      }else{

         $form_vaild = false;
         $errors['image'] = 'Image must be max 5mb';

      }
      
   }elseif( isset( $_FILES['image']['error']) && $_FILES['image']['error'] <= 1 ){

      $form_vaild = false;
      $errors['image'] = 'There is ab error with your image file';
      
   }

   // if all fields ok
   if( $form_vaild ){

      $password = password_hash($password, PASSWORD_BCRYPT);

      $sql = "INSERT INTO users VALUES(NULL, '$name', '$email', '$password', '$image_name', NOW())";

      $result = mysqli_query($link, $sql);

      if ( mysqli_affected_rows($link) !== 1){

         http_response_code(404);
         
      }
      
   }else{ // if there is error in the field
      // sending thw errors
      $errors['error'] = 'true';
      $errors = json_encode($errors);
      echo $errors;
   }
   
}else{

   http_response_code(401);
   
}