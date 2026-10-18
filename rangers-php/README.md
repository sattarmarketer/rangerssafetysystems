# Rangers Safety Systems LLC — Website & Exhibition Platform
## Complete PHP 8.2+ & MySQL Deployment Guide

### Overview
This package contains the complete, production-ready website and exhibition platform for **Rangers Safety Systems LLC** designed for **WETEX 2026 Dubai**.

- **Frontend**: Responsive HTML5, CSS3 with brand variables, ES6 JavaScript.
- **Backend**: Clean PHP 8.2+ MVC architecture with PDO prepared statements and CSRF mitigation.
- **Database**: MySQL 8.0+ / MariaDB schema (`database/database.sql`) with all 24 verified exhibition products seeded.
- **Event**: WETEX 2026 Dubai / Government Utility Exhibition.

---

### 1. Requirements
- PHP 8.2 or 8.3 with extensions: `pdo`, `pdo_mysql`, `mbstring`, `json`, `gd` (or imagick).
- MySQL 8.0+ or MariaDB 10.5+.
- Apache with `mod_rewrite` enabled.
- Composer 2.x.

---

### 2. Local Setup (XAMPP / WAMP / MAMP)
1. Copy or extract the contents of `rangers-php/` into your Apache `htdocs` or `www` directory (e.g. `C:/xampp/htdocs/rangers-safety`).
2. Open phpMyAdmin or your MySQL client and create a new database:
   ```sql
   CREATE DATABASE rangers_safety_systems CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Import the database schema and seeded products:
   ```bash
   mysql -u root -p rangers_safety_systems < database/database.sql
   ```
4. Copy `.env.example` to `.env` and verify database credentials:
   ```ini
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=rangers_safety_systems
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```
5. Install composer packages:
   ```bash
   composer install
   ```
6. Set the Apache DocumentRoot to the `public/` directory so index.php acts as the entry point.
7. Open `http://localhost/rangers-safety` in your browser.

---

### 3. Administrator Credentials
- **Login URL**: `/admin`
- **Email**: `admin@rangers-safety.com`
- **Initial Password**: `Rangers@2026`
*(Change password immediately upon first production deployment via PHP password_hash)*

---

### 4. Confirmed Company Details
- **Address**: Unit SH01, Street 57, Jebel Ali Industrial First, Dubai 50791, United Arab Emirates
- **Telephone**: +971 4 244 5408
- **Email**: info@rangers-safety.com
- **TRN**: 100391707500003
- **Exhibition**: WETEX 2026 Dubai
