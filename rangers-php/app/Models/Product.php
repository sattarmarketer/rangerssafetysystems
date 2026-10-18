<?php
namespace App\Models;

use App\Services\Database;
use PDO;

class Product {
    public static function allPublished(): array {
        $db = Database::getConnection();
        $stmt = $db->query("SELECT p.*, c.name as category_name, c.slug as category_slug 
                            FROM products p 
                            JOIN categories c ON p.category_id = c.id 
                            WHERE p.is_published = 1 
                            ORDER BY p.id ASC");
        return $stmt->fetchAll();
    }

    public static function findBySlug(string $slug): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT p.*, c.name as category_name 
                              FROM products p 
                              JOIN categories c ON p.category_id = c.id 
                              WHERE p.slug = :slug AND p.is_published = 1 
                              LIMIT 1");
        $stmt->execute(['slug' => $slug]);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    public static function findByCategory(string $categorySlug): array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT p.*, c.name as category_name 
                              FROM products p 
                              JOIN categories c ON p.category_id = c.id 
                              WHERE c.slug = :slug AND p.is_published = 1 
                              ORDER BY p.id ASC");
        $stmt->execute(['slug' => $categorySlug]);
        return $stmt->fetchAll();
    }

    public static function search(string $query): array {
        $db = Database::getConnection();
        $term = '%' . $query . '%';
        $stmt = $db->prepare("SELECT p.*, c.name as category_name 
                              FROM products p 
                              JOIN categories c ON p.category_id = c.id 
                              WHERE p.is_published = 1 
                              AND (p.name LIKE :q1 OR p.sku LIKE :q2 OR p.brand LIKE :q3 OR p.short_description LIKE :q4 OR p.certifications LIKE :q5) 
                              ORDER BY p.id ASC");
        $stmt->execute([
            'q1' => $term,
            'q2' => $term,
            'q3' => $term,
            'q4' => $term,
            'q5' => $term,
        ]);
        return $stmt->fetchAll();
    }
}
