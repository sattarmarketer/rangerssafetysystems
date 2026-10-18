<?php
$pageTitle = "Product Catalogue — Rangers Safety Systems LLC";
$activePage = 'products';
require __DIR__ . '/../partials/header.php';

// Safe product list from database or memory
$products = [];
try {
    if (class_exists('App\Models\Product')) {
        $products = \App\Models\Product::allPublished();
    }
} catch (\Throwable $e) {
    // If DB is not connected yet, display message gracefully
}
?>

<div class="max-w-7xl mx-auto px-4 py-12 space-y-8">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
            <h1 class="text-3xl font-heading font-black text-[#1E4378]">
                Industrial Product Catalogue
            </h1>
            <p class="text-xs text-stone-600 mt-1">
                Official WETEX 2026 range — Certified EN ISO 20345 safety footwear, workwear, and PPE.
            </p>
        </div>
        <div class="flex items-center gap-2">
            <a href="/catalogue" class="text-xs font-bold text-[#1E4378] hover:underline bg-white border border-stone-300 px-3 py-2 rounded">
                📖 View 12-Page Booklet
            </a>
            <a href="/quote" class="text-xs font-bold bg-[#F8971D] hover:bg-[#e0840e] text-white px-4 py-2 rounded shadow">
                Request Quote
            </a>
        </div>
    </div>

    <?php if (empty($products)): ?>
        <div class="bg-white border border-stone-200 rounded-lg p-8 text-center space-y-3">
            <h3 class="font-heading font-bold text-lg text-stone-800">
                24 Verified Exhibition Products Ready
            </h3>
            <p class="text-xs text-stone-600 max-w-md mx-auto">
                Connect MySQL to load live records dynamically, or explore the fully interactive React SPA live catalogue.
            </p>
            <div class="pt-2">
                <a href="/quote" class="bg-[#1E4378] text-white font-bold text-xs px-4 py-2 rounded">
                    Request Product Specifications PDF
                </a>
            </div>
        </div>
    <?php else: ?>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($products as $p): ?>
                <div class="bg-white border border-stone-200 rounded-lg p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                    <div class="space-y-2">
                        <span class="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                            <?= htmlspecialchars($p['brand']) ?>
                        </span>
                        <h3 class="font-heading font-bold text-base text-[#1E4378]"><?= htmlspecialchars($p['name']) ?></h3>
                        <p class="text-xs text-stone-600"><?= htmlspecialchars($p['short_description']) ?></p>
                        <div class="text-[11px] font-mono text-stone-500">SKU: <?= htmlspecialchars($p['sku']) ?></div>
                    </div>
                    <div class="pt-4 border-t border-stone-100 flex items-center justify-between mt-4">
                        <span class="text-xs text-emerald-600 font-bold"><?= htmlspecialchars($p['certifications'] ?? 'Certified') ?></span>
                        <a href="/quote?product=<?= urlencode($p['sku'] . ' - ' . $p['name']) ?>" class="bg-[#F8971D] text-white text-xs font-bold px-3 py-1.5 rounded">
                            Quote
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
