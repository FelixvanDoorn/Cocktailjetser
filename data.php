<?php

error_reporting(E_ALL ^ E_NOTICE);

$mysqli = new mysqli('127.0.0.1', 'root', '', 'faaltk1a_cocktail');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
        . $mysqli->connect_error);
}

function nextNumber() {
    global $mysqli;
    $query = "SELECT * FROM `tickets` ORDER BY number DESC LIMIT 1";
    $result = $mysqli->query($query);
    $row = $result->fetch_assoc();
    $number = $row['number'] + 1;
    $mysqli->query("INSERT INTO `tickets` (`number`) VALUES ('". $number ."')");
    return true;
}

switch($_POST['type']) {
    case 'getList':
        $query = "SELECT * FROM `tickets` WHERE called=0 ORDER BY number DESC LIMIT 8";
        $result = $mysqli->query($query);
        $rows = array();
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row['number'];
        }
        echo json_encode($rows);
        break;
    case 'next':
        echo json_encode(array('success' => nextNumber()));
        break;
    case 'done':
        $number = $mysqli->real_escape_string($_POST['number']);
        $query = "UPDATE `tickets` SET called=1 WHERE `number`='$number'";
        $result = $mysqli->query($query);
        echo json_encode(array('success' => nextNumber()));
        break;
}
