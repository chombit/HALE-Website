<?php
$currentPage = $currentPage ?? 'dashboard';
?>
<aside class="sidebar">
    <div class="sidebar-header">
        <h2>HALE-HRIN</h2>
        <p>Admin Panel</p>
    </div>
    <nav class="sidebar-nav">
        <a href="dashboard.php" class="<?= $currentPage === 'dashboard' ? 'active' : '' ?>">Dashboard</a>
        <span class="nav-section">Content</span>
        <a href="articles.php" class="<?= $currentPage === 'articles' ? 'active' : '' ?>">Articles</a>
        <a href="events.php" class="<?= $currentPage === 'events' ? 'active' : '' ?>">Events</a>
        <a href="team-list.php" class="<?= $currentPage === 'team' ? 'active' : '' ?>">Team</a>
        <a href="resources-list.php" class="<?= $currentPage === 'resources' ? 'active' : '' ?>">Resources</a>
        <span class="nav-section">Communication</span>
        <a href="messages-list.php" class="<?= $currentPage === 'messages' ? 'active' : '' ?>">Messages</a>
        <a href="logout.php" class="logout-link">Logout</a>
    </nav>
</aside>
