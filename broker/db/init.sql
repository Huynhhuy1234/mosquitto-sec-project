-- =========================
-- 1. TẠO DATABASE (an toàn)
-- =========================
CREATE DATABASE IF NOT EXISTS mqtt_db;
USE mqtt_db;

-- =========================
-- 2. XÓA BẢNG CŨ (nếu muốn reset)
-- =========================
-- COMMENT lại nếu bạn KHÔNG muốn mất dữ liệu
DROP TABLE IF EXISTS acl;
DROP TABLE IF EXISTS devices;
DROP TABLE IF EXISTS users;

-- =========================
-- 3. TẠO BẢNG USERS
-- =========================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- =========================
-- 4. TẠO BẢNG DEVICES
-- =========================
CREATE TABLE IF NOT EXISTS devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    device_id VARCHAR(100) NOT NULL UNIQUE,
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- 5. TẠO BẢNG ACL
-- =========================
CREATE TABLE IF NOT EXISTS acl (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    topic VARCHAR(255),
    rw INT
);

-- =========================
-- 6. INSERT DATA TEST
-- =========================

-- User mẫu
INSERT INTO users (username, password_hash)
VALUES 
('huy_bk', '$2a$10$N0HcjJ0d22WBnMCtXoTtaeEDehUSrkCGSXixL2SKlQ0nxj2dWL5iC');

-- Device mẫu
INSERT INTO devices (device_id, owner_id)
VALUES 
('device_01', 1),
('device_02', 1);

-- ACL mẫu
INSERT INTO acl (username, topic, rw)
VALUES 
('huy_bk', 'sensor/device_01', 3),
('huy_bk', 'sensor/device_01/data', 3),
('huy_bk', 'sensor/device_02', 1); -- chỉ subscribe
