<?php
$config = require __DIR__ . '/../../../config/app.php';
?>
    </main>
    <footer class="bg-[#181C19] text-stone-300 border-t border-stone-800 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="space-y-3">
                    <div class="font-heading font-black text-lg text-white">
                        <span class="text-[#F8971D]">RANGERS</span> SAFETY SYSTEMS LLC
                    </div>
                    <p class="text-xs text-stone-400 leading-relaxed">
                        Trusted UAE manufacturer and supplier of certified occupational safety gear, protective footwear, and industrial uniforms since 1996.
                    </p>
                    <div class="text-xs text-stone-300 space-y-1 pt-2">
                        <p>📍 <?= htmlspecialchars($config['default_address']) ?></p>
                        <p>📞 <?= htmlspecialchars($config['default_phone']) ?></p>
                        <p>✉️ <?= htmlspecialchars($config['default_email']) ?></p>
                    </div>
                </div>

                <div>
                    <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-stone-200 mb-3">Sub-Brands</h4>
                    <ul class="text-xs space-y-2 text-stone-400">
                        <li><strong class="text-[#F8971D]">RANGERS WAQ:</strong> Safety Footwear (EN ISO 20345)</li>
                        <li><strong class="text-[#438B3E]">RANGERS PARADE:</strong> Dual-Certified (EN ISO + ASTM)</li>
                        <li><strong class="text-blue-400">RANGERS WORKWEAR:</strong> 100% Cotton & FR Garments</li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-stone-200 mb-3">Quick Navigation</h4>
                    <ul class="text-xs space-y-2 text-stone-400">
                        <li><a href="/products" class="hover:text-white">Product Catalogue</a></li>
                        <li><a href="/catalogue" class="hover:text-white">12-Page Master Digital Booklet</a></li>
                        <li><a href="/quote" class="hover:text-white text-[#F8971D]">Request Corporate Quotation</a></li>
                        <li><a href="/microsite" class="hover:text-white">WETEX 2026 QR Landing Page</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-stone-200 mb-3">Exhibition Hub</h4>
                    <div class="bg-stone-900 border border-stone-800 p-3 rounded text-xs space-y-2">
                        <span class="inline-block bg-[#438B3E] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            WETEX 2026 DUBAI
                        </span>
                        <p class="text-stone-400">
                            TRN: <strong class="text-stone-200"><?= htmlspecialchars($config['default_trn']) ?></strong>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Legal One-Liner as required by brief -->
            <div class="mt-8 pt-6 border-t border-stone-800 text-center text-xs text-stone-400 font-mono">
                Rangers Safety Systems LLC | TRN: <?= htmlspecialchars($config['default_trn']) ?> | <?= htmlspecialchars($config['default_address']) ?>
            </div>
        </div>
    </footer>
</body>
</html>
