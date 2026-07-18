<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$currentPage = 'messages';
$stmt = $pdo->query("SELECT id, name, email, message, is_read, created_at FROM messages ORDER BY created_at DESC");
$messages = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HALE Admin - Messages</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="admin-layout">
        <?php include __DIR__ . '/sidebar.php'; ?>
        <main class="main-content">
            <div class="content-header">
                <h1>Messages</h1>
            </div>

            <?php if (isset($_GET['deleted'])): ?>
                <div class="alert alert-success">Message deleted successfully.</div>
            <?php endif; ?>

            <?php if (empty($messages)): ?>
                <div class="empty-state">
                    <p>No messages yet.</p>
                </div>
            <?php else: ?>
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>From</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($messages as $msg): ?>
                                <tr style="<?= !$msg['is_read'] ? 'background:#f0f7ff;' : '' ?>">
                                    <td>
                                        <?php if (!$msg['is_read']): ?>
                                            <span class="status-badge unread">New</span>
                                        <?php else: ?>
                                            <span class="status-badge published">Read</span>
                                        <?php endif; ?>
                                    </td>
                                    <td class="title-cell"><?= htmlspecialchars($msg['name']) ?></td>
                                    <td><?= htmlspecialchars($msg['email']) ?></td>
                                    <td class="text-cell"><?= htmlspecialchars(mb_strimwidth($msg['message'], 0, 80, '...')) ?></td>
                                    <td><?= date('d M Y H:i', strtotime($msg['created_at'])) ?></td>
                                    <td class="actions-cell">
                                        <a href="message-view.php?id=<?= $msg['id'] ?>" class="btn btn-small btn-edit">View</a>
                                        <a href="delete.php?type=message&id=<?= $msg['id'] ?>" class="btn btn-small btn-delete" onclick="return confirm('Delete this message?')">Delete</a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>
        </main>
    </div>
</body>
</html>
