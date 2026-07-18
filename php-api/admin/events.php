<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$currentPage = 'events';
$stmt = $pdo->query("SELECT id, title, is_published, created_at FROM events ORDER BY created_at DESC");
$events = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HALE Admin - Events</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="admin-layout">
        <?php include __DIR__ . '/sidebar.php'; ?>
        <main class="main-content">
            <div class="content-header">
                <h1>Events</h1>
                <a href="event-form.php" class="btn btn-primary">+ New Event</a>
            </div>

            <?php if (empty($events)): ?>
                <div class="empty-state">
                    <p>No events yet. Create your first event!</p>
                    <a href="event-form.php" class="btn btn-primary">Create Event</a>
                </div>
            <?php else: ?>
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($events as $event): ?>
                                <tr>
                                    <td class="title-cell"><?= htmlspecialchars(mb_strimwidth($event['title'], 0, 70, '...')) ?></td>
                                    <td>
                                        <span class="status-badge <?= $event['is_published'] ? 'published' : 'draft' ?>">
                                            <?= $event['is_published'] ? 'Published' : 'Draft' ?>
                                        </span>
                                    </td>
                                    <td><?= date('d M Y', strtotime($event['created_at'])) ?></td>
                                    <td class="actions-cell">
                                        <a href="event-form.php?id=<?= $event['id'] ?>" class="btn btn-small btn-edit">Edit</a>
                                        <a href="delete.php?type=event&id=<?= $event['id'] ?>" class="btn btn-small btn-delete" onclick="return confirm('Are you sure?')">Delete</a>
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
