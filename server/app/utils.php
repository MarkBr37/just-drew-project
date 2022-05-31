<?php

// access to all
header('Access-Control-Allow-Origin: *');
// sql
require_once('db_config.php');

function if_email_exist($link,$email){

   $sql = "SELECT email FROM `users` WHERE email = '$email'";

   $result = mysqli_query($link,$sql);

   if( $result && mysqli_affected_rows($link) == 1  ){
      return true;
   }
   return false;
}

function send_error($errors){
   $errors['error'] = 'true';
   $errors = json_encode($errors);
   echo $errors;
}

function if_user_exist($link, $id, $date){

   $sql = "SELECT id, signin_date FROM `users` WHERE `id` = '$id' AND `signin_date` = '$date'";   
   
   $result = mysqli_query($link, $sql);

   if( $result && mysqli_affected_rows($link) == 1 ){
      return true;
   }
   return false;
}

// chack if it is favorite
function chack_if_favorite($link, $user_id, $post_id){

   $sql = "SELECT * FROM `favorite_posts` WHERE `user_id` = $user_id AND `favorite_idpost` = $post_id";
   
   $result = mysqli_query($link, $sql);
   
   if ($result && mysqli_affected_rows($link) == 1){
      // post is allready favorite
      return true;
   }
   return false;
}