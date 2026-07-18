<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../middleware/auth.php';
header('Content-Type: application/json; charset=UTF-8');
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No image file provided']);
    exit();
}

$file = $_FILES['image'];
$error = $file['error'];

if ($error !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Upload error: ' . $error]);
    exit();
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type. Allowed: JPG, PNG, WEBP']);
    exit();
}

$maxSize = 5 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => 'File too large. Maximum 5MB']);
    exit();
}

$uploadDir = dirname(__DIR__, 2) . '/uploads/articles/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = 'article_' . time() . '_' . bin2hex(random_bytes(8)) . '.' . $extension;
$destination = $uploadDir . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save uploaded file']);
    exit();
}

$url = UPLOAD_URL . $filename;

echo json_encode([
    'success' => true,
    'url' => $url,
    'filename' => $filename
]);
