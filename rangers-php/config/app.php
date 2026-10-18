<?php
/**
 * Application Configuration
 * Rangers Safety Systems LLC
 */

return [
    'name' => getenv('APP_NAME') ?: 'Rangers Safety Systems LLC',
    'env' => getenv('APP_ENV') ?: 'production',
    'debug' => (bool)(getenv('APP_DEBUG') ?: false),
    'url' => getenv('APP_URL') ?: 'http://localhost:8000',
    'timezone' => 'Asia/Dubai',
    
    // Exhibition Specific
    'event_name' => 'WETEX 2026 Dubai',
    'exhibition_tagline' => 'Protecting the Region\'s Workforce',
    
    // Default Contacts
    'default_email' => 'info@rangers-safety.com',
    'default_phone' => '+971 4 244 5408',
    'default_whatsapp' => '+97142445408',
    'default_trn' => '100391707500003',
    'default_address' => 'Unit SH01, Street 57, Jebel Ali Industrial First, Dubai 50791, United Arab Emirates',
];
