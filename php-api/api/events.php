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
        "SELECT id, title, description, images, created_at
         FROM events WHERE id = ? AND is_published = 1"
    );
    $stmt->execute([$id]);
    $event = $stmt->fetch();

    if (!$event) {
        http_response_code(404);
        echo json_encode(['error' => 'Event not found']);
        exit();
    }

    $event['images'] = json_decode($event['images'], true) ?? [];
    $event['description'] = $event['description'];

    echo json_encode($event);
} else {
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 50;
    $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

    $sql = "SELECT id, title, images, created_at
            FROM events WHERE is_published = 1
            ORDER BY created_at DESC LIMIT ? OFFSET ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$limit, $offset]);
    $events = $stmt->fetchAll();

    foreach ($events as &$ev) {
        $imgs = json_decode($ev['images'], true) ?? [];
        $ev['images'] = $imgs;
    }

    $countStmt = $pdo->query("SELECT COUNT(*) as total FROM events WHERE is_published = 1");
    $total = $countStmt->fetch()['total'];

    echo json_encode([
        'events' => $events,
        'total' => (int) $total,
        'limit' => $limit,
        'offset' => $offset
    ]);
}
