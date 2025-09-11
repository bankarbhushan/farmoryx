# FarmoryX Project Structure

This project follows a **production-grade MERN stack** architecture with clean folder structures for both **frontend** (React) and **backend** (Node.js/Express + MongoDB).  

---

## Frontend (React) Folder Structure

frontend/
├── public/
│ ├── favicon.ico
│ ├── index.html
│ └── manifest.json
│
├── src/
│ ├── api/ # API request handlers (Axios/Fetch)
│ │ └── index.js
│ │
│ ├── assets/ # Images, fonts, static files
│ │ ├── images/
│ │ └── styles/
│ │
│ ├── components/ # Reusable UI components
│ │ ├── common/ # (Buttons, Inputs, Modals, Loaders, etc.)
│ │ ├── layout/ # (Header, Sidebar, Footer, Navigation)
│ │ └── widgets/ # Small feature blocks (Cards, Charts, etc.)
│ │
│ ├── constants/ # App-wide constants (routes, roles, configs)
│ │ └── routes.js
│ │
│ ├── context/ # React Context Providers
│ │ └── AuthContext.js
│ │
│ ├── hooks/ # Custom React hooks
│ │ └── useAuth.js
│ │
│ ├── layouts/ # Page layouts (AdminLayout, DashboardLayout)
│ │ └── DashboardLayout.js
│ │
│ ├── pages/ # Page-level components (per route)
│ │ ├── auth/ # (Login, Register, ForgotPassword)
│ │ ├── dashboard/ # (Broker, Merchant, Farmer dashboards)
│ │ ├── items/ # (CRUD pages for vegetables/items)
│ │ ├── bills/ # (Bill list, Bill details, PDF view)
│ │ └── NotFound.js
│ │
│ ├── services/ # API services (axios instance, CRUD methods)
│ │ └── itemService.js
│ │
│ ├── store/ # Redux/Toolkit (state management)
│ │ ├── slices/
│ │ │ ├── authSlice.js
│ │ │ ├── itemSlice.js
│ │ │ └── billSlice.js
│ │ └── store.js
│ │
│ ├── utils/ # Utility functions (validators, formatters)
│ │ └── validators.js
│ │
│ ├── App.js # Root component
│ ├── index.js # Entry point
│ └── routes.js # Route configuration
│
├── .env # Environment variables
├── package.json
└── README.md


##  Backend (Node.js + Express + MongoDB) Folder Structure

backend/
├── src/
│ ├── config/ # DB & server configs
│ │ ├── db.js # MongoDB connection
│ │ └── cloudinary.js # Cloudinary config
│ │
│ ├── controllers/ # Request handlers (Business logic)
│ │ ├── admin.controller.js
│ │ ├── farmer.controller.js
│ │ ├── merchant.controller.js
│ │ ├── broker.controller.js
│ │ ├── item.controller.js
│ │ ├── veg.controller.js
│ │ └── bill.controller.js
│ │
│ ├── middlewares/ # Express middlewares
│ │ ├── auth.middleware.js
│ │ └── error.middleware.js
│ │
│ ├── models/ # Mongoose schemas
│ │ ├── admin.model.js
│ │ ├── farmer.model.js
│ │ ├── merchant.model.js
│ │ ├── broker.model.js
│ │ ├── item.model.js
│ │ ├── veg.model.js
│ │ └── bill.model.js
│ │
│ ├── routes/ # Express routes
│ │ ├── admin.routes.js
│ │ ├── farmer.routes.js
│ │ ├── merchant.routes.js
│ │ ├── broker.routes.js
│ │ ├── item.routes.js
│ │ ├── veg.routes.js
│ │ └── bill.routes.js
│ │
│ ├── services/ # Helper services (PDF, WhatsApp, Payment)
│ │ ├── pdf.service.js
│ │ └── whatsapp.service.js
│ │
│ ├── utils/ # Utilities (validators, tokens, helpers)
│ │ ├── generateToken.js
│ │ └── validators.js
│ │
│ ├── index.js # Express app entry
│ └── app.js # Express app config
│
├── .env # Environment variables
├── package.json
└── README.md
