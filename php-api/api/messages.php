<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['name']) || empty($input['email']) || empty($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, email, and message are required']);
    exit();
}

$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($input['message']));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

$stmt = $pdo->prepare(
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)"
);
$stmt->execute([$name, $email, $message]);

http_response_code(201);
echo json_encode([
    'success' => true,
    'status' => 'success',
    'message' => 'Message sent successfully'
]);
