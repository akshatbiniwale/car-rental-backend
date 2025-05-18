# 🚗 Car Rental Backend API

A simple car rental service built with **Node.js**, **Express**, and **Sequelize (MySQL)**. It includes authentication, car management, rental operations, and role-based access.

---

## 📁 Project Structure

```
📁 config
│   └── db.js                   # Sequelize DB connection config
│
📁 controllers
│   ├── authController.js       # User registration & login
│   ├── carController.js        # Car CRUD & search
│   └── rentalController.js     # Rent, return, user history, admin rental history
│
📁 middleware
│   ├── authMiddleware.js       # JWT verification
│   └── roleMiddleware.js       # Role-based access control (admin check)
│
📁 models
│   ├── car.js                  # Car model
│   ├── rental.js               # Rental model
│   └── user.js                 # User model
│
📁 routes
│   ├── authRoutes.js           # /api/auth: register, login
│   ├── carRoutes.js            # /api/cars: car CRUD, search
│   ├── rentalRoutes.js         # /api/rentals: rent/return, admin & user rental info
│   └── userRoutes.js           # /api/users: user’s own rentals
│
📄 .env                         # Environment variables (DB, JWT)
📄 app.js                       # Main app entry: sets up middleware, DB, routes
```

---

## 🌐 API Endpoints

### 🔐 Auth `/api/auth`

* `POST /register` – Register new user
* `POST /login` – Login and receive JWT token

### 🚗 Cars `/api/cars`

* `POST /` – Add a car (**admin only**)
* `GET /` – Get all cars
* `GET /:id` – Get a specific car
* `GET /search` – Search cars by make/model/year/availability
* `PUT /:id` – Update car (**admin only, owner only**)
* `DELETE /:id` – Delete car (**admin only, owner only**)

### 📦 Rentals `/api/rentals`

* `POST /:id/rent` – Rent a car (user only)
* `POST /:id/return` – Return a car (user only)
* `GET /rented` – Get all currently rented cars (**admin only**)
* `GET /:rentalId` – Get details of a specific rental (**admin only**)
* `GET /history` – 🔥 Get rental history with filters by car, user, or date (**admin only**)

### 👤 Users `/api/users`

* `GET /me/rentals` – Get logged-in user's full rental history

---

## 🛡 Middleware

* **authMiddleware.js**: Verifies JWT token from headers
* **roleMiddleware.js**: Restricts access based on user role (admin only routes)

---

## 🛠 Tech Stack

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT for authentication
* bcrypt for password hashing

---

## ✅ Setup Instructions

1. Clone the repository
2. Create a `.env` file with the following:

   ```env
   DB_NAME=your_database
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
3. Run `npm install`
4. Start the server: `node app.js` or `nodemon app.js`

---

## 📌 Notes

* Ensure MySQL is running locally or replace with your cloud DB config.
* Use Postman or any REST client to test the endpoints.