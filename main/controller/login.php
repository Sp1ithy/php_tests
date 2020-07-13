<?php
require '../model/DB.php';

$user = htmlspecialchars(strip_tags($_POST['username']));
$pass = htmlspecialchars(strip_tags($_POST['password']));

if (empty($user) || empty($pass)) wrongData();

checkUser();

function checkUser()
{

    global $user, $pass;
    $query = query("Select * from users
                        where login = '{$user}' AND password = '{$pass}'");
    echo 'query dump = ';
    if($query==null) return wrongData();
    $hash = generateHashCode();
    query("update users set hash_code = ${hash} where login = '${user}'");
//    setcookie("id",$query['id'],time()+)
}


function wrongData()
{
    readfile('../view/index.html');
    echo '<script>
alert("Проверьте правильность введенных данных!");
</script>';

}

function generateHashCode($length = 5)
{
    $data = array_merge(range('a', 'z'), range(0, 9));
    $counter = 0;
    $hash = "";
    while ($counter < $length) {
        $hash .= array_rand($data);
        $counter++;
    }
    return $hash;

}