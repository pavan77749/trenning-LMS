# Trenning LMS - Learning Management System

Trenning LMS is a full-featured Learning Management System built with the MERN stack (MongoDB, Express, React, Node.js). It provides a platform for creating, selling, and consuming online courses.

## Features

- **User Authentication**: Secure login and registration system
- **Course Management**: Create, edit, and publish courses
- **Content Management**: Upload lectures, videos, and course materials
- **Payment Integration**: Stripe payment gateway for course purchases
- **Course Progress Tracking**: Track student progress through courses
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Theme switching for better user experience

## Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- RTK Query for API calls
- Tailwind CSS with Shadcn UI components
- Vite as build tool

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payment processing
- Cloudinary for media storage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Stripe account for payments
- Cloudinary account for media storage

### Installation

1. Clone the repository
```bash
git clone https://github.com/pavan77749/trenning-LMS
cd trenning-LMS

2.Install dependencies for both client and server
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install


PORT=8080
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
WEBHOOK_ENDPOINT_SECRET=your_stripe_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173

1.Client .env.development
VITE_API_URL=http://localhost:8080

VITE_API_URL=https://trenning-lms.onrender.com

Start the development servers
# Start the server
cd server
npm run dev

# Start the client
cd ../client
npm run dev

## Deployment
The application is deployed with:

- Frontend: Vercel ( https://trenning-lms.vercel.app )
- Backend: Render ( https://trenning-lms.onrender.com )

Project Structure
trenning-LMS/
├── client/                 # React frontend
│   ├── public/             # Public assets
│   ├── src/                # Source files
│   │   ├── components/     # Reusable components
│   │   ├── features/       # Redux slices and API
│   │   ├── pages/          # Page components
│   │   │   ├── student/    # Student-facing pages
│   │   │   └── instructor/ # Instructor-facing pages
│   │   └── ...
│   └── ...
├── server/                 # Node.js backend
│   ├── controller/         # Route controllers
│   ├── db/                 # Database connection
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── index.js            # Server entry point
└── ...

## API Endpoints
### User Routes
- POST /api/v1/user/register - Register a new user
- POST /api/v1/user/login - Login user
- GET /api/v1/user/logout - Logout user
- GET /api/v1/user/profile - Get user profile
- PUT /api/v1/user/profile/update - Update user profile
### Course Routes
- POST /api/v1/course - Create a new course
- GET /api/v1/course - Get all courses
- GET /api/v1/course/:id - Get course by ID
- PUT /api/v1/course/:id - Update course
- DELETE /api/v1/course/:id - Delete course
### Purchase Routes
- POST /api/v1/purchase/create-checkout-session - Create Stripe checkout session
- POST /api/v1/purchase/webhook - Stripe webhook endpoint
- GET /api/v1/purchase/course/:courseId - Get course purchase status
### Progress Routes
- GET /api/v1/progress/:courseId - Get course progress
- POST /api/v1/progress/:courseId/lecture/:lectureId/view - Mark lecture as viewed
- POST /api/v1/progress/:courseId/complete - Mark course as complete
- POST /api/v1/progress/:courseId/incomplete - Mark course as incomplete
## License
This project is licensed under the MIT License.

## Acknowledgements
- React
- Node.js
- Express
- MongoDB
- Tailwind CSS
- Shadcn UI
- Stripe
- Cloudinary
