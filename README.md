# EpiQura: Food Delivery Platform (Frontend)

A food-ordering platform with customer and admin dashboards, ratings, promotions and order tracking. Built as a single-page app with a component-driven structure and role-based access.

**Live demo:** https://epiqura.netlify.app/
**Backend repo:** https://github.com/srabons0/EpiQura_backend_server

![Home page](screenshots/home.png)

## Features

**Customers**
- Categorized menus with search and filtering
- Cart and checkout with Stripe
- Order tracking and payment history
- Ratings and reviews
- Editable profile dashboard
- Sign in with Google or email/password (Firebase Authentication)
- Maps with Leaflet [keep only if this is used for something like delivery or location]

**Admin**
- Create, update, delete and manage products
- Order tracking and status control
- Review moderation
- Analytics dashboard with charts (Recharts)

**Access control**
- Two roles: Admin and User
- Role-based access with protected routes

The interface is responsive on mobile, tablet and desktop.

## Tech Stack

| Area | Tools |
|------|-------|
| Frontend | React 19, Vite, Tailwind CSS |
| Auth | Firebase Authentication, role-based access control |
| Payments | Stripe Checkout |
| Data fetching and state | TanStack Query (with local cache), Axios API layer |
| Maps | Leaflet |
| Animation | Framer Motion |
| Charts | Recharts |
| Backend | Node.js, Express.js, MongoDB (separate repo) |
| Deployment | Netlify |



If Stripe is in test mode, use card `4242 4242 4242 4242`, any future date and any CVC.

## Screenshots

| Menu | Checkout | Order Tracking |
|------|----------|----------------|
| ![](screenshots/menu.png) | ![](screenshots/checkout.png) | ![](screenshots/tracking.png) |

| User Dashboard | Admin Dashboard |
|----------------|-----------------|
| ![](screenshots/user.png) | ![](screenshots/admin.png) |

## Run Locally

1. Start the backend first: see https://github.com/srabons0/EpiQura_backend_server
2. Then run the frontend:

```bash
git clone https://github.com/srabons0/EpiQura_frontend_server.git
cd EpiQura_frontend_server
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

## Environment Variables

```
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_STRIPE_PUBLISHABLE_KEY=
```

(Change these names to match your real project.)

## Author

Sadman Sakid | [GitHub](https://github.com/srabons0) | [LinkedIn](https://www.linkedin.com/in/sadman-sakid/) | [Portfolio](https://sadmanpfl.netlify.app)
