<?php

require_once('./app/utils.php');

if( !empty($_POST) ){

   $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
   $id = trim($id);

   $date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_STRING);
   $date = trim($date);

   $link = mysqli_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DATA_BASE);
   $id = mysqli_real_escape_string($link, $id);
   $date = mysqli_real_escape_string($link, $date);

   $vaild_data = true;

   if( !$id ){
      $vaild_data = false;
   }
   if( !$date ){
      $vaild_data = false;
   }

   if( $vaild_data ){

      if( if_user_exist($link, $id, $date) ){
         echo 1;
      }else{
         echo 0;
      }
      
   }else{
      echo 0;
   }

}else{
   echo 0;
}