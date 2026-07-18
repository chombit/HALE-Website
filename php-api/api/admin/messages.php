<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../middleware/auth.php';
header('Content-Type: application/json; charset=UTF-8');
requireAuth();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet($pdo);
        break;
    case 'PUT':
        handleUpdate($pdo);
        break;
    case 'DELETE':
        handleDelete($pdo);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function handleGet($pdo) {
    if (isset($_GET['id'])) {
        $id = (int) $_GET['id'];
        $stmt = $pdo->prepare("SELECT * FROM messages WHERE id = ?");
        $stmt->execute([$id]);
        $message = $stmt->fetch();
        if (!$message) {
            http_response_code(404);
            echo json_encode(['error' => 'Message not found']);
            exit();
        }
        if (!$message['is_read']) {
            $stmt = $pdo->prepare("UPDATE messages SET is_read = 1 WHERE id = ?");
            $stmt->execute([$id]);
            $message['is_read'] = 1;
        }
        echo json_encode($message);
    } else {
        $stmt = $pdo->query("SELECT id, name, email, message, is_read, created_at FROM messages ORDER BY created_at DESC");
        $messages = $stmt->fetchAll();
        echo json_encode(['messages' => $messages]);
    }
}

function handleUpdate($pdo) {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Message ID is required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id FROM messages WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Message not found']);
        exit();
    }

    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (strpos($contentType, 'application/json') !== false) {
        $input = json_decode(file_get_contents('php://input'), true);
    } else {
        $input = $_POST;
    }

    if (isset($input['is_read'])) {
        $stmt = $pdo->prepare("UPDATE messages SET is_read = ? WHERE id = ?");
        $stmt->execute([(int) $input['is_read'], $id]);
    }

    echo json_encode(['success' => true, 'message' => 'Message updated']);
}

function handleDelete($pdo) {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Message ID is required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id FROM messages WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Message not found']);
        exit();
    }

    $stmt = $pdo->prepare("DELETE FROM messages WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['success' => true, 'message' => 'Message deleted']);
}
