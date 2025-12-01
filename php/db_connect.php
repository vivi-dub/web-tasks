<?php
$host = 'localhost';
$db   = 'conference_db';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Для отладки
    echo "Ошибка подключения: " . $e->getMessage();
    exit();
}
?>