<?php
    if(!empty($_POST['pass'])){
        if(password_verify($_POST['pass'], '$2y$10$gZqgd0sVVmdxBYLvUg9jMOuS/JRcFDKiFx0CgJUY54WYRS2G81Jj2')){ //123
            echo 'yes';
        }else{
            echo 'no';
        }
    }
?>