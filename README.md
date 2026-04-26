# 🚀 MQTT Security Project – Dynamic ACL with Dashboard

## 📌 Giới thiệu

Dự án xây dựng hệ thống MQTT sử dụng **Mosquitto + MySQL** để giải quyết hạn chế của cơ chế ACL truyền thống.

### ❌ Cách cũ (ACL file)

* Static (cố định)
* Khó quản lý khi nhiều user
* Phải restart broker khi thay đổi

### ✅ Giải pháp trong dự án

* Sử dụng **Database (MySQL)** để quản lý user & ACL
* Cập nhật **realtime**
* **Không cần restart broker**
* Có **dashboard web** để thao tác trực tiếp

---

## 🏗️ Kiến trúc hệ thống

```
Client (MQTT / Web)
        ↓
   Frontend (Dashboard)
        ↓
   Backend API (Node.js)
        ↓
      MySQL
        ↓
   Mosquitto Broker
```

---

## 📂 Cấu trúc thư mục

```
mosquitto-sec-project/
├── broker/
│   ├── config/
│   │   └── mosquitto.conf
│   └── db/
│       └── init.sql
├── backend/
│   ├── app.js
│   └── package.json
├── frontend/
│   └── index.html
├── proxy/
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Công nghệ sử dụng

* MQTT Broker: Mosquitto (go-auth plugin)
* Database: MySQL 8
* Backend: Node.js (Express)
* Frontend: HTML + JS
* Container: Docker Compose

---

## 🖥️ Hướng dẫn chạy trên các hệ điều hành

### 🐧 Linux (Kali / Ubuntu)

```bash
docker-compose up -d
```

---

### 🪟 Windows

1. Cài Docker Desktop

2. Bật WSL2 (bắt buộc)

3. Mở PowerShell hoặc WSL

4. Chạy lệnh:

```bash
docker-compose up -d
```

---

### 🍎 macOS

1. Cài Docker Desktop

2. Mở Docker Desktop

3. Mở Terminal

4. Chạy lệnh:

```bash
docker-compose up -d
```

---

⚠️ Lưu ý: Cần mở Docker Desktop trước khi chạy lệnh.


## 🌐 Truy cập

* Frontend Dashboard: http://localhost:8080
* Backend API: http://localhost:3000
* MQTT Broker: `localhost:1883`

---

## 🧪 Sử dụng Dashboard

### Thêm User

* Nhập username + password
* Nhấn **Add**
* User được lưu vào MySQL

---

### Xem danh sách user

* Nhấn **Load**
* Hiển thị danh sách từ database

---

## 📡 Test MQTT

Dùng MQTT client:

```bash
mosquitto_pub -h localhost -p 1883 -u <username> -P <password> -t test/topic -m "hello"
```

👉 Nếu có ACL đúng → publish thành công

---

## 🔥 Demo điểm mạnh (quan trọng)

Hệ thống hỗ trợ:

👉 **Dynamic Access Control**

* Thêm user / ACL từ dashboard
* Không cần restart Mosquitto
* Áp dụng gần như realtime

📢 Câu demo:

> “Hệ thống cho phép quản lý truy cập động thông qua database, giúp mở rộng dễ dàng và cập nhật ngay lập tức mà không cần restart broker.”

---

## 🔐 Bảo mật

* Xác thực user qua database
* Có thể mở rộng:

  * Hash password (bcrypt)
  * TLS (port 8883)
  * Reverse proxy (Nginx / HAProxy)

---

## ⚠️ Lưu ý

* Không expose MySQL ra Internet
* Nên thêm volume để lưu dữ liệu lâu dài
* Nên dùng TLS nếu deploy public

---

## 📈 Hướng phát triển

* Thêm chức năng:

  * Xóa / sửa user
  * Quản lý ACL UI
* Tích hợp WebSocket MQTT
* Thêm authentication cho dashboard

---

## 👨‍💻 Tác giả

* Huynh

---

## 🎯 Tổng kết

Dự án giải quyết hạn chế của Mosquitto ACL truyền thống bằng cách:

* Chuyển sang DB-based ACL
* Quản lý qua dashboard
* Hỗ trợ realtime
* Dễ mở rộng & triển khai

---
