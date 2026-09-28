# TasteTable — Food Ordering System

A beginner-friendly intermediate React + Supabase project for a college web-development activity.

## Features

- Beautiful food menu
- Search dishes
- Category filtering
- Add to cart
- Increase/decrease quantity
- Checkout form
- Orders saved in Supabase
- Previous orders section
- Responsive layout
- No sign-up or sign-in

## Tech stack

- React
- Vite
- Supabase
- PostgreSQL
- Lucide React icons
- Plain CSS

## 1. Install dependencies

Open the project folder in VS Code and run:

```bash
npm install
```

## 2. Create the Supabase database

Open your Supabase project.

Go to:

**SQL Editor → New query**

Copy everything from:

`supabase/schema.sql`

Then run the SQL.

This creates:

- `menu_items`
- `orders`
- `order_items`

The SQL also adds simple Row Level Security policies so the public customer interface can read the menu and create orders without authentication.

## 3. Add your Supabase keys

Create a file named:

`.env`

Copy the contents of `.env.example` and replace the values:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not upload `.env` to GitHub.

## 4. Start the project

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

## How the data flow works

```text
React
  ↓
Supabase JavaScript client
  ↓
PostgreSQL
  ↓
menu_items / orders / order_items
```

When a customer places an order:

```text
Checkout form
      ↓
Insert into orders
      ↓
Get new order ID
      ↓
Insert each cart item into order_items
      ↓
Show confirmation
      ↓
Reload order history
```

## Beginner note

The project intentionally keeps the code straightforward. It does not use authentication, Redux, TypeScript, a complicated state-management library, or a large UI framework.

There is also a small fallback menu in `src/data/fallbackMenu.js`. If `.env` has not been configured yet, the website can still open and show the UI. Orders require Supabase to be connected.