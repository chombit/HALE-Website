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
    case 'POST':
        handleCreate($pdo);
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
        $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
        $stmt->execute([$id]);
        $event = $stmt->fetch();
        if (!$event) {
            http_response_code(404);
            echo json_encode(['error' => 'Event not found']);
            exit();
        }
        $event['images'] = json_decode($event['images'], true) ?? [];
        echo json_encode($event);
    } else {
        $stmt = $pdo->query("SELECT id, title, is_published, created_at FROM events ORDER BY created_at DESC");
        $events = $stmt->fetchAll();
        echo json_encode(['events' => $events]);
    }
}

function handleCreate($pdo) {
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (strpos($contentType, 'application/json') !== false) {
        $input = json_decode(file_get_contents('php://input'), true);
    } else {
        $input = $_POST;
    }

    if (empty($input['title'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Title is required']);
        exit();
    }

    $title = htmlspecialchars(trim($input['title']));
    $description = trim($input['description'] ?? '');
    $images = isset($input['images']) ? (is_array($input['images']) ? $input['images'] : array_values(array_filter(array_map('trim', explode("\n", $input['images']))))) : [];
    $is_published = isset($input['is_published']) ? (int) $input['is_published'] : 1;

    $stmt = $pdo->prepare(
        "INSERT INTO events (title, description, images, is_published) VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([$title, $description, json_encode($images), $is_published]);

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Event created',
        'id' => (int) $pdo->lastInsertId()
    ]);
}

function handleUpdate($pdo) {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Event ID is required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id FROM events WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Event not found']);
        exit();
    }

    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (strpos($contentType, 'application/json') !== false) {
        $input = json_decode(file_get_contents('php://input'), true);
    } else {
        $input = $_POST;
    }

    $fields = [];
    $params = [];

    if (isset($input['title'])) {
        $fields[] = "title = ?";
        $params[] = htmlspecialchars(trim($input['title']));
    }
    if (isset($input['description'])) {
        $fields[] = "description = ?";
        $params[] = trim($input['description']);
    }
    if (isset($input['images'])) {
        $images = is_array($input['images']) ? $input['images'] : array_values(array_filter(array_map('trim', explode("\n", $input['images']))));
        $fields[] = "images = ?";
        $params[] = json_encode($images);
    }
    if (isset($input['is_published'])) {
        $fields[] = "is_published = ?";
        $params[] = (int) $input['is_published'];
    }

    if (empty($fields)) {
        http_response_code(400);
        echo json_encode(['error' => 'No fields to update']);
        exit();
    }

    $params[] = $id;
    $sql = "UPDATE events SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode(['success' => true, 'message' => 'Event updated']);
}

function handleDelete($pdo) {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Event ID is required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id FROM events WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Event not found']);
        exit();
    }

    $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['success' => true, 'message' => 'Event deleted']);
}
