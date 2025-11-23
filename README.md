# VibeCode Market - Digital Marketplace Platform

A modern, full-featured digital marketplace platform for buying and selling digital products with multiple sale options including instant purchase, auctions, and subscriptions.

## 🚀 Features Implemented

### Core Marketplace Features
- **Product Listings** - Browse digital products with advanced search and filtering
- **Multiple Sale Types**:
  - 💰 **Instant Buy** - Purchase products immediately at a fixed price
  - ⏰ **Auction** - Bid on products with time-limited auctions
  - 🔄 **Subscription** - Subscribe monthly or yearly for recurring access
  - 🎯 **Both** - Combine instant buy with auction options

### Authentication & User Management
- Secure user registration and login with JWT sessions
- Password hashing with bcryptjs
- Session management with HTTP-only cookies
- User profiles with avatar, bio, and statistics

### Product Management
- Create and list digital products
- Rich product descriptions with metadata
- File attachments for digital downloads
- Product categories and tags
- View counting and analytics

### User Interface
- **Elite Design** - Modern, professional UI built with shadcn/ui
- Fully responsive layout for all screen sizes
- Smooth animations and transitions
- Gradient backgrounds and premium aesthetics
- Product cards with seller information
- Review system with star ratings

## 🛠 Technology Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript with strict mode
- **Database**: Drizzle ORM + Neon PostgreSQL (serverless)
- **Authentication**: JWT with jose, bcryptjs for password hashing
- **UI Components**: shadcn/ui (46+ components)
- **Styling**: Tailwind CSS v4
- **Package Manager**: Bun
- **Icons**: Lucide React
- **Date Utilities**: date-fns

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/              # Authentication endpoints
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── logout/
│   │   │   └── me/
│   │   └── products/          # Product API endpoints
│   │       ├── [slug]/
│   │       └── create/
│   ├── auth/                  # Auth pages (login, register)
│   ├── products/              # Product pages
│   ├── seller/                # Seller dashboard & product creation
│   ├── layout.tsx
│   └── page.tsx               # Homepage
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── navbar.tsx
│   └── product-card.tsx
├── hooks/
│   └── use-auth.tsx           # Authentication hook
├── lib/
│   ├── auth/
│   │   ├── password.ts        # Password hashing utilities
│   │   └── session.ts         # Session management
│   ├── db/
│   │   ├── index.ts           # Database connection
│   │   └── schema.ts          # Database schema
│   └── utils.ts
└── .env.example               # Environment variables template
```

## 🗄 Database Schema

The platform includes comprehensive database tables:

- **users** - User accounts with authentication and profile data
- **products** - Product listings with pricing and metadata
- **product_files** - Digital file attachments
- **orders** - Purchase orders and transactions
- **order_items** - Individual items in orders
- **bids** - Auction bids with auto-bidding support
- **subscriptions** - Recurring subscription management
- **payments** - Payment transactions and revenue tracking
- **reviews** - Product reviews and ratings

## 🚦 Getting Started

### Prerequisites

- Bun installed (or Node.js 20+)
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - `SESSION_SECRET` - A secure random string (min 32 characters)

4. Generate and run database migrations:
   ```bash
   bunx drizzle-kit generate
   bunx drizzle-kit migrate
   ```

5. Run the development server:
   ```bash
   bun run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
bun run build
```

## 📋 Available Commands

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build for production
- `bun start` - Run production server
- `bun run lint` - Run ESLint
- `bunx drizzle-kit studio` - Open Drizzle Studio for database management

## 🎯 Roadmap - Features to Implement

The following features are designed but not yet implemented:

- [ ] **Auction Bidding System** - Real-time bidding with WebSocket updates
- [ ] **Payment Integration** - Stripe integration for processing payments
- [ ] **Seller Dashboard** - Comprehensive dashboard for managing products and sales
- [ ] **Buyer Dashboard** - Purchase history, downloads, and subscriptions
- [ ] **Subscription Management** - Active subscription handling with Stripe
- [ ] **User Profile Pages** - Public seller profiles with their products
- [ ] **Search & Filters** - Advanced search with category/tag filtering
- [ ] **File Upload** - Direct file upload to cloud storage (S3/R2)
- [ ] **Email Notifications** - Transactional emails for purchases, bids, etc.
- [ ] **Analytics Dashboard** - Revenue, sales, and traffic analytics

## 🔒 Security Features

- Password hashing with bcryptjs (12 salt rounds)
- HTTP-only secure cookies for sessions
- JWT token-based authentication
- SQL injection prevention with Drizzle ORM
- Input validation with Zod schemas
- CSRF protection ready

## 🎨 Design Philosophy

The platform follows an "elite" design approach:

- Premium gradient backgrounds
- Smooth animations and transitions
- Professional typography with Geist fonts
- Consistent spacing and visual hierarchy
- Accessible color contrasts
- Mobile-first responsive design

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Contact the repository owner for contribution guidelines.

---

Built with ❤️ using Next.js, Drizzle ORM, and shadcn/ui
