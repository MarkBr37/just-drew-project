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

      $sql = "SELECT favorite_idpost FROM `favorite_posts` WHERE `user_id` = $user_id";
      $result = mysqli_query($link, $sql);

      if( $result && !mysqli_affected_rows($link) <= 0){
         while($post_id = mysqli_fetch_array($result)){
            $posts_ids[] = $post_id['favorite_idpost'];
         }
      }

      

      if(isset($posts_ids)){

         $array_length = count($posts_ids);
         $i = 0;
         while( $i < $array_length){
         
         $post_id = $posts_ids[$i];
         $sql = "SELECT * FROM `posts` WHERE `id` = $post_id";
         $result = mysqli_query($link, $sql);
         
         $post = mysqli_fetch_array($result);
         $posts[] = [
            'id' => $post['id'], 
            'user_id' => $post['user_id'],
            'article' => $post['article'],
            'image' => $post['image_name'],
            'date' => $post['date'],
         ];
         
         $i++;
         }
         
         $posts = json_encode($posts);
         echo $posts;
      }else{

         echo null;

      }
   }  
}