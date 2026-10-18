<?php
$config = require __DIR__ . '/../../../config/app.php';
$activePage = $activePage ?? 'home';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle ?? $config['name']) ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        sage: '#8B9876',
                        amber: '#F8971D',
                        brandGreen: '#438B3E',
                        brandBlue: '#1E4378',
                        charcoal: '#202522'
                    },
                    fontFamily: {
                        sans: ['Roboto', 'sans-serif'],
                        heading: ['Montserrat', 'sans-serif'],
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-[#F5F6F2] text-[#303630] font-sans min-h-screen flex flex-col">
    <!-- Utility Banner -->
    <div class="bg-[#202522] text-white text-xs py-1.5 px-4 hidden md:block border-b border-stone-800">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-4 text-stone-300">
                <span class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-[#438B3E] animate-pulse"></span>
                    <?= htmlspecialchars($config['event_name']) ?> Showcase
                </span>
                <span>|</span>
                <span>Jebel Ali Industrial First, Dubai</span>
                <span>|</span>
                <span>TRN: <?= htmlspecialchars($config['default_trn']) ?></span>
            </div>
            <div class="flex items-center gap-4 text-stone-300">
                <a href="tel:<?= htmlspecialchars($config['default_phone']) ?>" class="hover:text-amber-400 font-mono">
                    <?= htmlspecialchars($config['default_phone']) ?>
                </a>
                <a href="/microsite" class="text-amber-400 hover:text-white font-bold flex items-center gap-1">
                    📱 Mobile Micro-Site
                </a>
                <a href="/admin" class="text-stone-400 hover:text-white">Admin</a>
            </div>
        </div>
    </div>

    <!-- Navigation -->
    <header class="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <a href="/" class="flex items-center gap-3">
                    <div class="font-heading font-black text-xl tracking-tight text-[#1E4378]">
                        <span class="text-[#F8971D]">RANGERS</span> SAFETY SYSTEMS
                    </div>
                </a>
                
                <nav class="hidden md:flex items-center gap-6 text-sm font-semibold">
                    <a href="/" class="<?= $activePage === 'home' ? 'text-[#1E4378] border-b-2 border-[#1E4378]' : 'text-stone-700 hover:text-[#1E4378]' ?> py-1">Home</a>
                    <a href="/products" class="<?= $activePage === 'products' ? 'text-[#1E4378] border-b-2 border-[#1E4378]' : 'text-stone-700 hover:text-[#1E4378]' ?> py-1">Products Catalogue</a>
                    <a href="/catalogue" class="<?= $activePage === 'catalogue' ? 'text-[#1E4378] border-b-2 border-[#1E4378]' : 'text-stone-700 hover:text-[#1E4378]' ?> py-1">Digital Booklet</a>
                    <a href="/contact" class="<?= $activePage === 'contact' ? 'text-[#1E4378] border-b-2 border-[#1E4378]' : 'text-stone-700 hover:text-[#1E4378]' ?> py-1">Contact</a>
                    <a href="/microsite" class="bg-emerald-50 text-[#438B3E] border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-[#F8971D] animate-ping"></span>
                        Booth Micro-Site
                    </a>
                </nav>

                <div>
                    <a href="/quote" class="bg-[#F8971D] hover:bg-[#e0840e] text-white font-bold text-xs uppercase px-4 py-2.5 rounded shadow transition-all">
                        Request Quote
                    </a>
                </div>
            </div>
        </div>
    </header>
    <main class="flex-1">
