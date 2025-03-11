# LMS Platform

A full-featured Learning Management System (LMS) built using the MERN stack with Redux Toolkit, offering secure course management, authentication, and payment integration with Stripe.

## Features
- **Admin Panel**: Create and manage courses and lectures.
- **Protected Routes**: Secure authentication and authorization for users.
- **Stripe Integration**: Seamless and secure payment processing.
- **Dashboard with Charts**: View transaction history and user activity.
- **State Management**: Implemented using Redux Toolkit.

## Tech Stack
- **Frontend**: React.js, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Payment Gateway**: Stripe

## Installation

1. Clone the repository:
   ```sh
   git clone (https://github.com/pavan77749/trenning-LMS)
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   cd client  # Navigate to frontend
   npm install
   cd /server  # Navigate to backend
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `server` directory and add:
     ```env
     PORT=8080
      MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
      SECRET_KEY=your_secret_key

      CLOUD_NAME=your_cloudinary_name
      API_KEY=your_cloudinary_api_key
      API_SECRET=your_cloudinary_api_secret

      STRIPE_SECRET_KEY=your_stripe_secret_key
      STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
      WEBHOOK_ENDPOINT_SECRET=your_webhook_secret
     ```
4. Run the development servers:
   ```sh
   # Start backend
   cd server
   npm run dev
   
   # Start frontend
   cd client
   npm run dev
   ```

## Usage
- Admin can log in, create courses, and manage lectures.
- Users can browse courses, enroll, and make payments securely.
- Dashboard provides transaction insights and analytics.

