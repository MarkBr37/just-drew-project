<?php

require_once('../app/utils.php');


if(!empty($_POST)){
   
   $user_id = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_STRING);
   $user_id = trim($user_id);

   $user_date = filter_input(INPUT_POST, 'user_date', FILTER_SANITIZE_STRING);
   $user_date = trim($user_date);

   $otg = true; // ok to go

   $link = mysqli_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DATA_BASE);
   $user_id =  mysqli_real_escape_string($link, $user_id);
   $user_date =  mysqli_real_escape_string($link, $user_date);

   if( !if_user_exist($link, $user_id, $user_date) ){
      $otg = false;
   }
   
   if( $otg ){

      $sql = "SELECT * FROM `posts` WHERE `posts`.`user_id` = $user_id ORDER BY `posts`.`id` DESC";
   
      $result = mysqli_query($link, $sql);

      if( $result && !mysqli_affected_rows($link) <= 0){
         while($post = mysqli_fetch_array($result)){
            $posts[] = [ 
               'id' => $post['id'], 
               'user_id' => $post['user_id'],
               'article' => $post['article'],
               'image' => $post['image_name'],
               'date' => $post['date'],
            ];
         }
      
         $posts = json_encode($posts);
         echo $posts;
      }

      echo null;
   
   }
   
}