<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$currentPage = 'team';
$isEdit = false;
$member = null;
$error = '';

if (isset($_GET['id'])) {
    $isEdit = true;
    $id = (int) $_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM team_members WHERE id = ?");
    $stmt->execute([$id]);
    $member = $stmt->fetch();
    if (!$member) {
        header('Location: team-list.php');
        exit();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $position = trim($_POST['position'] ?? '');
    $image = trim($_POST['image'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $display_order = isset($_POST['display_order']) ? (int) $_POST['display_order'] : 0;
    $is_active = isset($_POST['is_active']) ? 1 : 0;

    if (empty($name)) {
        $error = 'Name is required';
    } else {
        if ($isEdit) {
            $stmt = $pdo->prepare("UPDATE team_members SET name=?, position=?, image=?, description=?, display_order=?, is_active=? WHERE id=?");
            $stmt->execute([$name, $position, $image, $description, $display_order, $is_active, $id]);
            header('Location: team-list.php?updated=1');
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO team_members (name, position, image, description, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $position, $image, $description, $display_order, $is_active]);
            header('Location: team-list.php?created=1');
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
    <title>HALE Admin - <?= $isEdit ? 'Edit' : 'New' ?> Team Member</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="admin-layout">
        <?php include __DIR__ . '/sidebar.php'; ?>
        <main class="main-content">
            <div class="content-header">
                <h1><?= $isEdit ? 'Edit Team Member' : 'New Team Member' ?></h1>
                <a href="team-list.php" class="btn btn-secondary">Back to Team</a>
            </div>

            <?php if ($error): ?>
                <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>

            <form method="POST" action="" class="article-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Name *</label>
                        <input type="text" id="name" name="name" required
                               value="<?= htmlspecialchars($member['name'] ?? $_POST['name'] ?? '') ?>"
                               placeholder="Full name">
                    </div>
                    <div class="form-group">
                        <label for="display_order">Display Order</label>
                        <input type="number" id="display_order" name="display_order"
                               value="<?= htmlspecialchars($member['display_order'] ?? $_POST['display_order'] ?? 0) ?>">
                    </div>
                </div>

                <div class="form-group">
                    <label for="position">Position / Title</label>
                    <textarea id="position" name="position" rows="3"
                              placeholder="Position or title"><?= htmlspecialchars($member['position'] ?? $_POST['position'] ?? '') ?></textarea>
                </div>

                <div class="form-group">
                    <label for="image">Image URL</label>
                    <input type="text" id="image" name="image"
                           value="<?= htmlspecialchars($member['image'] ?? $_POST['image'] ?? '') ?>"
                           placeholder="https://example.com/photo.jpg">
                    <?php if (!empty($member['image'])): ?>
                        <div class="current-image">
                            <img src="<?= htmlspecialchars($member['image']) ?>" alt="" style="max-width:150px;border-radius:8px;margin-top:0.5rem;">
                        </div>
                    <?php endif; ?>
                </div>

                <div class="form-group">
                    <label for="description">Bio / Description</label>
                    <textarea id="description" name="description" rows="12"
                              placeholder="Bio paragraph(s). Separate paragraphs with blank lines."><?= htmlspecialchars($member['description'] ?? $_POST['description'] ?? '') ?></textarea>
                </div>

                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" name="is_active" value="1"
                               <?= ($member['is_active'] ?? $_POST['is_active'] ?? 1) ? 'checked' : '' ?>>
                        Active (visible on website)
                    </label>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary"><?= $isEdit ? 'Update Member' : 'Add Member' ?></button>
                    <a href="team-list.php" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </main>
    </div>
</body>
</html>
