<?php

require_once('../app/utils.php');


$link = mysqli_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DATA_BASE);

$sql = "SELECT * FROM `posts` ORDER BY `posts`.`id` DESC";

$result = mysqli_query($link, $sql);

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