<?php
$pageTitle = "Admin CMS Portal — Rangers Safety Systems LLC";
$activePage = 'admin';
$config = require __DIR__ . '/../../../config/app.php';
require __DIR__ . '/../partials/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    {/* Header & Quick Status */}
    <div className="bg-[#202522] text-white p-6 rounded-2xl border border-stone-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1E4378] flex items-center justify-center text-white font-black text-xl ring-2 ring-[#438B3E]/50">
                RS
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-heading font-black">
                        Rangers Safety Systems — Master CMS Portal
                    </h1>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#438B3E]/20 text-[#438B3E] border border-[#438B3E]/40">
                        PHP 8.2 + MySQL
                    </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                    Centralized Administration, Original Product Asset Integrity &amp; Quotation Engine
                </p>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <a href="/" target="_blank" class="px-4 py-2 rounded-xl bg-[#1E4378] hover:bg-[#16325c] text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-2">
                <span>View Public Site</span>
                <span>↗</span>
            </a>
            <a href="/microsite" target="_blank" class="px-4 py-2 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 text-xs font-bold shadow-md transition-colors flex items-center gap-2">
                <span>WETEX 2026 QR Micro</span>
                <span>📱</span>
            </a>
        </div>
    </div>

    {/* Metric Overview Cards */}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white border border-stone-200 p-5 rounded-xl shadow-xs">
            <span class="text-stone-500 text-[11px] font-mono uppercase">Verified Products</span>
            <p class="text-3xl font-heading font-black text-[#1E4378] mt-1">24</p>
            <p class="text-[10px] text-emerald-600 font-semibold mt-1">100% EN ISO Certified</p>
        </div>
        <div class="bg-white border border-stone-200 p-5 rounded-xl shadow-xs">
            <span class="text-stone-500 text-[11px] font-mono uppercase">Approved Categories</span>
            <p class="text-3xl font-heading font-black text-[#438B3E] mt-1">3</p>
            <p class="text-[10px] text-stone-500 mt-1">Footwear, Workwear, PPE</p>
        </div>
        <div class="bg-white border border-stone-200 p-5 rounded-xl shadow-xs">
            <span class="text-stone-500 text-[11px] font-mono uppercase">Catalogue Pages</span>
            <p class="text-3xl font-heading font-black text-[#F8971D] mt-1">12</p>
            <p class="text-[10px] text-stone-500 mt-1">WETEX 2026 Master Booklet</p>
        </div>
        <div class="bg-white border border-stone-200 p-5 rounded-xl shadow-xs">
            <span class="text-stone-500 text-[11px] font-mono uppercase">Security &amp; Database</span>
            <p class="text-3xl font-heading font-black text-stone-900 mt-1">PDO</p>
            <p class="text-[10px] text-emerald-600 font-semibold mt-1">HMAC CSRF / Active</p>
        </div>
    </div>

    {/* Complete 21 Tools Architecture List */}
    <div class="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
        <div class="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h3 class="font-heading font-bold text-base text-stone-900">
                21 Central CMS Control Modules Implemented
            </h3>
            <span class="text-xs font-mono font-bold text-[#F8971D] bg-amber-50 px-2 py-0.5 rounded">
                Fully Operational
            </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">01.</span>
                <span class="font-semibold text-stone-800">Dashboard Overview</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">02.</span>
                <span class="font-semibold text-stone-800">Website Customizer</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">03.</span>
                <span class="font-semibold text-stone-800">Page Manager</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">04.</span>
                <span class="font-semibold text-stone-800">Header &amp; Navigation</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">05.</span>
                <span class="font-semibold text-stone-800">Homepage / Hero Section</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">06.</span>
                <span class="font-semibold text-stone-800">Website Sections</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">07.</span>
                <span class="font-semibold text-stone-800">Product Categories</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">08.</span>
                <span class="font-semibold text-stone-800">Product Management</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">09.</span>
                <span class="font-semibold text-stone-800">Product Images &amp; Galleries</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">10.</span>
                <span class="font-semibold text-stone-800">Catalogue Management</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">11.</span>
                <span class="font-semibold text-stone-800">Quote Requests (RFQ)</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">12.</span>
                <span class="font-semibold text-stone-800">Contact &amp; WhatsApp Settings</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">13.</span>
                <span class="font-semibold text-stone-800">Google Reviews</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">14.</span>
                <span class="font-semibold text-stone-800">Footer Settings</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">15.</span>
                <span class="font-semibold text-stone-800">Branding &amp; Theme</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">16.</span>
                <span class="font-semibold text-stone-800">Media Library</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">17.</span>
                <span class="font-semibold text-stone-800">SEO Settings</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">18.</span>
                <span class="font-semibold text-stone-800">Admin Profile &amp; Security</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">19.</span>
                <span class="font-semibold text-stone-800">Website Preview</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-[#F8971D] font-bold">20.</span>
                <span class="font-semibold text-stone-800">System Settings</span>
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                <span class="font-mono text-red-500 font-bold">21.</span>
                <span class="font-semibold text-red-600">Secure Logout</span>
            </div>
        </div>
    </div>

    {/* Database Deployment SQL Guide */}
    <div class="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
        <h3 class="font-heading font-bold text-base text-stone-900">
            MySQL Database Deployment &amp; LAMP/LEMP Instructions
        </h3>
        <p class="text-xs text-stone-600 leading-relaxed">
            All SQL relational tables, constraints, admin account seeds, 24 verified products, media items, and CMS schemas are located in <code class="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-800">database/database.sql</code>.
            Execute the import command on your host:
        </p>
        <pre class="bg-[#181C19] text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto">mysql -u rangers_user -p rangers_safety_systems &lt; database/database.sql</pre>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
