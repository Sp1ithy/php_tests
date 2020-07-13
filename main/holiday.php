<?php
$date = $_GET['date'];

$date = date('Y-m-d',strtotime($date));
$res = file_get_contents("https://datazen.katren.ru/calendar/day/${date}/");
$res = json_decode($res)->holiday;
if($res){
    echo "<h2>${date} is a HOLIDAY !</h2>";
}
else{
    echo "<h2>${date} is a not a holiday =( !</h2>";
}

