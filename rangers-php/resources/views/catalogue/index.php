<?php
$pageTitle = "12-Page Digital Exhibition Booklet — Rangers Safety Systems LLC";
$activePage = 'catalogue';
require __DIR__ . '/../partials/header.php';
$section = $_GET['section'] ?? '';
?>

<div class="max-w-5xl mx-auto px-4 py-12 space-y-8">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
            <span class="text-xs font-mono font-bold bg-[#F8971D] text-white px-2.5 py-1 rounded uppercase">
                WETEX 2026 DUBAI
            </span>
            <h1 class="text-3xl font-heading font-black text-[#1E4378] mt-2">
                12-Page Master Digital Catalogue
            </h1>
            <p class="text-xs text-stone-600 mt-1">
                Official exhibition booklet covering safety shoes, workwear, fire-retardant suits, and specialized PPE.
            </p>
        </div>
        <div>
            <a href="/quote?product=2026+Master+Catalogue" class="bg-[#F8971D] hover:bg-[#e0840e] text-white text-xs font-bold px-4 py-2.5 rounded shadow">
                Request Complete Catalogue PDF
            </a>
        </div>
    </div>

    <!-- 12-Page Catalogue Summary Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white border border-stone-200 p-5 rounded-lg shadow-xs space-y-2">
            <span class="text-[10px] font-mono font-bold text-amber-600 uppercase">Page 01</span>
            <h3 class="font-heading font-bold text-base text-[#1E4378]">Catalogue Cover & Exhibition Introduction</h3>
            <p class="text-xs text-stone-600">Official Exhibition 2026 Master Catalogue for WETEX & Utility Procurement.</p>
        </div>
        <div class="bg-white border border-stone-200 p-5 rounded-lg shadow-xs space-y-2">
            <span class="text-[10px] font-mono font-bold text-amber-600 uppercase">Page 02 — Safety Footwear</span>
            <h3 class="font-heading font-bold text-base text-[#1E4378]">Rangers WAQ — SS-08 & SS-12S S1P</h3>
            <p class="text-xs text-stone-600">Composite toe 200J & Kevlar midsole paired with lightweight RBPU/DDPU soles.</p>
        </div>
        <div class="bg-white border border-stone-200 p-5 rounded-lg shadow-xs space-y-2">
            <span class="text-[10px] font-mono font-bold text-amber-600 uppercase">Page 03 — Athletic Footwear</span>
            <h3 class="font-heading font-bold text-base text-[#1E4378]">SS-18 S1P & SS-21 S3 Water Resistant</h3>
            <p class="text-xs text-stone-600">Sandwich lining ventilation, plastic toe 200J, and moisture barrier protection.</p>
        </div>
        <div class="bg-white border border-stone-200 p-5 rounded-lg shadow-xs space-y-2">
            <span class="text-[10px] font-mono font-bold text-amber-600 uppercase">Page 04 — Heavy Duty Construction</span>
            <h3 class="font-heading font-bold text-base text-[#1E4378]">Barton Printed Leather Series (SS-25 & SS-26)</h3>
            <p class="text-xs text-stone-600">Side reflectors, steel midplate 1100N, and rugged construction build.</p>
        </div>
        <div class="bg-white border border-stone-200 p-5 rounded-lg shadow-xs space-y-2">
            <span class="text-[10px] font-mono font-bold text-amber-600 uppercase">Page 07-10 — Dual Standards</span>
            <h3 class="font-heading font-bold text-base text-[#1E4378]">Rangers Parade — EN ISO 20345 + ASTM F2413</h3>
            <p class="text-xs text-stone-600">Electrical insulation footwear (500V-1500V DC) and HRO 300°C contact heat soles.</p>
        </div>
        <div class="bg-white border border-stone-200 p-5 rounded-lg shadow-xs space-y-2">
            <span class="text-[10px] font-mono font-bold text-amber-600 uppercase">Page 12 — Workwear & Garments</span>
            <h3 class="font-heading font-bold text-base text-[#1E4378]">Rangers Workwear — 100% Cotton & FR Suits</h3>
            <p class="text-xs text-stone-600">Coveralls in 160-300 GSM and EN ISO 11611 / 11612 fire retardant protective suits.</p>
        </div>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
