# 🥪 SnacksMart

**SnacksMart** is a MERN-stack food ordering web application focused on delivering a smooth experience for users to browse and order delicious snacks and short eats.

## ✨ Features

* 🔐 User authentication with JWT
* 🛕️ Product listing and categorization
* 🛒 Add-to-cart functionality
* 📦 Order placement and history tracking
* 🧑‍💼 Admin dashboard for managing products, users & orders
* 📄 Form validation using Joi

## 🧰 Tech Stack

| Layer      | Technology       |
| ---------- | ---------------- |
| Frontend   | React.js         |
| Backend    | Node.js, Express |
| Database   | MongoDB          |
| Auth       | JWT              |
| Validation | Joi              |

## 📁 Project Structure

```
SnacksMart/
├── client/         # Frontend (React)
├── server/         # Backend (Node.js + Express)
├── README.md
└── LICENSE
```

## 🚀 Getting Started

### Prerequisites

* Node.js and npm
* MongoDB (local or cloud)
* Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/PasiduRanasinghe/SnacksMart.git
cd SnacksMart
```

2. **Install dependencies**

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

3. **Environment Variables**

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

4. **Run the app**

```bash
# Backend
cd server
npm start

# Frontend (in a new terminal)
cd client
npm start
```

Visit `http://localhost:3000` to start using the app.

## 📸 Screenshots


## 📜 License

This project is licensed under the [MIT License](LICENSE).

---
