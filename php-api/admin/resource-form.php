<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$currentPage = 'resources';
$isEdit = false;
$resource = null;
$error = '';

if (isset($_GET['id'])) {
    $isEdit = true;
    $id = (int) $_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM resources WHERE id = ?");
    $stmt->execute([$id]);
    $resource = $stmt->fetch();
    if (!$resource) {
        header('Location: resources-list.php');
        exit();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $file_path = trim($_POST['file_path'] ?? '');
    $thumbnail_path = trim($_POST['thumbnail_path'] ?? '');
    $is_published = isset($_POST['is_published']) ? 1 : 0;

    if (empty($title)) {
        $error = 'Title is required';
    } else {
        if ($isEdit) {
            $stmt = $pdo->prepare("UPDATE resources SET title=?, file_path=?, thumbnail_path=?, is_published=? WHERE id=?");
            $stmt->execute([$title, $file_path, $thumbnail_path, $is_published, $id]);
            header('Location: resources-list.php?updated=1');
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO resources (title, file_path, thumbnail_path, is_published) VALUES (?, ?, ?, ?)");
            $stmt->execute([$title, $file_path, $thumbnail_path, $is_published]);
            header('Location: resources-list.php?created=1');
            exit();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HALE Admin - <?= $isEdit ? 'Edit' : 'New' ?> Resource</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="admin-layout">
        <?php include __DIR__ . '/sidebar.php'; ?>
        <main class="main-content">
            <div class="content-header">
                <h1><?= $isEdit ? 'Edit Resource' : 'New Resource' ?></h1>
                <a href="resources-list.php" class="btn btn-secondary">Back to Resources</a>
            </div>

            <?php if ($error): ?>
                <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>

            <form method="POST" action="" class="article-form">
                <div class="form-group">
                    <label for="title">Title *</label>
                    <input type="text" id="title" name="title" required
                           value="<?= htmlspecialchars($resource['title'] ?? $_POST['title'] ?? '') ?>"
                           placeholder="Resource title">
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="file_path">File URL (PDF link)</label>
                        <input type="text" id="file_path" name="file_path"
                               value="<?= htmlspecialchars($resource['file_path'] ?? $_POST['file_path'] ?? '') ?>"
                               placeholder="https://example.com/file.pdf">
                    </div>
                    <div class="form-group">
                        <label for="thumbnail_path">Thumbnail Image URL</label>
                        <input type="text" id="thumbnail_path" name="thumbnail_path"
                               value="<?= htmlspecialchars($resource['thumbnail_path'] ?? $_POST['thumbnail_path'] ?? '') ?>"
                               placeholder="https://example.com/thumb.jpg">
                    </div>
                </div>

                <?php if (!empty($resource['thumbnail_path'])): ?>
                    <div class="current-image">
                        <p>Current thumbnail:</p>
                        <img src="<?= htmlspecialchars($resource['thumbnail_path']) ?>" alt="" style="max-width:150px;border-radius:8px;margin-top:0.5rem;">
                    </div>
                <?php endif; ?>

                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" name="is_published" value="1"
                               <?= ($resource['is_published'] ?? $_POST['is_published'] ?? 1) ? 'checked' : '' ?>>
                        Publish immediately
                    </label>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary"><?= $isEdit ? 'Update Resource' : 'Add Resource' ?></button>
                    <a href="resources-list.php" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </main>
    </div>
</body>
</html>
