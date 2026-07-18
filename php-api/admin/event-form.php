<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$currentPage = 'events';
$isEdit = false;
$event = null;
$error = '';

if (isset($_GET['id'])) {
    $isEdit = true;
    $id = (int) $_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
    $stmt->execute([$id]);
    $event = $stmt->fetch();
    if (!$event) {
        header('Location: events.php');
        exit();
    }
    $event['images'] = json_decode($event['images'], true) ?? [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $imagesRaw = trim($_POST['images'] ?? '');
    $is_published = isset($_POST['is_published']) ? 1 : 0;

    if (empty($title)) {
        $error = 'Title is required';
    } else {
        $images = array_values(array_filter(array_map('trim', explode("\n", $imagesRaw))));

        if ($isEdit) {
            $stmt = $pdo->prepare("UPDATE events SET title=?, description=?, images=?, is_published=? WHERE id=?");
            $stmt->execute([$title, $description, json_encode($images), $is_published, $id]);
            header('Location: events.php?updated=1');
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO events (title, description, images, is_published) VALUES (?, ?, ?, ?)");
            $stmt->execute([$title, $description, json_encode($images), $is_published]);
            header('Location: events.php?created=1');
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
    <title>HALE Admin - <?= $isEdit ? 'Edit' : 'New' ?> Event</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="admin-layout">
        <?php include __DIR__ . '/sidebar.php'; ?>
        <main class="main-content">
            <div class="content-header">
                <h1><?= $isEdit ? 'Edit Event' : 'New Event' ?></h1>
                <a href="events.php" class="btn btn-secondary">Back to Events</a>
            </div>

            <?php if ($error): ?>
                <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>

            <form method="POST" action="" class="article-form">
                <div class="form-group">
                    <label for="title">Title *</label>
                    <input type="text" id="title" name="title" required
                           value="<?= htmlspecialchars($event['title'] ?? $_POST['title'] ?? '') ?>"
                           placeholder="Event title">
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="15"
                              placeholder="Event description. Use blank lines to separate paragraphs."><?= htmlspecialchars($event['description'] ?? $_POST['description'] ?? '') ?></textarea>
                </div>

                <div class="form-group">
                    <label for="images">Image URLs (one per line)</label>
                    <textarea id="images" name="images" rows="5"
                              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"><?= htmlspecialchars(implode("\n", $event['images'] ?? ($_POST['images'] ?? []))) ?></textarea>
                </div>

                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" name="is_published" value="1"
                               <?= ($event['is_published'] ?? $_POST['is_published'] ?? 1) ? 'checked' : '' ?>>
                        Publish immediately
                    </label>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary"><?= $isEdit ? 'Update Event' : 'Create Event' ?></button>
                    <a href="events.php" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </main>
    </div>
</body>
</html>
