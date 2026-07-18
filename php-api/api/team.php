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
        "SELECT id, name, position, image, description, created_at
         FROM team_members WHERE id = ? AND is_active = 1"
    );
    $stmt->execute([$id]);
    $member = $stmt->fetch();

    if (!$member) {
        http_response_code(404);
        echo json_encode(['error' => 'Team member not found']);
        exit();
    }

    $member['description'] = array_values(array_filter(explode("\n\n", $member['description'])));

    echo json_encode($member);
} else {
    $sql = "SELECT id, name, position, image, display_order
            FROM team_members WHERE is_active = 1
            ORDER BY display_order ASC, id ASC";

    $stmt = $pdo->query($sql);
    $members = $stmt->fetchAll();

    echo json_encode(['members' => $members]);
}
