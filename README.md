

This is a basic e-commerce web application built with **Node.js**, **Express**, **EJS**, and **MongoDB**, structured with MVC architecture.

## 🚀 Features

- Product listing & details
- Add to cart functionality
- Flash messages
- JWT-based user sessions
- Tailwind CSS support (via CDN)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS templates, Tailwind CSS
- **Database:** MongoDB
- **Auth:** JSON Web Tokens (JWT)
- **Flash messages:** connect-flash

---

## 📂 Project Structure

```
shopify/
│
├── config/           # DB & app config
├── controllers/      # Route handlers
├── middlewares/      # Custom middlewares
├── models/           # Mongoose models
├── public/           # Static files (CSS, JS, images)
├── routes/           # Express routes
├── utils/            # Utility functions
├── views/            # EJS templates
│
├── app.js            # Entry point
├── .env              # Environment config (NOT COMMITTED)
├── .gitignore
├── package.json
```

---

## 🔧 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/03pranay/shopify.git
cd shopify
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit the `.env` file and fill in your own secret key.

```
JWT_KEY=your_jwt_secret_key
```

4. **Run the app**

```bash
npm start
```

Or if using `nodemon`:

```bash
npx nodemon app.js
```

---

## 📎 Notes

- Ensure MongoDB is running locally or provide a remote connection string in your `.env` file if needed.
- Tailwind CSS is used via CDN in your EJS layout.

---


