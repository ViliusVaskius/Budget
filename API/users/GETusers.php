<?php 
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
include_once ("../../includes/dbh.inc.php");

$sql = 'SELECT user_id , user_first , user_email , user_uid FROM users';

$result = mysqli_query($conn, $sql);



if(mysqli_num_rows($result) > 0);

echo "[";


for($i=0; $i<mysqli_num_rows($result);$i++){

echo ($i>0? "," : "").json_encode(mysqli_fetch_object($result));
}

echo "]";