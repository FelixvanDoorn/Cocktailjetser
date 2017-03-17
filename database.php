<?php
/**
 * Created by PhpStorm.
 * User: thomaso
 * Date: 17-3-2017
 * Time: 14:39
 */


$mysqli = new mysqli('127.0.0.1', '-', '-', '-');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
        . $mysqli->connect_error);
}