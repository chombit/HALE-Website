<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$currentPage = 'messages';

if (!isset($_GET['id'])) {
    header('Location: messages-list.php');
    exit();
}

$id = (int) $_GET['id'];
$stmt = $pdo->prepare("SELECT * FROM messages WHERE id = ?");
$stmt->execute([$id]);
$message = $stmt->fetch();

if (!$message) {
    header('Location: messages-list.php');
    exit();
}

if (!$message['is_read']) {
    $stmt = $pdo->prepare("UPDATE messages SET is_read = 1 WHERE id = ?");
    $stmt->execute([$id]);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HALE Admin - Message from <?= htmlspecialchars($message['name']) ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="admin-layout">
        <?php include __DIR__ . '/sidebar.php'; ?>
        <main class="main-content">
            <div class="content-header">
                <h1>Message</h1>
                <div style="display:flex;gap:0.5rem;">
                    <a href="messages-list.php" class="btn btn-secondary">Back to Messages</a>
                    <a href="delete.php?type=message&id=<?= $message['id'] ?>" class="btn btn-delete" onclick="return confirm('Delete this message?')">Delete</a>
                </div>
            </div>

            <div class="message-view">
                <div class="message-meta">
                    <p><strong>From:</strong> <?= htmlspecialchars($message['name']) ?></p>
                    <p><strong>Email:</strong> <a href="mailto:<?= htmlspecialchars($message['email']) ?>"><?= htmlspecialchars($message['email']) ?></a></p>
                    <p><strong>Date:</strong> <?= date('d M Y, g:i A', strtotime($message['created_at'])) ?></p>
                </div>
                <div class="message-body"><?= htmlspecialchars($message['message']) ?></div>
            </div>
        </main>
    </div>
</body>
</html>
