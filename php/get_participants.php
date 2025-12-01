<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM participants ORDER BY created_at DESC");
    $participants = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'participants' => $participants
    ]);
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>