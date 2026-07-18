<?php
require_once __DIR__ . '/api/config.php';

$email = 'humanright195@gmail.com';
$password = password_hash('advocacy@123?', PASSWORD_BCRYPT);

$stmt = $pdo->prepare("SELECT id FROM admin_users WHERE email = ?");
$stmt->execute([$email]);
$existing = $stmt->fetch();

if ($existing) {
    $stmt = $pdo->prepare("UPDATE admin_users SET password = ? WHERE email = ?");
    $stmt->execute([$password, $email]);
    echo "Admin user updated: {$email}\n";
} else {
    $stmt = $pdo->prepare("INSERT INTO admin_users (email, password) VALUES (?, ?)");
    $stmt->execute([$email, $password]);
    echo "Admin user created: {$email}\n";
}
