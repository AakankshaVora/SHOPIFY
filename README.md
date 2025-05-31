# 🛍️ Shopify FAQ Page Generator (Embedded App)

## 🚀 Overview

> This project is a full-stack **Shopify Embedded App** that allows Shopify merchants to generate and manage an FAQ page for their store. It was developed as part of my learning journey to understand embedded app development, Shopify OAuth flow, theme app extensions, and full-stack architecture with a practical use case. The application supports creating, updating, deleting, and displaying FAQs along with a rating system for each question.

## 📁 Project Structure

```bash
SHOPIFY/
├── app/
│   ├── Backend/            # Express backend: routes, controllers, models
│   ├── Frontend/           # React components, Remix routes, Polaris UI
│   ├── routes/             # Server and client routes using Remix
│   ├── db.server.js        # MongoDB connection setup
│   ├── entry.server.jsx    # Entry point for server-side rendering
│   ├── root.jsx            # Root layout and context
│   ├── routes.js           # App-level route handling
│   └── shopify.server.js   # Shopify auth, session, and webhook logic
├── prisma/                 # Prisma schema and migration setup (if used)
├── public/                 # Static assets (images, logos, etc.)
├── .env                    # Environment variables
├── Dockerfile              # Docker config for deployment
├── remix.config.js         # Remix configuration
├── vite.config.js          # Vite bundler config
├── shopify.app.toml        # Shopify CLI app definition
├── shopify.web.toml        # Shopify CLI web definition
├── tsconfig.json           # TypeScript config
├── package.json            # Scripts and dependencies
└── README.md               # You're here!
```

## 📦 Features

🛍️ Embedded App in Shopify Admin

✨ Live FAQ display via Theme App Extension

➕ Add/Edit/Delete FAQs with Categories

🧑‍💻 Admin-side FAQ management with Polaris UI

⭐ Optional FAQ rating by customers (public)

🈳 Multi-language support 

📦 Sync FAQs to storefront in real-time

🔐 Shopify OAuth + MongoDB-based session storage

🎯 Clean Remix + Express + App Bridge stack


## 🧰 Tech Stack

| Layer        | Tech                             |
| ------------ | -------------------------------- |
| Frontend     | Remix, React, Polaris, Tailwind  |
| Backend      | Node.js, Express, Shopify SDKs   |
| Auth & Embed | Shopify OAuth, App Bridge        |
| Database     | MongoDB Atlas                    |
| Extensions   | Shopify Theme App Extension      |
| Dev Tools    | Vite, TypeScript, ESLint, Docker |


## ⚙️ Installation

Clone the repository:
```bash
git clone https://github.com/Meet026/shopify-faq-app.git
cd shopify-faq-app
```

Install dependencies:
```bash
npm install
```

Start the development server (with tunnel):
```bash
npm run dev
```

## 🛡️ Environment Variables
Create a .env file in the root and add:

```bash
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET=your_shopify_api_secret
SCOPES=read_products,write_content
HOST=https://your_ngrok_or_production_url
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secure_session_secret
⚠️ Replace the dummy values with actual credentials from your Shopify Partner App settings.
```

## 📡 Shopify App Setup

1.Log into Shopify Partners Dashboard

2.Create a custom app with required permissions (Admin API, Theme App Extension)

3.Add your development URL (from Ngrok) to app settings

4.Install the app in a development store

5.Start creating FAQs from the embedded interface.


## 🧪 API Testing

You can test backend endpoints using tools like Postman or Hoppscotch.

Make sure:

App is installed in a test store

Valid access tokens are sent with requests

Shopify sessions are active.


## 🧩 Theme App Extension

The extensions/faq-extension folder contains the theme extension logic:

● Built using Liquid + JSON templates

● Dynamically pulls FAQ data from the backend via API

● Enables merchants to add an FAQ block from Shopify's theme editor

● Includes a rating system for customer feedback (⭐ ⭐ ⭐ ⭐ ⭐)

● Customizable block settings (e.g., heading, layout)

> 🚧 This section is still in progress — currently implementing dynamic syncing and real-time previews.

## 📸 Dashboard Preview

Here is a preview of the merchant-facing dashboard in the Shopify FAQ Page Generator app:
![WhatsApp Image 2025-05-31 at 11 52 33_7e5f3af8](https://github.com/user-attachments/assets/bc46b2c5-410d-44eb-906e-8bd88fb4bff6)


## 🔗 Resources

- [Shopify Theme App Extensions Docs](https://shopify.dev/docs/themes/architecture/extension-points)
- [Shopify Remix App Template](https://github.com/Shopify/shopify-app-template-remix)
- [Polaris Design System](https://polaris.shopify.com/)


## 🧠 Learnings
Through this project, I explored:

1.Shopify OAuth and embedded app lifecycle

2.Secure session handling using MongoDB

3.Building reusable RESTful APIs with multi-tenant logic

4.Frontend design using Polaris and Tailwind

5.Shopify’s Theme App Extension system and storefront integration
