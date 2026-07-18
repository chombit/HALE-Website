<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$currentPage = 'dashboard';

$articleCount = $pdo->query("SELECT COUNT(*) as c FROM articles")->fetch()['c'];
$eventCount = $pdo->query("SELECT COUNT(*) as c FROM events")->fetch()['c'];
$teamCount = $pdo->query("SELECT COUNT(*) as c FROM team_members")->fetch()['c'];
$resourceCount = $pdo->query("SELECT COUNT(*) as c FROM resources")->fetch()['c'];
$messageCount = $pdo->query("SELECT COUNT(*) as c FROM messages")->fetch()['c'];
$unreadCount = $pdo->query("SELECT COUNT(*) as c FROM messages WHERE is_read = 0")->fetch()['c'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HALE Admin - Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="admin-layout">
        <?php include __DIR__ . '/sidebar.php'; ?>
        <main class="main-content">
            <div class="content-header">
                <h1>Dashboard</h1>
            </div>

            <?php if (isset($_GET['deleted'])): ?>
                <div class="alert alert-success">Item deleted successfully.</div>
            <?php endif; ?>
            <?php if (isset($_GET['created'])): ?>
                <div class="alert alert-success">Item created successfully.</div>
            <?php endif; ?>
            <?php if (isset($_GET['updated'])): ?>
                <div class="alert alert-success">Item updated successfully.</div>
            <?php endif; ?>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number"><?= $articleCount ?></div>
                    <div class="stat-label">Articles</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?= $eventCount ?></div>
                    <div class="stat-label">Events</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?= $teamCount ?></div>
                    <div class="stat-label">Team Members</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?= $resourceCount ?></div>
                    <div class="stat-label">Resources</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?= $messageCount ?></div>
                    <div class="stat-label">Messages<?= $unreadCount > 0 ? " ($unreadCount new)" : '' ?></div>
                </div>
            </div>

            <h2 style="margin-bottom:1rem; color:#312F44;">Quick Actions</h2>
            <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                <a href="article-form.php" class="btn btn-primary">+ New Article</a>
                <a href="event-form.php" class="btn btn-primary">+ New Event</a>
                <a href="team-form.php" class="btn btn-primary">+ Add Team Member</a>
                <a href="resource-form.php" class="btn btn-primary">+ Add Resource</a>
                <?php if ($unreadCount > 0): ?>
                    <a href="messages-list.php" class="btn btn-primary" style="background-color:#007bff;">View Messages (<?= $unreadCount ?>)</a>
                <?php endif; ?>
            </div>
        </main>
    </div>
</body>
</html>
