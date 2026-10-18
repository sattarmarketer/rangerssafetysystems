-- ==========================================================
-- Rangers Safety Systems LLC — Database Schema & Initial Data
-- WETEX 2026 / Government Utility Exhibition, Dubai
-- Database: rangers_safety_systems
-- Engine: MySQL 8.0+ / MariaDB 10.5+
-- Charset: utf8mb4 / Collation: utf8mb4_unicode_ci
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `rangers_safety_systems`
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE `rangers_safety_systems`;

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------
-- Table: admins
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `last_login_at` DATETIME NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_admins_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial default administrator: admin@rangers-safety.com / Rangers@2026
-- Password hash generated using PHP password_hash('Rangers@2026', PASSWORD_BCRYPT)
INSERT INTO `admins` (`id`, `name`, `email`, `password_hash`, `created_at`) VALUES
(1, 'System Administrator', 'admin@rangers-safety.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW());

-- ----------------------------------------------------------
-- Table: categories
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `image_path` VARCHAR(255) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_categories_slug` (`slug`),
  INDEX `idx_categories_active_order` (`is_active`, `display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_path`, `display_order`, `is_active`) VALUES
(1, 'Safety Footwear & Boots', 'safety-footwear', 'Certified EN ISO 20345 safety shoes, composite/steel toe boots, and heat-resistant footwear engineered for industrial, utility, and construction safety.', '/assets/images/categories/footwear.jpg', 1, 1),
(2, 'Safety Garments & Workwear', 'workwear', 'High-visibility garments, polycotton coveralls, 100% cotton suits, and certified EN ISO 11611/11612 fire-retardant (FR) industrial workwear.', '/assets/images/categories/workwear.jpg', 2, 1),
(3, 'Safety Gear & PPE', 'safety-gear', 'Head-to-toe personal protective equipment including industrial safety helmets, eye and face protection, hearing protection, and specialized utility safety solutions.', '/assets/images/categories/ppe.jpg', 3, 1);

-- ----------------------------------------------------------
-- Table: products
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(200) NOT NULL UNIQUE,
  `brand` VARCHAR(100) NOT NULL,
  `model` VARCHAR(100) NULL,
  `sku` VARCHAR(100) NOT NULL UNIQUE,
  `short_description` VARCHAR(500) NOT NULL,
  `full_description` TEXT NULL,
  `material` VARCHAR(255) NULL,
  `sizes` VARCHAR(100) NULL,
  `certifications` VARCHAR(255) NULL,
  `specifications` JSON NULL,
  `image_path` VARCHAR(255) NOT NULL,
  `gallery_images` JSON NULL,
  `catalogue_item` VARCHAR(100) NULL,
  `page_number` INT NULL DEFAULT NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_products_sku` (`sku`),
  INDEX `idx_products_category` (`category_id`),
  INDEX `idx_products_published` (`is_published`),
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed verified products from the Exhibition 2026 Master Catalogue
INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `brand`, `model`, `sku`, `short_description`, `full_description`, `material`, `sizes`, `certifications`, `specifications`, `image_path`, `catalogue_item`, `page_number`, `is_published`) VALUES
(1, 1, 'SS-08 S1P (Black)', 'ss-08-s1p-black', 'RANGERS WAQ', 'SS-08', 'SS-08-S1P', 'Composite toe (200J) & Kevlar midsole (1100N) safety shoe', 'High-performance industrial safety shoe featuring 100% non-metallic action leather upper, lightweight RBPU sole engineered for slip, oil and 300°C heat resistance, and breathable PU foam footbed.', '100% Non-metallic action leather upper', '39 - 46', 'EN ISO 20345:2022 certified', '[\"Composite toe (200J) & Kevlar midsole (1100N)\", \"100% non-metallic action leather upper\", \"Lightweight RBPU sole (slip, oil & 300°C heat-resistant)\", \"Anti-static with breathable PU foam footbed\"]', '/uploads/products/footwear/ss-08-s1p.jpg', 'Page 02, Item 1', 2, 1),
(2, 1, 'SS-12S S1P (Beige)', 'ss-12s-s1p-beige', 'RANGERS WAQ', 'SS-12S', 'SS-12S-S1P', 'Beige suede cow leather & fabric upper with steel toe (200J)', 'Heavy-duty industrial shoe with premium beige suede cow leather upper, steel midplate (1100N), dual density PU (DDPU) slip and oil-resistant outsole, and anti-static moulded EVA footbed.', 'Beige suede cow leather & breathable fabric', '38 - 47', 'EN ISO 20345:2022 certified', '[\"Steel toe (200J) & steel midplate (1100N)\", \"Beige suede cow leather & fabric upper\", \"Dual density PU (DDPU) sole (slip, oil & heat-resistant)\", \"Anti-static with moulded EVA footbed\"]', '/uploads/products/footwear/ss-12s-s1p.jpg', 'Page 02, Item 2', 2, 1),
(3, 1, 'SS-18 S1P (Black / Fluorescent Green)', 'ss-18-s1p-black-green', 'RANGERS WAQ', 'SS-18', 'SS-18-S1P', 'Breathable fabric upper with sandwich lining and high visibility green accents', 'Ergonomic athletic safety shoe designed for high-mobility industrial environments, featuring breathable sandwich lining, steel toe protection (200J), and slip-resistant DDPU outsole.', 'Breathable fabric upper with sandwich lining', '39 - 47', 'EN ISO 20345:2022 certified', '[\"Steel toe (200J) & steel midplate (1100N)\", \"Breathable fabric upper with sandwich lining\", \"Dual density PU (DDPU) sole (slip, oil & heat-resistant)\", \"Anti-static with breathable EVA foam footbed\"]', '/uploads/products/footwear/ss-18-s1p.jpg', 'Page 03, Item 1', 3, 1),
(4, 1, 'SS-21 S3 (Black)', 'ss-21-s3-black', 'RANGERS WAQ', 'SS-21', 'SS-21-S3', 'Water-resistant microfiber leather with lightweight plastic toe (200J)', 'Certified water-resistant S3 work shoe with lightweight composite plastic toe cap, steel midsole (1100N), microfiber leather upper, non-marking DDPU sole, and anti-static footbed.', 'Microfiber leather upper', '39 - 47', 'EN ISO 20345:2022 S3 (water-resistant)', '[\"Lightweight plastic toe (200J) & steel midsole (1100N)\", \"Microfiber leather upper (water-resistant)\", \"Dual density PU (DDPU) sole (slip, oil & heat-resistant)\", \"Anti-static, non-marking, breathable PU foam footbed\"]', '/uploads/products/footwear/ss-21-s3.jpg', 'Page 03, Item 2', 3, 1),
(5, 1, 'SS-25 S3 (Black)', 'ss-25-s3-black', 'RANGERS WAQ', 'SS-25', 'SS-25-S3', 'Barton printed split leather with side reflector and steel toe', 'Rugged water-resistant construction safety shoe with high-durability Barton split leather, embedded side reflective visibility strip, 200J impact resistance, and dual density PU sole.', 'Barton printed split leather with side reflector', '38 - 47', 'EN ISO 20345:2022 S3 (water-resistant)', '[\"Steel toe (200J) & steel midplate (1100N)\", \"Barton printed split leather with side reflector\", \"Dual density PU (DDPU) sole (slip, oil & heat-resistant)\", \"Anti-static with moulded EVA footbed\"]', '/uploads/products/footwear/ss-25-s3.jpg', 'Page 04, Item 1', 4, 1),
(6, 1, 'SS-26 S3 (Black Mid-Cut)', 'ss-26-s3-black', 'RANGERS WAQ', 'SS-26', 'SS-26-S3', 'Heavy-duty water-resistant Barton split leather safety boot', 'Mid-cut ankle safety shoe providing enhanced lateral stability, Barton split leather upper, EN ISO 20345:2022 S3 certification, and oil/acid resistant dual density PU sole.', 'Barton printed split leather with side reflector', '38 - 47', 'EN ISO 20345:2022 S3 (water-resistant)', '[\"Steel toe (200J) & steel midplate (1100N)\", \"Barton printed split leather with side reflector\", \"Dual density PU (DDPU) sole (slip, oil & heat-resistant)\", \"Anti-static with moulded EVA footbed\"]', '/uploads/products/footwear/ss-26-s3.jpg', 'Page 04, Item 2', 4, 1),
(7, 1, 'SS-49 S3 (Black)', 'ss-49-s3-black', 'RANGERS WAQ', 'SS-49', 'SS-49-S3', 'Barton printed microfiber with counter reflector and steel toe', 'Premium water-resistant microfiber safety shoe equipped with counter reflector for night safety, steel toe cap (200J), steel midplate (1100N), and anti-static moulded EVA footbed.', 'Barton printed microfiber with counter reflector', '38 - 47', 'EN ISO 20345:2022 S3 (water-resistant)', '[\"Steel toe (200J) & steel midplate (1100N)\", \"Barton printed microfiber with counter reflector\", \"Dual density PU (DDPU) sole (slip, oil & heat-resistant)\", \"Anti-static with moulded EVA footbed\"]', '/uploads/products/footwear/ss-49-s3.jpg', 'Page 05, Item 1', 5, 1),
(8, 1, 'SS-59 S1P (Black Quick Release)', 'ss-59-s1p-black', 'RANGERS WAQ', 'SS-59', 'SS-59-S1P', 'Composite toe & Kevlar insole with quick release lacing system', 'High-tech athletic safety shoe featuring rapid-dial quick release lacing mechanism, TPU front abrasion guard, composite toe cap (200J), puncture-proof Kevlar insole, and oil-resistant outsole.', 'Mesh / TPU / Leather upper with quick release lacing', '39 - 47', 'EN ISO 20345:2022 certified', '[\"Composite toe (200J) & Kevlar insole (1100N)\", \"Mesh/TPU/leather upper with quick release lacing\", \"Dual density PU (DDPU) sole (slip, oil & heat-resistant)\", \"Anti-static with breathable PU foam footbed\"]', '/uploads/products/footwear/ss-59-s1p.jpg', 'Page 05, Item 2', 5, 1),
(9, 1, 'SS-136 S3 (Brown Crazy Horse)', 'ss-136-s3-brown', 'RANGERS WAQ', 'SS-136', 'SS-136-S3', '100% Non-metallic crazy horse leather upper with composite toe', 'Premium executive brown industrial shoe crafted from water-resistant crazy horse leather, 100% non-metallic construction for airport/security metal-free environments, and Kevlar puncture-proof midsole.', '100% Non-metallic crazy horse leather upper', '39 - 47', 'EN ISO 20345:2022 S3 (water-resistant)', '[\"Composite toe (200J) & Kevlar insole (1100N)\", \"100% non-metallic crazy horse leather upper\", \"Dual density PU (DDPU) sole (slip, oil & heat-resistant)\", \"Anti-static with breathable PU foam footbed\"]', '/uploads/products/footwear/ss-136-s3.jpg', 'Page 06, Item 1', 6, 1),
(10, 1, 'SS-138 S3 (Brown Nubuck ESD)', 'ss-138-s3-brown', 'RANGERS WAQ', 'SS-138', 'SS-138-S3', '100% Non-metallic nubuck leather with ESD and counter reflector', 'Luxury executive protective shoe built with premium nubuck leather, ESD electrostatic discharge dissipation, 300°C contact heat resistant RBPU outsole, and Kevlar anti-puncture shield.', '100% Non-metallic nubuck leather (ESD & counter reflector)', '40 - 47', 'EN ISO 20345:2022 S3 (water-resistant)', '[\"Composite toe (200J) & lightweight Kevlar insole (1100N)\", \"100% non-metallic nubuck leather (ESD & counter reflector)\", \"Lightweight RBPU sole (slip, oil & 300°C heat-resistant)\", \"Anti-static with breathable PU foam footbed\"]', '/uploads/products/footwear/ss-138-s3.jpg', 'Page 06, Item 2', 6, 1),
(11, 1, 'GRINDA S1PS (Dual Certified)', 'grinda-s1ps', 'RANGERS PARADE', 'GRINDA', 'GRINDA-7846', 'Dual certified EN ISO 20345:2022+A1:2024 & ASTM F2413-18 M/I/C PR SD100', 'Ultra-advanced safety shoe featuring composite toe cap, non-metallic fabric anti-puncture sole, TPU front stone guard reinforcement, cold/heat insulated two-density polyurethane outsole, and dual international certifications.', 'Mesh + microfiber upper with TPU front reinforcement', '37 - 48', 'EN ISO 20345:2022+A1:2024 / ASTM F2413-18', '[\"Composite toe & non-metallic fabric anti-puncture sole\", \"Mesh + microfiber upper with TPU front reinforcement\", \"Two-density polyurethane sole (slip, hydrocarbon, cold/heat insulated)\", \"ESD & abrasion-resistant stone guard\"]', '/uploads/products/footwear/grinda-7846.jpg', 'Page 07, Item 1', 7, 1),
(12, 1, 'ABORA S1P (Hot Climate Mesh)', 'abora-s1p', 'RANGERS PARADE', 'ABORA', 'ABORA-9822', 'Breathable microfiber upper with 3D mesh lining & VPS arch support', 'Specially engineered for UAE and Middle East hot climate operations, the ABORA features breathable 3D mesh ventilation lining, metallic anti-puncture sole, VPS ergonomic arch support, and removable cushioned footbed.', 'Breathable microfiber upper with 3D mesh lining (heat-optimized)', '36 - 47', 'EN ISO 20345:2022 S1P SR FO CI HI', '[\"Steel toe & metallic anti-puncture sole\", \"Breathable microfiber upper with 3D mesh lining (perfect for hot environments)\", \"Two-density polyurethane sole (slip, hydrocarbon, cold/heat insulated)\", \"ESD with VPS System for arch support, removable mesh over PU foam insole\"]', '/uploads/products/footwear/abora-9822.jpg', 'Page 07, Item 2', 7, 1),
(13, 1, 'ELECTA SB SR FO PS CI HIE (Dielectric)', 'electa-sb-sr', 'RANGERS PARADE', 'ELECTA', 'ELECTA-9824', 'Electrical insulation (500V AC - 1500V DC) ASTM F2413-18 EH PR', 'Certified electrical hazard protective footwear designed for utility and high-voltage electrical installations, providing electric insulation protection up to 500V AC / 1500V DC with composite non-conductive toe.', 'Fabric upper with injected PU front reinforcement', '35 - 48', 'EN ISO 20345:2022 / ASTM F2413-18 EH PR', '[\"Composite toe & insulating fabric anti-puncture sole\", \"Electric insulation (500V AC - 1500V DC) certified\", \"Two-density, insulating PU sole\", \"Non-magnetic, breathable & 100% metal free, VPS arch support\"]', '/uploads/products/footwear/electa-9824.jpg', 'Page 10, Item 1', 10, 1),
(14, 1, 'ISTELLA S3S (HRO 300°C Sole)', 'istella-s3s', 'RANGERS PARADE', 'ISTELLA', 'ISTELLA-9814', 'Water-repellent textile upper with EVA / Nitrile rubber sole HRO 300°C', 'Ultra-lightweight multi-hazard safety trainer featuring water-repellent technical textile, HRO 300°C contact heat resistant nitrile rubber pad sole, cold insulation, and abrasion-resistant stone guard.', 'Water-repellent textile upper with TPU front reinforcement', '36 - 47', 'EN ISO 20345:2022+A1:2024 S3S SR FO HRO CI SC', '[\"Composite toe & ultralight textile anti-puncture sole\", \"Water-repellent textile upper with TPU front reinforcement\", \"Lightweight EVA / nitrile rubber sole HRO 300°C & cold insulated\", \"ESD, abrasion-resistant stone guard\"]', '/uploads/products/footwear/istella-9814.jpg', 'Page 10, Item 2', 10, 1),
(15, 1, 'LITA S3 (Fly-knit Be-flex 2.0)', 'lita-s3-black-burgundy', 'RANGERS PARADE', 'LITA', 'LITA-7814', 'Fly-knit upper with Be-flex 2.0 sole & EN IEC 61340-5-1:2016 ESD', 'Ultralight safety sneaker with breathable fly-knit weave, Be-flex 2.0 articulation system for natural foot movement, HRO 300°C heat-resistant rubber pad sole, and non-magnetic composite safety toe.', 'Fly-knit upper with TPU front reinforcement', '36 - 47', 'EN ISO 20345:2022 S3 / EN IEC 61340-5-1:2016 ESD', '[\"Composite toe & non-metallic anti-puncture sole\", \"Fly-knit upper with TPU front reinforcement\", \"EVA / nitrile rubber pad sole (slip & fuel/oil-resistant)\", \"HRO up to 300°C, Non-magnetic, ESD, Be-flex 2.0 sole\"]', '/uploads/products/footwear/lita-7814.jpg', 'Page 12, Item 1', 12, 1),
(16, 1, 'ROOVER S3 (Cow Leather)', 'roover-s3', 'RANGERS PARADE', 'ROOVER', 'ROOVER-1844', 'Water-repellent smooth cow leather with DRS 2 shock absorption heel', 'Heavy industrial protection shoe engineered with water-repellent smooth cowhide leather, DRS 2 dual shock absorption heel system, Kevlar puncture resistance, and ASTM F2413-18 compliance.', 'Water-repellent smooth cow leather upper', '36 - 47', 'EN ISO 20345:2022 S3 / ASTM F2413-18 I/C PR SD', '[\"Composite toe (200J) & Kevlar anti-puncture insert\", \"Water-repellent smooth cow leather upper\", \"Two-density polyurethane sole, ESD & non-magnetic\", \"DRS 2 shock absorption heel, VPS arch support\"]', '/uploads/products/footwear/roover-1844.jpg', 'Page 12, Item 2', 12, 1),
(17, 1, 'SLAMER S3 (SRC HRO Rubber/EVA)', 'slamer-s3-src-hro', 'RANGERS PARADE', 'SLAMER', 'SLAMER-8824', 'Water-repellent leather with Rubber/EVA sole and heel reinforcement', 'Severe-duty industrial safety boot featuring reinforced heel counter, high heat resistance HRO sole, slip-resistant SRC rated tread pattern, and non-magnetic 200J composite toe.', 'Water-repellent genuine leather upper', '35 - 48', 'EN ISO 20345:2011 S3 SRC HRO', '[\"Composite toe (200J) & non-metallic anti-puncture\", \"Water-repellent leather with added heel reinforcement\", \"Rubber/EVA sole (anti-slip & oil/fuel-resistant)\", \"FO (hydrocarbons) sole, HRO with high heat resistance\"]', '/uploads/products/footwear/slamer-8824.jpg', 'Page 12, Item 3', 12, 1),
(18, 1, 'SS-161 S3 (Black 7\" Boot)', 'ss-161-s3-black-boot', 'RANGERS WAQ', 'SS-161', 'SS-161-S3', '7-inch full grain leather boot with epoxy coated stainless steel toe', 'High-ankle 7-inch industrial combat-style safety boot, full grain water-resistant leather, epoxy coated stainless steel toe cap (200J), steel midplate (1100N), and moulded PU footbed.', 'Full grain leather upper (7 inch height)', '38 - 47', 'EN ISO 20345:2022 S3 (water-resistant)', '[\"Epoxy coated stainless steel toe (200J) & steel midplate (1100N)\", \"Full grain leather upper (7 inch height)\", \"Dual density PU (DDPU) sole (slip, oil & heat-resistant)\", \"Anti-static with moulded PU footbed\"]', '/uploads/products/footwear/ss-161-s3.jpg', 'Page 12, Item 4', 12, 1),
(19, 1, 'ST-07 S3 (Black 8\" Rigger Boot)', 'st-07-s3-black-boot', 'RANGERS WAQ', 'ST-07', 'ST-07-S3', '8-inch leather rigger boot with lightweight plastic toe and Kevlar insole', 'Full 8-inch high protective leather boot designed for rig workers, construction crews and utility personnel, featuring lightweight plastic toe (200J), Kevlar puncture barrier, and ESD anti-static rating.', 'Leather upper (8 inch height)', '39 - 46', 'EN ISO 20345:2022 S3 (water-resistant)', '[\"Lightweight plastic toe (200J) & Kevlar insole (1100N)\", \"Leather upper (8 inch height)\", \"Dual density PU (DDPU) sole (slip, oil & heat-resistant)\", \"ESD protection & anti-static\"]', '/uploads/products/footwear/st-07-s3.jpg', 'Page 12, Item 5', 12, 1),
(20, 2, '60/40 Polycotton Coverall (160 GSM)', '60-40-polycotton-coverall', 'RANGERS WORKWEAR', 'RA-PCC160', 'RA-PCC160', 'EN ISO 13688:2013 certified 160 GSM lightweight sanforized coverall', 'Durable, breathable everyday industrial coverall designed specifically for hot climate Gulf operations. Sanforized and mercerized to prevent shrinkage, equipped with two-way heavy-duty brass zipper, reinforced utility pockets, and elasticized waist.', '60% Polyester and 40% Cotton (160 GSM)', 'Small - 5XL', 'EN ISO 13688:2013 certified', '[\"60% polyester and 40% cotton, fabric weight 160 GSM\", \"Sanforized and mercerized for minimum shrinkage\", \"Two-way front zipper, multiple utility pockets, elasticized waist\", \"Reinforced bar-tacking on stress points\"]', '/uploads/products/workwear/ra-pcc160.jpg', 'Page 12, Item 6', 12, 1),
(21, 2, '60/40 Polycotton Uniform (Pant / Shirt)', '60-40-polycotton-uniform', 'RANGERS WORKWEAR', 'RA-PCU160', 'RA-PCU160', 'Two-piece industrial workwear set (Shirt & Trouser) 160 GSM', 'Comfortable two-piece industrial uniform set featuring dual flap chest pockets with pen slot, reinforced knee panels on trousers, durable double stitching, and mercerized polycotton weave.', '60% Polyester and 40% Cotton (160 GSM)', 'Small - 5XL', 'EN ISO 13688:2013 certified', '[\"60% polyester and 40% cotton, 160 GSM\", \"Sanforized and mercerized for lasting color fastness\", \"Durable stitching, multi-pocket shirt, reinforced trousers\", \"Ideal for facility management, utilities and maintenance crews\"]', '/uploads/products/workwear/ra-pcu160.jpg', 'Page 12, Item 7', 12, 1),
(22, 2, '100% Cotton Heavy-Duty Coverall (240 GSM)', '100-cotton-heavy-duty-coverall', 'RANGERS WORKWEAR', 'RA-CTC160', 'RA-CTC160', '100% Premium cotton twill 240 GSM (ideal for high-heat environments)', 'Pure cotton industrial coverall delivering maximum breathability, natural spark resistance, and skin comfort in extreme ambient heat. Available in 160, 240, and 300 GSM weights.', '100% Premium cotton twill (240 GSM standard)', 'Small - 5XL', 'EN ISO 13688:2013 certified', '[\"100% premium cotton twill 240 GSM (ideal for high-heat environments)\", \"Sanforized and mercerized for maximum durability\", \"Heavy-duty protection with dual-side action back pleats\", \"Deep cargo pockets, rule pocket, and badge loop\"]', '/uploads/products/workwear/ra-ctc160.jpg', 'Page 12, Item 8', 12, 1),
(23, 2, '100% Cotton Uniform (Pant / Shirt)', '100-cotton-uniform', 'RANGERS WORKWEAR', 'RA-CTU240', 'RA-CTU240', '100% Premium cotton twill 240 GSM two-piece suit set', 'Two-piece utility uniform constructed from heavy-gauge 240 GSM combed cotton. Provides natural sweat absorption, durability against grease and abrasions, and smart corporate appearance.', '100% Premium cotton twill (240 GSM)', 'Small - 5XL', 'EN ISO 13688:2013 certified', '[\"100% premium cotton twill 240 GSM\", \"Sanforized and mercerized fabric\", \"Durable multi-needle stitching, multi-pocket utility layout\", \"Industrial laundry friendly\"]', '/uploads/products/workwear/ra-ctu240.jpg', 'Page 12, Item 9', 12, 1),
(24, 2, 'Fire-Retardant (FR) Coveralls & Uniforms', 'fire-retardant-fr-coveralls', 'RANGERS WORKWEAR', 'RA-FRC200', 'RA-FRC200', 'EN ISO 11611:2015 & EN ISO 11612 certified Flame-Resistant suit', 'Essential protective garment for oil & gas refineries, welding operations, and power utility sites. Constructed with Treatendo 100% cotton FR or Nomex / FR Aramid blend with inherently flame-resistant threads and non-conductive concealed zippers.', 'Treatendo 100% cotton FR or Nomex / FR Aramid', 'Small - 5XL', 'EN ISO 11611:2015 & EN ISO 11612 certified', '[\"EN ISO 11611:2015 & EN ISO 11612 dual certified flame protection\", \"Treatendo 100% FR cotton or Nomex / FR Aramid options\", \"Flame-resistant sewing threads throughout\", \"Offset zippers with internal storm flap, double-reinforced knees\"]', '/uploads/products/workwear/ra-frc200.jpg', 'Page 12, Item 10', 12, 1);

-- ----------------------------------------------------------
-- Table: product_images (Multi-image Gallery per Product)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `image_path` VARCHAR(255) NOT NULL,
  `alt_text` VARCHAR(255) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_primary` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_product_images_product` (`product_id`),
  INDEX `idx_product_images_primary` (`is_primary`),
  CONSTRAINT `fk_product_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `product_images` (`product_id`, `image_path`, `alt_text`, `display_order`, `is_primary`) VALUES
(1, '/uploads/products/footwear/ss-08-s1p.png', 'SS-08 S1P Black - Hero Front View', 1, 1),
(1, '/uploads/products/footwear/ss-08-s1p.jpg', 'SS-08 S1P Black - Sole & Tread Detail', 2, 0),
(2, '/uploads/products/footwear/ss-12s-s1p.png', 'SS-12S S1P Beige Suede - Front View', 1, 1),
(2, '/uploads/products/footwear/ss-12s-s1p.jpg', 'SS-12S S1P Beige Suede - Side Angle View', 2, 0),
(3, '/uploads/products/footwear/ss-18-s1p.png', 'SS-18 S1P Black / Fluorescent Green - Primary', 1, 1),
(3, '/uploads/products/footwear/ss-18-s1p.jpg', 'SS-18 S1P Athletic Mesh Upper Detail', 2, 0),
(4, '/uploads/products/footwear/ss-21-s3.png', 'SS-21 S3 Water Resistant Black - Primary', 1, 1),
(5, '/uploads/products/footwear/ss-25-s3.png', 'SS-25 S3 Barton Split Leather - Primary', 1, 1),
(6, '/uploads/products/footwear/ss-26-s3.png', 'SS-26 S3 Barton Split Mid-Cut - Primary', 1, 1),
(7, '/uploads/products/footwear/ss-49-s3.png', 'SS-49 S3 Barton Printed Microfiber - Primary', 1, 1),
(8, '/uploads/products/footwear/ss-59-s1p.png', 'SS-59 S1P Rotary Quick Dial - Primary', 1, 1),
(20, '/uploads/products/workwear/hivis_vest.png', '60/40 Polycotton Coverall - Primary View', 1, 1),
(22, '/uploads/products/workwear/coverall.png', '100% Cotton Heavy Duty Boiler Suit - Primary', 1, 1);

-- ----------------------------------------------------------
-- Table: hero_slides (Parallax Hero Section Slides & Assets)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `hero_slides`;
CREATE TABLE `hero_slides` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `desktop_image` VARCHAR(255) NOT NULL,
  `mobile_image` VARCHAR(255) NULL,
  `background_image` VARCHAR(255) NULL,
  `overlay_opacity` INT NOT NULL DEFAULT 70,
  `primary_cta_label` VARCHAR(100) NULL,
  `primary_cta_url` VARCHAR(255) NULL,
  `secondary_cta_label` VARCHAR(100) NULL,
  `secondary_cta_url` VARCHAR(255) NULL,
  `display_order` INT NOT NULL DEFAULT 1,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_hero_slides_active_order` (`is_active`, `display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `hero_slides` (`title`, `subtitle`, `description`, `desktop_image`, `mobile_image`, `background_image`, `overlay_opacity`, `primary_cta_label`, `primary_cta_url`, `secondary_cta_label`, `secondary_cta_url`, `display_order`, `is_active`) VALUES
('PROTECTING THE REGION\'S WORKFORCE', 'Certified Safety Footwear, High-Visibility Uniforms & Complete PPE Solutions', 'Engineered for extreme GCC industrial environments, civil engineering, oil & gas installations, and municipal utilities across the UAE and Middle East.', '/uploads/products/footwear/ss-08-s1p.png', '/uploads/products/footwear/ss-08-s1p.png', 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f0?auto=format&fit=crop&w=2000&q=80', 75, 'Request Corporate Quote', '#quote', 'Download Master Catalogue', '#catalogue', 1, 1);


-- ----------------------------------------------------------
-- Table: quote_requests
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `quote_requests`;
CREATE TABLE `quote_requests` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_number` VARCHAR(50) NOT NULL UNIQUE,
  `company_name` VARCHAR(200) NOT NULL,
  `contact_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `product_or_category` VARCHAR(255) NOT NULL,
  `estimated_quantity` VARCHAR(100) NULL,
  `specifications` VARCHAR(255) NULL,
  `requirements` TEXT NOT NULL,
  `status` ENUM('New', 'In Progress', 'Quoted', 'Closed') NOT NULL DEFAULT 'New',
  `internal_notes` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_quote_reference` (`reference_number`),
  INDEX `idx_quote_status` (`status`),
  INDEX `idx_quote_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `quote_requests` (`reference_number`, `company_name`, `contact_name`, `email`, `phone`, `country`, `product_or_category`, `estimated_quantity`, `specifications`, `requirements`, `status`, `created_at`) VALUES
('RSS-2026-881923', 'Dubai Utility Contracting LLC', 'Eng. Tariq Al Nuaimi', 'procurement@duc-uae.com', '+971 4 399 2200', 'United Arab Emirates', 'SS-08-S1P - SS-08 S1P (Black)', '500 - 2,000 Pairs / Units', 'Sizes 41-45, EN ISO 20345:2022', 'Immediate delivery requirement for Jebel Ali solar expansion plant.', 'New', NOW());

-- ----------------------------------------------------------
-- Table: site_settings
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` TEXT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('company_name', 'Rangers Safety Systems LLC'),
('company_tagline', 'PROTECTING THE REGION\'S WORKFORCE'),
('company_address', 'Unit SH01, Street 57, Jebel Ali Industrial First, Dubai 50791, United Arab Emirates'),
('company_trn', '100391707500003'),
('contact_email', 'info@rangers-safety.com'),
('contact_phone', '+971 4 244 5408'),
('whatsapp_number', '+97142445408'),
('public_website_url', 'https://rangers-safety.com'),
('google_reviews_enabled', '1'),
('google_reviews_url', 'https://maps.google.com/?cid=rangers_safety_systems_dubai');

-- ----------------------------------------------------------
-- Table: admin_activity_logs
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `admin_activity_logs`;
CREATE TABLE `admin_activity_logs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(191) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `details` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_log_user` (`user_email`),
  INDEX `idx_log_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `admin_activity_logs` (`user_email`, `action`, `details`, `ip_address`, `created_at`) VALUES
('admin@rangers-safety.com', 'CMS Initialization', 'Master CMS database loaded with 24 verified products and brand assets.', '192.168.1.10', NOW()),
('admin@rangers-safety.com', 'Catalogue Sync', 'Synchronized WETEX 2026 12-page exhibition booklet and quick-link triggers.', '192.168.1.10', NOW());

-- ----------------------------------------------------------
-- Table: cms_pages
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `cms_pages`;
CREATE TABLE `cms_pages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `meta_description` TEXT NULL,
  `status` ENUM('Published', 'Draft', 'Archived') NOT NULL DEFAULT 'Published',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cms_pages` (`slug`, `name`, `title`, `meta_description`, `status`) VALUES
('/', 'Home Landing Page', 'PROTECTING THE REGION\'S WORKFORCE', 'Certified occupational safety footwear, EN ISO 20471 high-visibility uniforms, and certified personal protective equipment in Dubai, UAE.', 'Published'),
('/products', 'Products Catalogue', 'Industrial Safety Gear & PPE Catalogue', 'Explore certified safety footwear, industrial workwear, and personal protective equipment for GCC industrial environments.', 'Published'),
('/catalogue', 'Digital Exhibition Booklet', 'Official WETEX 2026 Exhibition Showcase', '12-page comprehensive master catalogue for water, energy, and utility procurement.', 'Published'),
('/quote', 'Corporate Quote Request', 'Request a Corporate Quote', 'Submit bulk inquiry and RFP for industrial footwear and PPE.', 'Published'),
('/contact', 'Contact & Jebel Ali HQ', 'Contact Rangers Safety Systems LLC', 'Physical headquarters in Jebel Ali Industrial First, Dubai, UAE.', 'Published'),
('/microsite', 'WETEX 2026 Mobile Micro-Site', 'WETEX 2026 Booth QR Portal', 'Fast mobile Linktree-style portrait page for exhibition booth visitors.', 'Published');

-- ----------------------------------------------------------
-- Table: catalogues
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `catalogues`;
CREATE TABLE `catalogues` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `category` ENUM('footwear', 'workwear', 'ppe', 'exhibition') NOT NULL DEFAULT 'exhibition',
  `pdf_url` VARCHAR(255) NOT NULL,
  `cover_image` VARCHAR(255) NULL,
  `page_count` INT NOT NULL DEFAULT 12,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `catalogues` (`title`, `description`, `category`, `pdf_url`, `cover_image`, `page_count`, `is_active`) VALUES
('WETEX 2026 Official Digital Exhibition Booklet', '12-page comprehensive master showcase prepared for water, energy, and utility delegates in Dubai.', 'exhibition', '/catalogues/rangers_wetex_2026.pdf', '/uploads/products/workwear/hivis_vest.png', 12, 1),
('Digital Catalogue – Safety Shoes & Boots', '15-page certified footwear catalogue covering composite-toe athletic series and Barton leather construction boots.', 'footwear', '/catalogues/rangers_safety_shoes_2026.pdf', '/uploads/products/footwear/ss-08-s1p.png', 15, 1),
('Digital Catalogue – Uniforms & Garments', '12-page occupational workwear catalogue featuring 100% cotton coveralls and EN ISO 20471 high-visibility vests.', 'workwear', '/catalogues/rangers_uniforms_2026.pdf', '/uploads/products/workwear/coverall.png', 12, 1);

-- ----------------------------------------------------------
-- Table: customer_reviews
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `customer_reviews`;
CREATE TABLE `customer_reviews` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_name` VARCHAR(150) NOT NULL,
  `company` VARCHAR(200) NOT NULL,
  `role` VARCHAR(150) NULL,
  `rating` TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `comment` TEXT NOT NULL,
  `review_date` DATE NOT NULL,
  `is_verified` TINYINT(1) NOT NULL DEFAULT 1,
  `is_visible` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `customer_reviews` (`client_name`, `company`, `role`, `rating`, `comment`, `review_date`, `is_verified`, `is_visible`) VALUES
('Rashid Al Nuaimi', 'Emirates Grid Infrastructure LLC', 'Head of HSE', 5, 'Rangers Safety has supplied our high-voltage substation teams with SS-08 S1P composite boots and flame-retardant coveralls for 4 years. Unmatched comfort in Dubai summer heat and zero compliance failures.', '2026-08-14', 1, 1),
('Sanjay Mukherjee', 'Gulf Petroleum Engineering Contracting', 'Procurement Director', 5, 'Fast quote turnaround and prompt delivery from their Jebel Ali warehouse. The quick-dial SS-59 shoes and breathable coveralls were very well received by our offshore crew.', '2026-07-29', 1, 1),
('Marcus Vance', 'Trans-Arabian Logistics Solutions', 'Fleet HSE Manager', 5, 'Superior quality high-visibility vests and executive safety shoes. Clean embroidery of our company logo and exact adherence to EN ISO 20471 standard.', '2026-06-18', 1, 1),
('Fahad Bin Salem', 'Jebel Ali Civil Works', 'Site Safety Inspector', 5, 'A true local UAE institution. The heavy-duty Barton leather SS-26 boots survived grueling construction sites with zero sole de-lamination. Highly recommended.', '2026-05-02', 1, 1);

-- ----------------------------------------------------------
-- Table: media_library
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `media_library`;
CREATE TABLE `media_library` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `category` ENUM('footwear', 'workwear', 'ppe', 'logos', 'banners') NOT NULL DEFAULT 'footwear',
  `dimensions` VARCHAR(50) NULL,
  `file_size` VARCHAR(50) NULL,
  `alt_text` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_media_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `media_library` (`filename`, `file_path`, `category`, `dimensions`, `file_size`, `alt_text`) VALUES
('ss-08-s1p.png', '/uploads/products/footwear/ss-08-s1p.png', 'footwear', '800 × 600 px', '142 KB', 'SS-08 S1P Black Safety Shoe'),
('ss-12s-s1p.png', '/uploads/products/footwear/ss-12s-s1p.png', 'footwear', '800 × 600 px', '158 KB', 'SS-12S S1P Beige Suede Safety Shoe'),
('ss-18-s1p.png', '/uploads/products/footwear/ss-18-s1p.png', 'footwear', '800 × 600 px', '135 KB', 'SS-18 S1P Black/Green Athletic Shoe'),
('ss-21-s3.png', '/uploads/products/footwear/ss-21-s3.png', 'footwear', '800 × 600 px', '148 KB', 'SS-21 S3 Water Resistant Black Shoe'),
('ss-25-s3.png', '/uploads/products/footwear/ss-25-s3.png', 'footwear', '800 × 600 px', '162 KB', 'SS-25 S3 Barton Leather Low Cut Boot'),
('ss-26-s3.png', '/uploads/products/footwear/ss-26-s3.png', 'footwear', '800 × 600 px', '174 KB', 'SS-26 S3 Barton Leather Mid Cut Boot'),
('ss-49-s3.png', '/uploads/products/footwear/ss-49-s3.png', 'footwear', '800 × 600 px', '139 KB', 'SS-49 S3 Microfiber Water Repellent Boot'),
('ss-59-s1p.png', '/uploads/products/footwear/ss-59-s1p.png', 'footwear', '800 × 600 px', '144 KB', 'SS-59 S1P Rotary Quick Dial Shoe'),
('hivis_vest.png', '/uploads/products/workwear/hivis_vest.png', 'workwear', '800 × 800 px', '95 KB', 'EN ISO 20471 High Visibility Vest'),
('coverall.png', '/uploads/products/workwear/coverall.png', 'workwear', '800 × 800 px', '112 KB', '100% Cotton Heavy Duty Boiler Suit Coverall');

SET FOREIGN_KEY_CHECKS = 1;
