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
    $sql = "SELECT id, title, excerpt, cover_image, author, category, is_published, created_at, updated_at
            FROM articles ORDER BY created_at DESC";
    $stmt = $pdo->query($sql);
    $articles = $stmt->fetchAll();

    echo json_encode(['articles' => $articles]);
}

function handleCreate($pdo) {
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (strpos($contentType, 'application/json') !== false) {
        $input = json_decode(file_get_contents('php://input'), true);
    } else {
        $input = $_POST;
    }

    if (empty($input['title']) || empty($input['content'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Title and content are required']);
        exit();
    }

    $title = htmlspecialchars(trim($input['title']));
    $excerpt = htmlspecialchars(trim($input['excerpt'] ?? ''));
    $content = trim($input['content']);
    $cover_image = trim($input['cover_image'] ?? '');
    $author = htmlspecialchars(trim($input['author'] ?? 'HALE-HRIN'));
    $category = htmlspecialchars(trim($input['category'] ?? ''));
    $is_published = isset($input['is_published']) ? (int) $input['is_published'] : 1;

    $stmt = $pdo->prepare(
        "INSERT INTO articles (title, excerpt, content, cover_image, author, category, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->execute([$title, $excerpt, $content, $cover_image, $author, $category, $is_published]);

    $id = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Article created',
        'id' => (int) $id
    ]);
}

function handleUpdate($pdo) {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Article ID is required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id FROM articles WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Article not found']);
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
    if (isset($input['excerpt'])) {
        $fields[] = "excerpt = ?";
        $params[] = htmlspecialchars(trim($input['excerpt']));
    }
    if (isset($input['content'])) {
        $fields[] = "content = ?";
        $params[] = trim($input['content']);
    }
    if (isset($input['cover_image'])) {
        $fields[] = "cover_image = ?";
        $params[] = trim($input['cover_image']);
    }
    if (isset($input['author'])) {
        $fields[] = "author = ?";
        $params[] = htmlspecialchars(trim($input['author']));
    }
    if (isset($input['category'])) {
        $fields[] = "category = ?";
        $params[] = htmlspecialchars(trim($input['category']));
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
    $sql = "UPDATE articles SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode([
        'success' => true,
        'message' => 'Article updated'
    ]);
}

function handleDelete($pdo) {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Article ID is required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id, cover_image FROM articles WHERE id = ?");
    $stmt->execute([$id]);
    $article = $stmt->fetch();

    if (!$article) {
        http_response_code(404);
        echo json_encode(['error' => 'Article not found']);
        exit();
    }

    if ($article['cover_image'] && strpos($article['cover_image'], '/uploads/articles/') !== false) {
        $imagePath = dirname(__DIR__, 2) . '/uploads/articles/' . basename($article['cover_image']);
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
    }

    $stmt = $pdo->prepare("DELETE FROM articles WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode([
        'success' => true,
        'message' => 'Article deleted'
    ]);
}
