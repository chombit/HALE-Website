<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$currentPage = 'resources';
$stmt = $pdo->query("SELECT id, title, file_path, is_published, created_at FROM resources ORDER BY created_at DESC");
$resources = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HALE Admin - Resources</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="admin-layout">
        <?php include __DIR__ . '/sidebar.php'; ?>
        <main class="main-content">
            <div class="content-header">
                <h1>Resources</h1>
                <a href="resource-form.php" class="btn btn-primary">+ Add Resource</a>
            </div>

            <?php if (empty($resources)): ?>
                <div class="empty-state">
                    <p>No resources yet. Add your first resource!</p>
                    <a href="resource-form.php" class="btn btn-primary">Add Resource</a>
                </div>
            <?php else: ?>
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>File</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($resources as $resource): ?>
                                <tr>
                                    <td class="title-cell"><?= htmlspecialchars(mb_strimwidth($resource['title'], 0, 60, '...')) ?></td>
                                    <td class="text-cell"><?= htmlspecialchars($resource['file_path'] ?: '—') ?></td>
                                    <td>
                                        <span class="status-badge <?= $resource['is_published'] ? 'published' : 'draft' ?>">
                                            <?= $resource['is_published'] ? 'Published' : 'Draft' ?>
                                        </span>
                                    </td>
                                    <td><?= date('d M Y', strtotime($resource['created_at'])) ?></td>
                                    <td class="actions-cell">
                                        <a href="resource-form.php?id=<?= $resource['id'] ?>" class="btn btn-small btn-edit">Edit</a>
                                        <a href="delete.php?type=resource&id=<?= $resource['id'] ?>" class="btn btn-small btn-delete" onclick="return confirm('Are you sure?')">Delete</a>
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
