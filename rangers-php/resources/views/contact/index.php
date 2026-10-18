<?php
$pageTitle = "Contact & Location — Rangers Safety Systems LLC";
$activePage = 'contact';
$config = require __DIR__ . '/../../../config/app.php';
require __DIR__ . '/../partials/header.php';
?>

<div class="max-w-5xl mx-auto px-4 py-12 space-y-10">
    <div class="border-b border-stone-200 pb-6">
        <h1 class="text-3xl font-heading font-black text-[#1E4378]">
            Contact Rangers Safety Systems LLC
        </h1>
        <p class="text-xs text-stone-600 mt-1">
            Headquarters & Distribution Centre in Jebel Ali, Dubai, United Arab Emirates.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 class="font-heading font-bold text-lg text-stone-900 border-b border-stone-100 pb-3">
                Corporate Address &amp; Registration
            </h3>
            
            <div class="space-y-3 text-xs text-stone-700">
                <div>
                    <span class="font-bold text-stone-500 block uppercase font-mono text-[10px]">Head Office & Warehouse</span>
                    <p class="font-semibold text-stone-900 mt-0.5"><?= htmlspecialchars($config['default_address']) ?></p>
                    <p class="text-stone-500">Jebel Ali Freezone & Industrial First, Dubai, UAE</p>
                </div>

                <div>
                    <span class="font-bold text-stone-500 block uppercase font-mono text-[10px]">Tax Registration Number (TRN)</span>
                    <p class="font-mono font-bold text-stone-900 mt-0.5"><?= htmlspecialchars($config['default_trn']) ?></p>
                </div>

                <div>
                    <span class="font-bold text-stone-500 block uppercase font-mono text-[10px]">Direct Telephone</span>
                    <p class="font-mono font-bold text-stone-900 mt-0.5">
                        <a href="tel:<?= htmlspecialchars($config['default_phone']) ?>" class="hover:text-[#1E4378]">
                            <?= htmlspecialchars($config['default_phone']) ?>
                        </a>
                    </p>
                </div>

                <div>
                    <span class="font-bold text-stone-500 block uppercase font-mono text-[10px]">Official Inquiries</span>
                    <p class="font-mono text-stone-900 mt-0.5">
                        <a href="mailto:<?= htmlspecialchars($config['default_email']) ?>" class="hover:text-[#1E4378]">
                            <?= htmlspecialchars($config['default_email']) ?>
                        </a>
                    </p>
                </div>
            </div>
        </div>

        <div class="bg-stone-900 border border-stone-800 text-white rounded-xl p-6 shadow-sm space-y-4">
            <span class="text-xs font-mono font-bold text-emerald-400 uppercase">
                Exhibition Delegation Desk
            </span>
            <h3 class="font-heading font-bold text-lg">
                Meeting at WETEX 2026?
            </h3>
            <p class="text-xs text-stone-300 leading-relaxed">
                Connect with our technical engineers at the exhibition booth for product sizing, technical data sheets, and custom manufacturing consultations for your workforce.
            </p>
            <div class="pt-2">
                <a href="/quote" class="inline-block bg-[#F8971D] hover:bg-[#e0840e] text-white text-xs font-bold uppercase px-4 py-2.5 rounded shadow">
                    Book Corporate Consultation
                </a>
            </div>
        </div>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
