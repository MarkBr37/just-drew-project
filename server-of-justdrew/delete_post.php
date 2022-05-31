<?php

require_once('./app/utils.php');

if( !empty($_POST) ){

   $user_id = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_STRING);
   $user_id = trim($user_id);

   $post_id = filter_input(INPUT_POST, 'post_id', FILTER_SANITIZE_STRING);
   $post_id = trim($post_id);

   $user_date = filter_input(INPUT_POST, 'user_date', FILTER_SANITIZE_STRING);
   $user_date = trim($user_date);

   
   $link = mysqli_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DATA_BASE);
   $user_id = mysqli_real_escape_string($link,$user_id);
   $post_id = mysqli_real_escape_string($link,$post_id);
   $user_date = mysqli_real_escape_string($link,$user_date);

   $ok_to_delete = true;

   
   if( !$user_id && !$post_id && !$user_date){

      $ok_to_delete = false;
   }

   if( !$ok_to_delete && !if_user_exist($link, $user_id, $user_date)){
      $ok_to_delete = false;

   }

   if( $ok_to_delete ){
      $sql = "SELECT `image_name` FROM `posts` WHERE `id` = $post_id AND `user_id` = $user_id";

      $result = mysqli_query($link, $sql);

      if( $result && mysqli_affected_rows($link) === 1 ){
         $post = mysqli_fetch_assoc($result);
         
         if($post['image_name']){
            $post_image = $post['image_name'];
         }
      }else{
         $ok_to_delete = false;
      }
   }

   //need to check if image is set 
   //if yes delet the file

   if( $ok_to_delete ){
   $sql = "DELETE FROM `posts` WHERE `posts`.`id` = '$post_id' AND `posts`.`user_id` = '$user_id'";
   
   $result = mysqli_query($link, $sql);
   

      if ( mysqli_affected_rows($link) === 1){

         // delete from favorite posts
         $sql = "DELETE FROM `favorite_posts` WHERE favorite_idpost = '$post_id'";
         $result = mysqli_query($link, $sql);
         
         
         if(isset($post_image)){
            if(unlink("./images/posts/$post_image")){
               echo '1';
            }else{
               http_response_code(400);
            }
         }else{
            echo 1;
         }
         
      }else{
         http_response_code(404);
      }
   
   } 

}