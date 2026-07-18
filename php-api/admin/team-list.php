<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit();
}

require_once __DIR__ . '/../api/config.php';

$currentPage = 'team';
$stmt = $pdo->query("SELECT id, name, position, image, display_order, is_active, created_at FROM team_members ORDER BY display_order ASC, id ASC");
$members = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HALE Admin - Team</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="admin-layout">
        <?php include __DIR__ . '/sidebar.php'; ?>
        <main class="main-content">
            <div class="content-header">
                <h1>Team Members</h1>
                <a href="team-form.php" class="btn btn-primary">+ Add Member</a>
            </div>

            <?php if (empty($members)): ?>
                <div class="empty-state">
                    <p>No team members yet. Add your first member!</p>
                    <a href="team-form.php" class="btn btn-primary">Add Member</a>
                </div>
            <?php else: ?>
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Order</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($members as $member): ?>
                                <tr>
                                    <td>
                                        <?php if ($member['image']): ?>
                                            <img src="<?= htmlspecialchars($member['image']) ?>" alt="" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">
                                        <?php else: ?>
                                            <div style="width:40px;height:40px;border-radius:50%;background:#ddd;"></div>
                                        <?php endif; ?>
                                    </td>
                                    <td class="title-cell"><?= htmlspecialchars($member['name']) ?></td>
                                    <td class="text-cell"><?= htmlspecialchars($member['position'] ?: '—') ?></td>
                                    <td><?= $member['display_order'] ?></td>
                                    <td>
                                        <span class="status-badge <?= $member['is_active'] ? 'published' : 'draft' ?>">
                                            <?= $member['is_active'] ? 'Active' : 'Inactive' ?>
                                        </span>
                                    </td>
                                    <td class="actions-cell">
                                        <a href="team-form.php?id=<?= $member['id'] ?>" class="btn btn-small btn-edit">Edit</a>
                                        <a href="delete.php?type=team&id=<?= $member['id'] ?>" class="btn btn-small btn-delete" onclick="return confirm('Are you sure?')">Delete</a>
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
