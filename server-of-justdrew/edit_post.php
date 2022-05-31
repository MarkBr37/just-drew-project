<?php


require_once('./app/utils.php');

$errors = ['error' => 'fales', 'post' => '', 'image' => '', 'user_error' => 'fales', 'id_error' => 'fales',];

// test ------------------------------
/* $data = ['post'=> $_POST , 'file'=> $_FILES]; 
$data = json_encode($data);

echo($data); 
 die; */
//-----------------------------------

if( !empty($_POST) ){
   
   $article = filter_input(INPUT_POST, 'textarea_post', FILTER_SANITIZE_STRING);
   $article = trim($article);

   $user_id = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_STRING);
   $user_id = trim($user_id);

   $user_date = filter_input(INPUT_POST, 'user_date', FILTER_SANITIZE_STRING);
   $user_date = trim($user_date);

   $old_image = filter_input(INPUT_POST, 'old_image', FILTER_SANITIZE_STRING);
   $old_image = trim($old_image);

   $post_id = filter_input(INPUT_POST, 'post_id', FILTER_SANITIZE_STRING);
   $post_id = trim($post_id);
   
   $post_vaild = true;
   $image_name = NULL;
   $image_delete = false;
   
   // connection to mysql
   $link = mysqli_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DATA_BASE);
   $article = mysqli_real_escape_string($link, $article); 
   $user_id =  mysqli_real_escape_string($link, $user_id);
   $user_date =  mysqli_real_escape_string($link, $user_date);
   $post_id =  mysqli_real_escape_string($link, $post_id);
   
   if( !$user_date || !$user_id || !$post_id ){
      $errors['id_error'] = 'true';
      $post_vaild = false;
   }
   
   if( $post_vaild && !if_user_exist($link, $user_id, $user_date) ){
      $errors['user_error'] = 'true';
      $post_vaild = false;
   }

   if( $post_vaild && !$article && !$_FILES ){
      $errors['post'] = 'Text or image are not allow to be empty.';
      $post_vaild = false;
   }
   

   // delete the old image
   if( $post_vaild && $old_image && isset($_FILES['select_image'])){
      unlink("./images/posts/$old_image");
      $image_delete = true;
   }
   

   // validate image
   if( $post_vaild && isset($_FILES['select_image']['error']) && $_FILES['select_image']['error'] == 0 ){
      
      $megabyte = 10;
      $max_file_size = 1024 * 1024 * $megabyte;
      $ex = ['png','jpeg','jpg','gif','bmp'];

      if( isset($_FILES['select_image']['size']) && $_FILES['select_image']['size'] <= $max_file_size){

         $file_info = pathinfo($_FILES['select_image']['name']);

         if(in_array(strtolower($file_info['extension']), $ex)){

            if( is_uploaded_file($_FILES['select_image']['tmp_name'])){

               $image_name = date('d.m.Y.H.i.s') . '-' . $_FILES['select_image']['name'];
               $file_tmp = $_FILES['select_image']['tmp_name'];
               $file_directory = './images/posts/'.$image_name;
               
               move_uploaded_file($file_tmp, $file_directory);

            }

         }else{

            $post_vaild = false;
            $errors['image'] = 'Image must be an image';   

         }
      }else{

         $post_vaild = false;
         $errors['image'] = "Image must be max $megabyte"+'mb';

      }
      
   }elseif( isset( $_FILES['image']['error']) && $_FILES['image']['error'] <= 1 ){

      $post_vaild = false;
      $errors['image'] = 'There is ab error with your image file';
      
   }
   
   if( $post_vaild ){

      if($image_delete){
         $sql = "UPDATE `posts` SET `article` = '$article', `image_name` = '$image_name'  WHERE `posts`.`id` = $post_id AND `posts`.`user_id` = $user_id";
      }else{
         $sql = "UPDATE `posts` SET `article` = '$article'  WHERE `posts`.`id` = $post_id AND `posts`.`user_id` = $user_id";
      }

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