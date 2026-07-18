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
        $stmt = $pdo->prepare("SELECT * FROM team_members WHERE id = ?");
        $stmt->execute([$id]);
        $member = $stmt->fetch();
        if (!$member) {
            http_response_code(404);
            echo json_encode(['error' => 'Team member not found']);
            exit();
        }
        echo json_encode($member);
    } else {
        $stmt = $pdo->query("SELECT id, name, position, image, display_order, is_active, created_at FROM team_members ORDER BY display_order ASC, id ASC");
        $members = $stmt->fetchAll();
        echo json_encode(['members' => $members]);
    }
}

function handleCreate($pdo) {
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (strpos($contentType, 'application/json') !== false) {
        $input = json_decode(file_get_contents('php://input'), true);
    } else {
        $input = $_POST;
    }

    if (empty($input['name'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Name is required']);
        exit();
    }

    $name = htmlspecialchars(trim($input['name']));
    $position = htmlspecialchars(trim($input['position'] ?? ''));
    $image = trim($input['image'] ?? '');
    $description = trim($input['description'] ?? '');
    $display_order = isset($input['display_order']) ? (int) $input['display_order'] : 0;
    $is_active = isset($input['is_active']) ? (int) $input['is_active'] : 1;

    $stmt = $pdo->prepare(
        "INSERT INTO team_members (name, position, image, description, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)"
    );
    $stmt->execute([$name, $position, $image, $description, $display_order, $is_active]);

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Team member created',
        'id' => (int) $pdo->lastInsertId()
    ]);
}

function handleUpdate($pdo) {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Member ID is required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id FROM team_members WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Team member not found']);
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

    if (isset($input['name'])) {
        $fields[] = "name = ?";
        $params[] = htmlspecialchars(trim($input['name']));
    }
    if (isset($input['position'])) {
        $fields[] = "position = ?";
        $params[] = htmlspecialchars(trim($input['position']));
    }
    if (isset($input['image'])) {
        $fields[] = "image = ?";
        $params[] = trim($input['image']);
    }
    if (isset($input['description'])) {
        $fields[] = "description = ?";
        $params[] = trim($input['description']);
    }
    if (isset($input['display_order'])) {
        $fields[] = "display_order = ?";
        $params[] = (int) $input['display_order'];
    }
    if (isset($input['is_active'])) {
        $fields[] = "is_active = ?";
        $params[] = (int) $input['is_active'];
    }

    if (empty($fields)) {
        http_response_code(400);
        echo json_encode(['error' => 'No fields to update']);
        exit();
    }

    $params[] = $id;
    $sql = "UPDATE team_members SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode(['success' => true, 'message' => 'Team member updated']);
}

function handleDelete($pdo) {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Member ID is required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id FROM team_members WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Team member not found']);
        exit();
    }

    $stmt = $pdo->prepare("DELETE FROM team_members WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['success' => true, 'message' => 'Team member deleted']);
}
