<?php
/**
 * Rangers Safety Systems LLC — Front Controller
 * PHP 8.2+ Architecture
 */

declare(strict_types=1);

session_start();

// Autoload simulation or Composer autoload
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $base_dir = __DIR__ . '/../app/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

// Load configuration
$appConfig = require __DIR__ . '/../config/app.php';

// Simple Clean Router
$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Basic route mapping
switch ($requestUri) {
    case '/':
    case '/home':
        require __DIR__ . '/../resources/views/home/index.php';
        break;

    case '/products':
        require __DIR__ . '/../resources/views/products/index.php';
        break;

    case '/catalogue':
        require __DIR__ . '/../resources/views/catalogue/index.php';
        break;

    case '/quote':
        require __DIR__ . '/../resources/views/quote/index.php';
        break;

    case '/contact':
        require __DIR__ . '/../resources/views/contact/index.php';
        break;

    case '/microsite':
        require __DIR__ . '/../resources/views/microsite/index.php';
        break;

    case '/admin':
    case '/admin/login':
        require __DIR__ . '/../resources/views/admin/index.php';
        break;

    default:
        http_response_code(404);
        require __DIR__ . '/../resources/views/errors/404.php';
        break;
}
