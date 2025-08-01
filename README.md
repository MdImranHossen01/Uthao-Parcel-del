# Uthao Parcel Delivery API

A secure, modular, and role-based backend API for a parcel delivery system, built with Express.js and Mongoose.

**Live API Link:** [https://your-deployed-api-link.com](https://your-deployed-api-link.com)  *(You can add this later if you deploy it)*

---

## 🚀 Project Overview

This project is a comprehensive backend system designed to handle parcel delivery logistics. It features a robust role-based access control system for three distinct user types: **Admins**, **Senders**, and **Receivers**. The API allows users to register, log in, create parcels, track status changes, and manage deliveries, all secured with JWT-based authentication.

---

## ✨ Key Features

-   **Authentication & Authorization**: Secure JWT-based login with role checking (`admin`, `sender`, `receiver`) on protected routes.
-   **User Management**: Admins can view, block, and unblock any user in the system.
-   **Parcel Lifecycle Management**:
    -   **Senders** can create and cancel parcels.
    -   **Admins** can update parcel statuses (e.g., pending → picked-up → in-transit).
    -   **Receivers** can confirm the final delivery.
-   **Full Parcel Tracking**: Each parcel has a unique tracking ID and a complete, embedded history of its status changes.
-   **Public Tracking**: A public endpoint allows anyone to check a parcel's status using its tracking ID without needing to log in.

---

## 🛠️ Technology Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **Authentication**: JSON Web Tokens (JWT)
-   **Password Hashing**: Bcrypt
-   **Development**: TypeScript, ts-node-dev

---

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-link>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add the following environment variables. Replace the values with your own.
    ```env
    PORT=5000
    DB_URL=your_mongodb_connection_string
    NODE_ENV=development

    # JWT
    JWT_ACCESS_SECRET=your_super_long_jwt_access_secret
    JWT_ACCESS_EXPIRES=30d

    # BCRYPT
    BCRYPT_SALT_ROUND=12
    ```

4.  **Start the server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

---

## 🔁 API Endpoints

Below is the list of available API endpoints.

### Public Routes

| Method | Endpoint                    | Description                           |
| :----- | :-------------------------- | :------------------------------------ |
| `POST` | `/api/auth/register`        | Register a new user (`admin`, `sender`, or `receiver`). |
| `POST` | `/api/auth/login`           | Log in a user to get a JWT.           |
| `GET`  | `/api/parcels/track/:trackingId` | Publicly track a parcel by its ID.    |

### Sender Routes (Requires Sender Role)

| Method  | Endpoint               | Description                      |
| :------ | :--------------------- | :------------------------------- |
| `POST`  | `/api/parcels`         | Create a new parcel request.     |
| `GET`   | `/api/parcels/my-parcels` | Get a list of all parcels created by the sender. |
| `PATCH` | `/api/parcels/:parcelId/cancel` | Cancel a parcel (if status is 'pending'). |

### Receiver Routes (Requires Receiver Role)

| Method  | Endpoint                    | Description                             |
| :------ | :-------------------------- | :-------------------------------------- |
| `GET`   | `/api/parcels/my-deliveries`| Get a list of all incoming parcels.     |
| `PATCH` | `/api/parcels/:parcelId/confirm-delivery` | Confirm a parcel has been delivered. |

### Admin Routes (Requires Admin Role)

| Method  | Endpoint                      | Description                          |
| :------ | :---------------------------- | :----------------------------------- |
| `GET`   | `/api/users`                  | Get a list of all users.             |
| `PATCH` | `/api/users/:userId/update-status` | Block or unblock a user.             |
| `GET`   | `/api/parcels/all`            | Get a list of all parcels in the system. |
| `PATCH` | `/api/parcels/:parcelId/update-status` | Update the status of any parcel. |

---