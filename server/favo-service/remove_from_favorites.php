<?php


require_once('../app/utils.php');

if(!empty($_POST)){

   $user_id = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_STRING);
   $user_id = trim($user_id);

   $post_id = filter_input(INPUT_POST, 'post_id', FILTER_SANITIZE_STRING);
   $post_id = trim($post_id);

   // connection to mysql
   $link = mysqli_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DATA_BASE);
   $user_id = mysqli_real_escape_string($link, $user_id);
   $post_id = mysqli_real_escape_string($link, $post_id);

   // chack if it is favorite
   if(chack_if_favorite($link, $user_id, $post_id)){
      $sql = "DELETE FROM favorite_posts WHERE `user_id` = $user_id AND `favorite_idpost` = $post_id";
      
      $result = mysqli_query($link, $sql);
      
      if ( $result && mysqli_affected_rows($link) !== 1){
         
         // echo 'not add: error';
         http_response_code(404);
         
      }
      
      // post removed
      echo 1;
   }else{
      // post not removed
      echo 0;
      // echo 'post not vaild: post is allready favorite';
   }
      
}