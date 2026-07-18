<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$isEdit = false;
$article = null;
$error = '';
$success = '';

if (isset($_GET['id'])) {
    $isEdit = true;
    $id = (int) $_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM articles WHERE id = ?");
    $stmt->execute([$id]);
    $article = $stmt->fetch();
    if (!$article) {
        header('Location: dashboard.php');
        exit();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $excerpt = trim($_POST['excerpt'] ?? '');
    $content = trim($_POST['content'] ?? '');
    $cover_image = trim($_POST['cover_image'] ?? '');
    $author = trim($_POST['author'] ?? 'HALE-HRIN');
    $category = trim($_POST['category'] ?? '');
    $is_published = isset($_POST['is_published']) ? 1 : 0;

    if (empty($title) || empty($content)) {
        $error = 'Title and content are required';
    } else {
        $title = htmlspecialchars($title);
        $excerpt = htmlspecialchars($excerpt);
        $author = htmlspecialchars($author);
        $category = htmlspecialchars($category);

        if ($isEdit) {
            $stmt = $pdo->prepare(
                "UPDATE articles SET title=?, excerpt=?, content=?, cover_image=?, author=?, category=?, is_published=? WHERE id=?"
            );
            $stmt->execute([$title, $excerpt, $content, $cover_image, $author, $category, $is_published, $id]);
            header('Location: dashboard.php?updated=1');
            exit();
        } else {
            $stmt = $pdo->prepare(
                "INSERT INTO articles (title, excerpt, content, cover_image, author, category, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)"
            );
            $stmt->execute([$title, $excerpt, $content, $cover_image, $author, $category, $is_published]);
            header('Location: dashboard.php?created=1');
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
    <title>HALE Admin - <?= $isEdit ? 'Edit' : 'New' ?> Article</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="admin-layout">
        <aside class="sidebar">
            <div class="sidebar-header">
                <h2>HALE-HRIN</h2>
                <p>Admin Panel</p>
            </div>
            <nav class="sidebar-nav">
                <a href="dashboard.php">Articles</a>
                <a href="article-form.php" class="active">New Article</a>
                <a href="logout.php" class="logout-link">Logout</a>
            </nav>
        </aside>
        <main class="main-content">
            <div class="content-header">
                <h1><?= $isEdit ? 'Edit Article' : 'New Article' ?></h1>
                <a href="dashboard.php" class="btn btn-secondary">Back to Dashboard</a>
            </div>

            <?php if ($error): ?>
                <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>

            <form method="POST" action="" class="article-form" enctype="multipart/form-data">
                <div class="form-row">
                    <div class="form-group form-group-wide">
                        <label for="title">Title *</label>
                        <input type="text" id="title" name="title" required
                               value="<?= htmlspecialchars($article['title'] ?? $_POST['title'] ?? '') ?>"
                               placeholder="Enter article title">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" name="category">
                            <option value="">Select category</option>
                            <?php
                            $categories = ['Human Rights', 'Gender Equality', 'Child Rights', 'Disability Inclusion', 'Environmental Justice', 'Legal Aid', 'Democracy', 'SRHR', 'Peace Building', 'Research', 'General'];
                            foreach ($categories as $cat):
                                $selected = (($article['category'] ?? $_POST['category'] ?? '') === $cat) ? 'selected' : '';
                            ?>
                                <option value="<?= $cat ?>" <?= $selected ?>><?= $cat ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="author">Author</label>
                        <input type="text" id="author" name="author"
                               value="<?= htmlspecialchars($article['author'] ?? $_POST['author'] ?? 'HALE-HRIN') ?>"
                               placeholder="Author name">
                    </div>
                </div>

                <div class="form-group">
                    <label for="excerpt">Excerpt</label>
                    <textarea id="excerpt" name="excerpt" rows="3"
                              placeholder="Short summary of the article (optional)"><?= htmlspecialchars($article['excerpt'] ?? $_POST['excerpt'] ?? '') ?></textarea>
                </div>

                <div class="form-group">
                    <label for="content">Content *</label>
                    <textarea id="content" name="content" rows="15"
                              placeholder="Write your article content here..."><?= htmlspecialchars($article['content'] ?? $_POST['content'] ?? '') ?></textarea>
                </div>

                <div class="form-row">
                    <div class="form-group form-group-wide">
                        <label for="cover_image">Cover Image URL</label>
                        <input type="text" id="cover_image" name="cover_image"
                               value="<?= htmlspecialchars($article['cover_image'] ?? $_POST['cover_image'] ?? '') ?>"
                               placeholder="Paste image URL or upload below">
                        <div class="upload-section">
                            <label for="cover_image_file" class="btn btn-small btn-secondary">Upload Image</label>
                            <input type="file" id="cover_image_file" accept="image/jpeg,image/png,image/webp" style="display:none">
                            <span id="upload-status"></span>
                        </div>
                    </div>
                </div>

                <?php if (!empty($article['cover_image'])): ?>
                    <div class="current-image">
                        <p>Current cover image:</p>
                        <img src="<?= htmlspecialchars($article['cover_image']) ?>" alt="Cover" style="max-width:300px; border-radius:8px; margin-top:0.5rem;">
                    </div>
                <?php endif; ?>

                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" name="is_published" value="1"
                               <?= ($article['is_published'] ?? $_POST['is_published'] ?? 1) ? 'checked' : '' ?>>
                        Publish immediately
                    </label>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary"><?= $isEdit ? 'Update Article' : 'Create Article' ?></button>
                    <a href="dashboard.php" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </main>
    </div>

    <script>
    document.getElementById('cover_image_file').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const status = document.getElementById('upload-status');
        status.textContent = 'Uploading...';

        const formData = new FormData();
        formData.append('image', file);

        fetch('/api/admin/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById('cover_image').value = data.url;
                status.textContent = 'Upload successful!';
                status.style.color = '#2d784e';
            } else {
                status.textContent = data.error || 'Upload failed';
                status.style.color = '#dc3545';
            }
        })
        .catch(err => {
            status.textContent = 'Upload failed: ' + err.message;
            status.style.color = '#dc3545';
        });
    });
    </script>
</body>
</html>
