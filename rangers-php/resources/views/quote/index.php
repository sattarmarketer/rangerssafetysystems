<?php
$pageTitle = "Request a Corporate Quote — Rangers Safety Systems LLC";
$activePage = 'quote';
$config = require __DIR__ . '/../../../config/app.php';
require __DIR__ . '/../partials/header.php';

$initialProduct = $_GET['product'] ?? '';
$success = false;
$ref = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $company = trim($_POST['company_name'] ?? '');
    $contact = trim($_POST['contact_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $country = trim($_POST['country'] ?? 'United Arab Emirates');
    $category = trim($_POST['product_or_category'] ?? '');
    $quantity = trim($_POST['quantity_estimate'] ?? '');
    $sizes = trim($_POST['sizes_needed'] ?? '');
    $notes = trim($_POST['notes'] ?? '');
    $honeypot = trim($_POST['website_url'] ?? '');

    if (empty($honeypot) && !empty($company) && !empty($contact) && !empty($email) && !empty($phone)) {
        $ref = 'RFQ-' . date('Ymd') . '-' . strtoupper(substr(md5(uniqid()), 0, 4));
        $success = true;
    }
}
?>

<div class="max-w-3xl mx-auto px-4 py-12 space-y-8">
    <div class="text-center space-y-2">
        <span class="text-xs font-mono font-bold uppercase text-[#F8971D]">B2B Procurement Support</span>
        <h1 class="text-3xl font-heading font-black text-[#1E4378]">Request a Corporate Quotation</h1>
        <p class="text-xs text-stone-600 max-w-lg mx-auto">
            Direct pricing, volume discounts, and compliance certification packages for UAE & GCC procurement departments.
        </p>
    </div>

    <?php if ($success): ?>
        <div class="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center space-y-3">
            <div class="text-2xl">✅</div>
            <h3 class="font-heading font-bold text-lg text-emerald-900">Quotation Request Received</h3>
            <p class="text-xs text-emerald-800">
                Your reference number is <strong class="font-mono text-sm"><?= htmlspecialchars($ref) ?></strong>. Our Jebel Ali sales team will respond within 4 business hours.
            </p>
            <div class="pt-2">
                <a href="/products" class="text-xs font-bold text-[#1E4378] underline">
                    &larr; Return to Products
                </a>
            </div>
        </div>
    <?php else: ?>
        <form method="POST" action="/quote" class="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
            <!-- Honeypot -->
            <input type="text" name="website_url" class="hidden" tabindex="-1" autocomplete="off">

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-stone-700 mb-1">Company / Organization *</label>
                    <input type="text" name="company_name" required placeholder="e.g. Dubai Contracting LLC" class="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-[#1E4378] outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-stone-700 mb-1">Contact Person *</label>
                    <input type="text" name="contact_name" required placeholder="Full Name" class="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-[#1E4378] outline-none">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-stone-700 mb-1">Corporate Email *</label>
                    <input type="email" name="email" required placeholder="name@company.com" class="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-[#1E4378] outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-stone-700 mb-1">Phone / WhatsApp *</label>
                    <input type="tel" name="phone" required placeholder="+971 50 123 4567" class="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-[#1E4378] outline-none">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-stone-700 mb-1">Country</label>
                    <input type="text" name="country" value="United Arab Emirates" class="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-[#1E4378] outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-stone-700 mb-1">Product or Category</label>
                    <input type="text" name="product_or_category" value="<?= htmlspecialchars($initialProduct) ?>" placeholder="e.g. SS-08 S1P or Safety Shoes" class="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-[#1E4378] outline-none">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-stone-700 mb-1">Estimated Quantity (Pairs / Pcs)</label>
                    <input type="text" name="quantity_estimate" placeholder="e.g. 250 pairs" class="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-[#1E4378] outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-stone-700 mb-1">Sizes Needed</label>
                    <input type="text" name="sizes_needed" placeholder="e.g. EU 40-45" class="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-[#1E4378] outline-none">
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-stone-700 mb-1">Project Details or Requirements</label>
                <textarea name="notes" rows="3" placeholder="Specify certifications, tender deadline, delivery location..." class="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-[#1E4378] outline-none"></textarea>
            </div>

            <div class="pt-2">
                <button type="submit" class="w-full bg-[#F8971D] hover:bg-[#e0840e] text-white font-heading font-black text-xs uppercase py-3 rounded shadow transition-all cursor-pointer">
                    Submit Corporate RFQ
                </button>
            </div>
        </form>
    <?php endif; ?>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
