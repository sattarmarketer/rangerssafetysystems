<?php
$pageTitle = "Rangers Safety Systems LLC — Industrial Safety Gear & PPE | Dubai, UAE";
$activePage = 'home';
require __DIR__ . '/../partials/header.php';
?>

<!-- Hero Section -->
<section class="bg-[#202522] text-white py-16 px-4 border-b border-stone-800">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
            <span class="inline-block bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full text-xs font-mono font-bold">
                WETEX 2026 Dubai Exhibition Showcase
            </span>
            <p class="text-[#F8971D] font-mono text-xs font-bold tracking-widest uppercase">
                RANGERS SAFETY SYSTEMS LLC
            </p>
            <h1 class="text-3xl sm:text-5xl font-heading font-black leading-tight">
                PROTECTING THE REGION'S WORKFORCE
            </h1>
            <p class="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Certified head-to-toe PPE, industrial safety shoes, combat boots, and high-heat workwear engineered for government utilities, energy contractors, and GCC infrastructure.
            </p>
            
            <div class="flex flex-wrap gap-3 pt-2">
                <a href="/catalogue" class="bg-[#1E4378] hover:bg-[#16335d] text-white font-bold text-xs uppercase px-5 py-3 rounded shadow">
                    📖 12-Page Master Catalogue
                </a>
                <a href="/quote" class="bg-[#F8971D] hover:bg-[#e0840e] text-white font-bold text-xs uppercase px-5 py-3 rounded shadow">
                    📋 Request Corporate Quote
                </a>
                <a href="/microsite" class="bg-[#8B9876] hover:bg-[#7a8766] text-white font-bold text-xs uppercase px-5 py-3 rounded shadow">
                    📱 Mobile Micro-Site (QR View)
                </a>
            </div>
        </div>

        <div class="lg:col-span-5 bg-stone-900 border border-stone-800 p-6 rounded-xl space-y-4">
            <h3 class="font-heading font-bold text-sm uppercase text-amber-400 tracking-wider">
                Key Technical Strengths
            </h3>
            <div class="space-y-3 text-xs text-stone-300">
                <div class="flex items-start gap-2.5">
                    <span class="text-emerald-400 font-bold">✓</span>
                    <div><strong>EN ISO 20345:2022:</strong> 200J Impact & 1100N puncture certified footwear</div>
                </div>
                <div class="flex items-start gap-2.5">
                    <span class="text-emerald-400 font-bold">✓</span>
                    <div><strong>Dual Standards:</strong> EN ISO + ASTM F2413 Electrical & Mining boots</div>
                </div>
                <div class="flex items-start gap-2.5">
                    <span class="text-emerald-400 font-bold">✓</span>
                    <div><strong>Heat Stress Garments:</strong> 160–300 GSM breathable cotton & EN ISO 11612 FR suits</div>
                </div>
                <div class="flex items-start gap-2.5">
                    <span class="text-emerald-400 font-bold">✓</span>
                    <div><strong>Local UAE Inventory:</strong> Fast delivery from Jebel Ali Industrial First warehouse</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Product Category Overview -->
<section class="max-w-7xl mx-auto px-4 py-16 space-y-10">
    <div class="text-center space-y-2">
        <h2 class="font-heading font-black text-2xl sm:text-3xl text-[#202522]">
            Certified Industrial Range
        </h2>
        <p class="text-xs text-stone-600 max-w-xl mx-auto">
            Explore our specialized sub-brands designed for high-stress industrial environments.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white border border-stone-200 rounded-lg p-6 shadow-sm flex flex-col justify-between">
            <div class="space-y-2">
                <span class="text-xs font-mono font-bold text-[#F8971D] uppercase">Rangers WAQ</span>
                <h3 class="font-heading font-bold text-lg text-[#1E4378]">Safety Footwear & Boots</h3>
                <p class="text-xs text-stone-600">
                    S1P, S3, Barton split leather, microfiber athletic shoes, and 7"/8" tactical rigger boots.
                </p>
            </div>
            <a href="/products?category=safety-footwear" class="mt-4 text-xs font-bold text-[#1E4378] hover:underline">
                Explore 16 Models &rarr;
            </a>
        </div>

        <div class="bg-white border border-stone-200 rounded-lg p-6 shadow-sm flex flex-col justify-between">
            <div class="space-y-2">
                <span class="text-xs font-mono font-bold text-[#438B3E] uppercase">Rangers Workwear</span>
                <h3 class="font-heading font-bold text-lg text-[#1E4378]">Garments & High-Vis</h3>
                <p class="text-xs text-stone-600">
                    60/40 polycotton coveralls, 100% cotton sets, and EN ISO 11611/11612 fire retardant protective suits.
                </p>
            </div>
            <a href="/products?category=workwear" class="mt-4 text-xs font-bold text-[#1E4378] hover:underline">
                Explore Workwear &rarr;
            </a>
        </div>

        <div class="bg-white border border-stone-200 rounded-lg p-6 shadow-sm flex flex-col justify-between">
            <div class="space-y-2">
                <span class="text-xs font-mono font-bold text-blue-500 uppercase">Rangers Safety</span>
                <h3 class="font-heading font-bold text-lg text-[#1E4378]">Head-to-Toe PPE</h3>
                <p class="text-xs text-stone-600">
                    Certified safety helmets, eyewear, ear protection, and electrical utility safety accessories.
                </p>
            </div>
            <a href="/products?category=safety-gear" class="mt-4 text-xs font-bold text-[#1E4378] hover:underline">
                Explore PPE &rarr;
            </a>
        </div>
    </div>
</section>

<?php require __DIR__ . '/../partials/footer.php'; ?>
