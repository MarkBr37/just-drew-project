<?php

require_once('../app/utils.php');

if( !empty($_POST) ){

   $user_id = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_STRING);
   $user_id = trim($user_id);

   $post_id = filter_input(INPUT_POST, 'post_id', FILTER_SANITIZE_STRING);
   $post_id = trim($post_id);

   // $post_vaild = true;

   // connection to mysql
   $link = mysqli_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DATA_BASE);
   $user_id = mysqli_real_escape_string($link, $user_id);
   $post_id = mysqli_real_escape_string($link, $post_id);

   if(chack_if_favorite($link, $user_id, $post_id)){
      // if its true: the post is on favorite
      echo 1;
   }else{ 
      echo 0;
   }


}