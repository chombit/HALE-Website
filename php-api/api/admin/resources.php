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
        $stmt = $pdo->prepare("SELECT * FROM resources WHERE id = ?");
        $stmt->execute([$id]);
        $resource = $stmt->fetch();
        if (!$resource) {
            http_response_code(404);
            echo json_encode(['error' => 'Resource not found']);
            exit();
        }
        echo json_encode($resource);
    } else {
        $stmt = $pdo->query("SELECT id, title, file_path, thumbnail_path, is_published, created_at FROM resources ORDER BY created_at DESC");
        $resources = $stmt->fetchAll();
        echo json_encode(['resources' => $resources]);
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
    $file_path = trim($input['file_path'] ?? '');
    $thumbnail_path = trim($input['thumbnail_path'] ?? '');
    $is_published = isset($input['is_published']) ? (int) $input['is_published'] : 1;

    $stmt = $pdo->prepare(
        "INSERT INTO resources (title, file_path, thumbnail_path, is_published) VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([$title, $file_path, $thumbnail_path, $is_published]);

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Resource created',
        'id' => (int) $pdo->lastInsertId()
    ]);
}

function handleUpdate($pdo) {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Resource ID is required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id FROM resources WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Resource not found']);
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
    if (isset($input['file_path'])) {
        $fields[] = "file_path = ?";
        $params[] = trim($input['file_path']);
    }
    if (isset($input['thumbnail_path'])) {
        $fields[] = "thumbnail_path = ?";
        $params[] = trim($input['thumbnail_path']);
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
    $sql = "UPDATE resources SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode(['success' => true, 'message' => 'Resource updated']);
}

function handleDelete($pdo) {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Resource ID is required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id, file_path, thumbnail_path FROM resources WHERE id = ?");
    $stmt->execute([$id]);
    $resource = $stmt->fetch();

    if (!$resource) {
        http_response_code(404);
        echo json_encode(['error' => 'Resource not found']);
        exit();
    }

    $uploadDir = dirname(__DIR__, 2) . '/uploads/resources/';
    foreach ([$resource['file_path'], $resource['thumbnail_path']] as $filePath) {
        if ($filePath && strpos($filePath, '/uploads/resources/') !== false) {
            $fullPath = $uploadDir . basename($filePath);
            if (file_exists($fullPath)) {
                unlink($fullPath);
            }
        }
    }

    $stmt = $pdo->prepare("DELETE FROM resources WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['success' => true, 'message' => 'Resource deleted']);
}
