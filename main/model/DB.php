<?php
require_once 'dbconnection.php';

$link = '';

function query($query)
{
    global $link;
    openConnection();
    $result = mysqli_fetch_array(mysqli_query($link,$query),MYSQLI_ASSOC);
    closeConnection();
    return $result;
}

function openConnection()
{
    global $db_host, $db_user, $db_password, $database, $link;
    $link = mysqli_connect($db_host, $db_user, $db_password, $database)
    or die("Ошибка " . mysqli_error($link));
}

function closeConnection()
{
    global $link;
    mysqli_close($link);
}

