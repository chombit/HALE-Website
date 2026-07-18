<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$currentPage = 'articles';
$stmt = $pdo->query("SELECT id, title, category, author, is_published, created_at FROM articles ORDER BY created_at DESC");
$articles = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HALE Admin - Articles</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="admin-layout">
        <?php include __DIR__ . '/sidebar.php'; ?>
        <main class="main-content">
            <div class="content-header">
                <h1>Articles</h1>
                <a href="article-form.php" class="btn btn-primary">+ New Article</a>
            </div>

            <?php if (empty($articles)): ?>
                <div class="empty-state">
                    <p>No articles yet. Create your first article!</p>
                    <a href="article-form.php" class="btn btn-primary">Create Article</a>
                </div>
            <?php else: ?>
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($articles as $article): ?>
                                <tr>
                                    <td class="title-cell"><?= htmlspecialchars(mb_strimwidth($article['title'], 0, 60, '...')) ?></td>
                                    <td><?= htmlspecialchars($article['category'] ?: '—') ?></td>
                                    <td><?= htmlspecialchars($article['author']) ?></td>
                                    <td>
                                        <span class="status-badge <?= $article['is_published'] ? 'published' : 'draft' ?>">
                                            <?= $article['is_published'] ? 'Published' : 'Draft' ?>
                                        </span>
                                    </td>
                                    <td><?= date('d M Y', strtotime($article['created_at'])) ?></td>
                                    <td class="actions-cell">
                                        <a href="article-form.php?id=<?= $article['id'] ?>" class="btn btn-small btn-edit">Edit</a>
                                        <a href="delete.php?type=article&id=<?= $article['id'] ?>" class="btn btn-small btn-delete" onclick="return confirm('Are you sure?')">Delete</a>
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
