# 🍽️ FoodMate

**FoodMate** is a modern food ordering dashboard built with **Next.js 15**, **gRPC**, **WebSocket (Socket.IO)**, and **TanStack Query**. It supports real-time order updates and data fetching from gRPC and local mock APIs.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 15+ (App Router), TypeScript, TailwindCSS
* **gRPC Backend:** Node.js with `@grpc/grpc-js`
* **WebSocket:** Socket.IO for real-time updates
* **State Management:** TanStack Query (React Query)
* **Dockerized:** Multi-service environment with Docker
* **Mock Data:** JSON files (Favorites, Orders, Menus)

---

## 📁 Project Structure

```
/grpc-server          - gRPC backend with mock data
/socket-server        - WebSocket server with Socket.IO
/src/app/api          - API routes that bridge frontend and gRPC/backend
/src/app/admin/dashboard - Admin dashboard interface
/src/app/dashboard    - Main user dashboard
/src/lib              - gRPC + WebSocket client setup
/public               - Static assets
```

---

## ✨ Features

* 📦 **gRPC Integration** – Fetch orders & favorites using gRPC
* 🔁 **WebSocket (Socket.IO)** – Real-time updates for dashboard
* ⚡ **TanStack Query** – Cache and revalidate data efficiently
* 📦 **Mock APIs** – Load JSON data (orders, favorites, menus)
* 💅 **Glassmorphism UI** – Clean, modern, and responsive dashboard

---

## 🧑‍💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/foodmate.git
cd foodmate
```

### 2. Start gRPC server

```bash
cd grpc-server
npm install
npm run dev
```

### 3. Start WebSocket server

```bash
cd ../socket-server
npm install
npm run dev
```

### 4. Start Next.js frontend

```bash
cd ..
npm install
npm run dev
```

---

## 🚩 First Time Usage

1. **Login as Admin:**

   * Email: `admin@foodmate.com`
   * Password: `admin123`

2. **Register as Customer**, then login with the registered credentials.

3. Now the customer can access the dashboard and features.

---

## 🐳 Docker (Optional)

Build and run all services using Docker:

```bash
make docker-build-clean-prod   # First time build
make docker-build-prod         # For subsequent updates
```

> Ensure Docker is running and internet connectivity is available during image pulls.

---

## 📂 Sample Mock Data

Located in: `grpc-server/mock`

* `favorites.json`
* `orders.json`

---

## 🔌 WebSocket Events

| Event Name          | Payload Example             | Description              |
| ------------------- | --------------------------- | ------------------------ |
| `order-updated`     | `Array<Order>`              | Broadcast updated orders |
| `favorites-updated` | `Array<FavoriteRestaurant>` | Broadcast favorites      |

---

## 📷 Dashboard Preview

> View your orders and favorite restaurants in real time!

---

## 👨‍🍳 Authors

* **Dehya Qalbi** – Fullstack Developer @FoodMate

---

## 📄 License

MIT © 2025 FoodMate

---

## 📽️ Demo

[FoodMate Live Demo](https://dehyabi.github.io/foodmate)

