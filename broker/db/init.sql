CREATE DATABASE IF NOT EXISTS mqtt_db;
USE mqtt_db;

-- Bảng users
CREATE TABLE IF NOT EXISTS users (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(200) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    PRIMARY KEY(id)
);

-- Bảng acls
CREATE TABLE IF NOT EXISTS acls (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    test_user_id MEDIUMINT NOT NULL,
    topic VARCHAR(200) NOT NULL,
    rw INT NOT NULL,
    PRIMARY KEY(id),
    -- Sửa từ test_user thành users ở đây
    FOREIGN KEY (test_user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Thêm dữ liệu (Liệt kê rõ cột để tránh lỗi)
INSERT INTO users (username, password_hash, is_admin) VALUES 
("admin", "$2a$10$9yAYWBm2kuW9Z/oz19ldEuLZSwn6G.bFwYJGpBFdp/lCIYz0.7foO", 1),
("user1", "$2a$10$ITDnpmHaEc3.mBDyDd9wMOtN2xZjkIlahQf0.j0m24VNEBqMwNkau", 0);

-- Thêm ACL cho user1 (id=2)
INSERT INTO acls (test_user_id, topic, rw) VALUES 
(2, "read_topic", 1),
(2, "write_topic", 2),
(2, "read_write_topic", 3);
