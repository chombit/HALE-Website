<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$type = $_GET['type'] ?? 'article';
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

if ($id <= 0) {
    header('Location: dashboard.php');
    exit();
}

$tables = [
    'article' => 'articles',
    'event' => 'events',
    'team' => 'team_members',
    'resource' => 'resources',
    'message' => 'messages',
];

$redirects = [
    'article' => 'dashboard.php',
    'event' => 'events.php',
    'team' => 'team-list.php',
    'resource' => 'resources-list.php',
    'message' => 'messages-list.php',
];

$table = $tables[$type] ?? null;
$redirect = $redirects[$type] ?? 'dashboard.php';

if (!$table) {
    header('Location: dashboard.php');
    exit();
}

$stmt = $pdo->prepare("DELETE FROM $table WHERE id = ?");
$stmt->execute([$id]);

header("Location: $redirect?deleted=1");
exit();
