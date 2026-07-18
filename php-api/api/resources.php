<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$sql = "SELECT id, title, file_path, thumbnail_path, created_at
        FROM resources WHERE is_published = 1
        ORDER BY created_at DESC";

$stmt = $pdo->query($sql);
$resources = $stmt->fetchAll();

echo json_encode(['resources' => $resources]);
