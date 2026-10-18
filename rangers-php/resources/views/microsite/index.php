<?php
$config = require __DIR__ . '/../../../config/app.php';
$whatsappUrl = "https://wa.me/" . preg_replace('/[^0-9]/', '', $config['default_whatsapp']) . "?text=" . urlencode("Hello Rangers Safety Systems LLC, I am visiting your WETEX 2026 booth and would like to chat with your sales team regarding PPE & industrial gear.");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WETEX 2026 Mobile Micro-Site | Rangers Safety Systems LLC</title>
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
<body class="bg-[#202522] text-white font-sans min-h-screen flex flex-col items-center justify-between py-8 px-4">
    <!-- Top Utility Controls -->
    <div class="w-full max-w-md flex items-center justify-between mb-4 px-2">
        <div class="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#F8971D]">
            <span class="w-2 h-2 rounded-full bg-[#438B3E] animate-pulse"></span>
            <span>WETEX 2026 Booth Portal</span>
        </div>
        <a href="/" class="text-xs font-semibold text-stone-300 hover:text-white bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
            &larr; Full Website
        </a>
    </div>

    <!-- Main Portrait Card (Linktree / Carrd.co Style) -->
    <div class="w-full max-w-md bg-[#181C19] border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <!-- 2. Header Section -->
        <div class="flex flex-col items-center text-center space-y-3 pb-6 border-b border-stone-800">
            <div class="bg-white p-3 rounded-xl shadow-md max-w-[260px] w-full text-[#1E4378] font-heading font-black text-xl tracking-tight">
                <span class="text-[#F8971D]">RANGERS</span> SAFETY SYSTEMS
            </div>
            <div>
                <h1 class="text-base sm:text-lg font-heading font-black tracking-tight text-white">
                    Premium Industrial Safety Gear &amp; PPE.
                </h1>
                <p class="text-xs font-mono text-[#F8971D] font-bold mt-0.5">
                    EST. 1996 • DUBAI, UNITED ARAB EMIRATES
                </p>
            </div>
        </div>

        <!-- 3. Welcome Message -->
        <div class="space-y-3.5 text-xs sm:text-[13px] leading-relaxed text-stone-300 text-justify">
            <p class="text-amber-400 font-semibold">
                For three decades, Rangers Safety Systems LLC has been the UAE’s trusted name in occupational health and safety.
            </p>
            <p>
                Since our establishment in 1996, Rangers Safety Systems LLC has been a proud UAE-based company at the forefront of occupational health and safety. Committed to safeguarding lives and elevating workplace standards, we serve both government and private organisations across the GCC region through our exclusive product range.
            </p>
            <p>
                As a bootstrapped venture from the outset, our journey is a testament to resilience and unwavering dedication. We take pride in being a local entity that contributes to the UAE's economic growth while also providing valuable job opportunities for our community.
            </p>
            <p>
                With our expertise and dedication to your needs, we ensure the well-being of every worker.
            </p>
            <p class="text-emerald-400 font-medium">
                Experience safety redefined with Rangers Safety Systems LLC. Connect with us today to embark on a journey towards a secure and prosperous future.
            </p>
        </div>

        <!-- 4. Action Buttons -->
        <div class="space-y-3.5 pt-2 pb-6 border-b border-stone-800">
            <!-- Button 1 (Amber): Safety Shoes -->
            <a href="/catalogue?section=shoes" class="w-full bg-[#F8971D] hover:bg-[#e0840e] text-white font-heading font-black text-sm px-5 py-4 rounded-xl shadow-lg flex items-center justify-between">
                <div>
                    <div class="font-bold">View Digital Catalogue – Safety Shoes</div>
                    <div class="text-[11px] text-amber-100 font-mono font-medium">EN ISO 20345:2022 Certified Boots &amp; Shoes</div>
                </div>
                <span>&rarr;</span>
            </a>

            <!-- Button 2 (Amber): Uniforms & Garments -->
            <a href="/catalogue?section=garments" class="w-full bg-[#F8971D] hover:bg-[#e0840e] text-white font-heading font-black text-sm px-5 py-4 rounded-xl shadow-lg flex items-center justify-between">
                <div>
                    <div class="font-bold">View Digital Catalogue – Uniforms &amp; Garments</div>
                    <div class="text-[11px] text-amber-100 font-mono font-medium">100% Cotton &amp; Fire-Retardant Workwear</div>
                </div>
                <span>&rarr;</span>
            </a>

            <!-- Button 3 (Sage Green): Request Corporate Quote -->
            <a href="/quote" class="w-full bg-[#8B9876] hover:bg-[#7a8766] border border-[#8B9876] text-white font-heading font-bold text-sm px-5 py-3.5 rounded-xl shadow-md flex items-center justify-between">
                <div>
                    <div class="font-bold">Request a Corporate Quote</div>
                    <div class="text-[11px] text-stone-200 font-mono font-normal">B2B Pricing, Samples &amp; Tenders</div>
                </div>
                <span>&rarr;</span>
            </a>

            <!-- Button 4 (WhatsApp Style): Chat with Sales on WhatsApp -->
            <a href="<?= htmlspecialchars($whatsappUrl) ?>" target="_blank" rel="noopener noreferrer" class="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-heading font-bold text-sm px-5 py-3.5 rounded-xl shadow-md flex items-center justify-between">
                <div>
                    <div class="font-bold">Chat with Sales on WhatsApp</div>
                    <div class="text-[11px] text-emerald-100 font-mono font-normal">Instant Response from Jebel Ali Desk</div>
                </div>
                <span>&rarr;</span>
            </a>
        </div>

        <!-- 5. Rotating Banner: Testimonials from Google Reviews -->
        <div class="pt-2">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-mono font-bold uppercase text-stone-300">Customer Testimonials</span>
                <span class="text-amber-400 text-xs">★★★★★</span>
            </div>
            <div class="bg-stone-900 border border-stone-800 p-4 rounded-xl text-xs space-y-2">
                <p class="italic text-stone-300">
                    "Rangers Safety Systems LLC has been our trusted PPE partner for over 5 years. Their EN ISO certified safety shoes and high-heat 100% cotton coveralls withstand extreme UAE summer conditions without fail. Exceptional promptness and ready local stock in Jebel Ali."
                </p>
                <div class="text-[11px] text-stone-400 pt-1 border-t border-stone-800 flex items-center justify-between">
                    <strong>Tariq Al Mansoori</strong>
                    <span>Dubai Infrastructure &amp; Contracting LLC</span>
                </div>
            </div>
            <div class="text-center mt-2">
                <a href="https://www.google.com/maps/search/Rangers+Safety+Systems+LLC+Dubai" target="_blank" class="text-[11px] text-blue-400 hover:underline">
                    View verified Google Reviews &rarr;
                </a>
            </div>
        </div>
    </div>

    <!-- 5. Footer & Legal (All on one line as strictly requested in brief) -->
    <footer class="w-full max-w-4xl text-center mt-8 px-4">
        <p class="text-[11px] sm:text-xs font-mono font-medium text-stone-400">
            Rangers Safety Systems LLC | TRN: <?= htmlspecialchars($config['default_trn']) ?> | <?= htmlspecialchars($config['default_address']) ?>
        </p>
    </footer>
</body>
</html>
