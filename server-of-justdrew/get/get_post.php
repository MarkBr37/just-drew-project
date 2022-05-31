<?php
// hare the jd will get the user name profile image and the name of the post images

require_once('../app/utils.php');

if(!empty($_POST)){

   $user_id = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_STRING);
   $user_id = trim($user_id);
   
   $post_id = filter_input(INPUT_POST, 'post_id', FILTER_SANITIZE_STRING);
   $post_id = trim($post_id);
   
   $link = mysqli_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DATA_BASE);
   $user_id = mysqli_real_escape_string($link, $user_id);
   $post_id = mysqli_real_escape_string($link, $post_id);
   /* for test
   $user_id = 20;
   $post_id = 8;
   */
  
  $sql = "SELECT `name`, `profile_image`, `image_name` FROM `users`, `posts` WHERE  users.id = $user_id AND posts.id = $post_id";
  
  $result = mysqli_query($link, $sql);
  
  if( $result && mysqli_affected_rows($link) == 1  ){
     $user = mysqli_fetch_assoc($result);
     
     $data[] = [ 'name' => $user['name'], 'profile_image' => $user['profile_image'], 'post_image' => $user['image_name']];
     $data = json_encode( $data );
     
     echo $data;
   }
}