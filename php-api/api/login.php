<?php
require_once __DIR__ . '/config.php';
session_start();
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['email']) || empty($input['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required']);
    exit();
}

$stmt = $pdo->prepare("SELECT id, email, password FROM admin_users WHERE email = ?");
$stmt->execute([$input['email']]);
$user = $stmt->fetch();

if (!$user || !password_verify($input['password'], $user['password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    exit();
}

$_SESSION['admin_id'] = $user['id'];
$_SESSION['admin_email'] = $user['email'];

echo json_encode([
    'success' => true,
    'message' => 'Login successful',
    'email' => $user['email']
]);
