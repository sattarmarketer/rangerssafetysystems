<?php
namespace App\Models;

use App\Services\Database;
use PDO;

class QuoteRequest {
    public static function create(array $data): string {
        $db = Database::getConnection();

        // Generate unique reference
        $reference = 'RSS-' . date('Y') . '-' . random_int(100000, 999999);

        $stmt = $db->prepare("INSERT INTO quote_requests 
            (reference_number, company_name, contact_name, email, phone, country, product_or_category, estimated_quantity, specifications, requirements, status, ip_address, created_at)
            VALUES 
            (:ref, :company, :contact, :email, :phone, :country, :product, :quantity, :specs, :reqs, 'New', :ip, NOW())");

        $stmt->execute([
            'ref' => $reference,
            'company' => htmlspecialchars($data['company_name']),
            'contact' => htmlspecialchars($data['contact_name']),
            'email' => filter_var($data['email'], FILTER_SANITIZE_EMAIL),
            'phone' => htmlspecialchars($data['phone']),
            'country' => htmlspecialchars($data['country']),
            'product' => htmlspecialchars($data['product_or_category']),
            'quantity' => htmlspecialchars($data['estimated_quantity'] ?? ''),
            'specs' => htmlspecialchars($data['specifications'] ?? ''),
            'reqs' => htmlspecialchars($data['requirements']),
            'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
        ]);

        return $reference;
    }

    public static function all(): array {
        $db = Database::getConnection();
        $stmt = $db->query("SELECT * FROM quote_requests ORDER BY id DESC");
        return $stmt->fetchAll();
    }
}
