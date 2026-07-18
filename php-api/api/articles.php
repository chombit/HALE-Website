<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

if (isset($_GET['id'])) {
    $id = (int) $_GET['id'];
    $stmt = $pdo->prepare(
        "SELECT id, title, excerpt, content, cover_image, author, category, created_at, updated_at
         FROM articles WHERE id = ? AND is_published = 1"
    );
    $stmt->execute([$id]);
    $article = $stmt->fetch();

    if (!$article) {
        http_response_code(404);
        echo json_encode(['error' => 'Article not found']);
        exit();
    }

    echo json_encode($article);
} else {
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 20;
    $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

    $sql = "SELECT id, title, excerpt, cover_image, author, category, created_at
            FROM articles WHERE is_published = 1";
    $params = [];

    if ($category) {
        $sql .= " AND category = ?";
        $params[] = $category;
    }

    $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $articles = $stmt->fetchAll();

    $countSql = "SELECT COUNT(*) as total FROM articles WHERE is_published = 1";
    $countParams = [];
    if ($category) {
        $countSql .= " AND category = ?";
        $countParams[] = $category;
    }
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($countParams);
    $total = $countStmt->fetch()['total'];

    echo json_encode([
        'articles' => $articles,
        'total' => (int) $total,
        'limit' => $limit,
        'offset' => $offset
    ]);
}
