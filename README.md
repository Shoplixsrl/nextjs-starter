# MenuAI - AI-Powered Restaurant Menu Generator SaaS

> The most advanced AI-powered menu generation platform for restaurants. Create stunning menus in seconds with AI-generated content and professional food photography.

## 🚀 Features

### Core Features
- ✨ **AI Menu Generation** - Complete menu creation using Anthropic Claude Sonnet 4.5
- 📸 **AI Food Photography** - Professional images with fal.ai Flux Pro
- 🎨 **Brand Customization** - Full control over colors, fonts, and layouts
- 📱 **Mobile-First Menu Viewer** - Beautiful responsive menus accessible via QR code
- 📊 **Advanced Analytics** - Real-time tracking, insights, and AI recommendations
- 💰 **Food Cost Management** - Automatic cost calculation and margin optimization
- 📄 **PDF Export** - Print-ready menus in multiple formats
- 🔗 **Smart QR Codes** - Dynamic QR codes with analytics tracking
- 🌐 **Multi-Language** - AI-powered translation (coming soon)

### Technical Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **UI**: shadcn/ui, Tailwind CSS v4, Framer Motion
- **AI**: Anthropic Claude API, fal.ai
- **Database**: Drizzle ORM with Neon PostgreSQL
- **Authentication**: NextAuth.js with Google OAuth
- **Payments**: Stripe subscriptions
- **PDF Generation**: @react-pdf/renderer

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Shoplixsrl/nextjs-starter.git
cd nextjs-starter

# Install dependencies (using Bun)
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Generate database migrations
bunx drizzle-kit generate

# Run migrations
bunx drizzle-kit migrate

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database

# AI APIs
ANTHROPIC_API_KEY=your_anthropic_api_key
FAL_KEY=your_fal_api_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PROFESSIONAL_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🗄️ Database Schema

The platform uses a comprehensive PostgreSQL schema:

- **Users** - Authentication and subscription management
- **Restaurants** - Multi-restaurant support with branding
- **Menus** - AI-generated menus with metadata
- **Menu Categories & Items** - Complete menu structure
- **QR Codes** - Dynamic QR codes with customization
- **QR Code Scans** - Analytics tracking
- **AI Generations** - Usage tracking
- **Menu Analytics** - Performance metrics

## 🎯 API Routes

### AI Generation
- `POST /api/ai/generate-menu` - Generate complete menu with AI
- `POST /api/ai/generate-image` - Generate food images

### QR Codes
- `POST /api/qr/generate` - Create QR codes

### PDF Export
- `POST /api/pdf/generate` - Generate PDF menus

### Authentication
- `POST /api/auth/signup` - Create account
- `/api/auth/[...nextauth]` - NextAuth handlers

### Payments
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## 📱 Pages

- `/` - Landing page with pricing
- `/dashboard` - Menu generation interface
- `/analytics` - Analytics dashboard
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page
- `/m/[shortCode]` - Public menu viewer (QR code landing)

## 🏗️ Project Structure

```
nextjs-starter/
├── app/
│   ├── api/          # API routes
│   ├── auth/         # Auth pages
│   ├── dashboard/    # Dashboard
│   ├── analytics/    # Analytics
│   ├── m/            # Menu viewer
│   └── page.tsx      # Landing page
├── components/
│   └── ui/           # shadcn/ui components
├── lib/
│   ├── ai/           # AI integrations
│   ├── auth/         # Auth utilities
│   ├── db/           # Database & schema
│   ├── pdf/          # PDF generation
│   ├── qr/           # QR code utilities
│   └── stripe/       # Payment integration
└── public/           # Static assets
```

## 💎 Pricing Tiers

### Free
- 1 restaurant
- 2 menus
- Basic AI generation
- Static QR codes
- Web menu viewer

### Professional (€29/month)
- 5 restaurants
- Unlimited menus
- Advanced AI generation
- AI image generation
- PDF export
- Dynamic QR codes
- Advanced analytics
- Food cost management

### Enterprise (€99/month)
- Unlimited everything
- Custom AI training
- White-label solution
- API access
- 24/7 support

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel
```

### Database Setup (Neon)
1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy DATABASE_URL to `.env.local`

### Stripe Setup
1. Create account at [stripe.com](https://stripe.com)
2. Create products and prices
3. Set up webhook endpoint: `/api/stripe/webhook`
4. Add webhook secret to env

## 📈 Monorepo & Mobile App

See [MONOREPO_SETUP.md](./MONOREPO_SETUP.md) for instructions on:
- Converting to Turborepo monorepo
- Setting up React Native + Expo mobile app
- Sharing code between web and mobile

## 🛠️ Available Commands

```bash
# Development
bun run dev          # Start dev server with Turbopack
bun run build        # Build for production
bun start            # Run production server
bun run lint         # Run ESLint

# Database (Drizzle ORM)
bunx drizzle-kit generate  # Generate migrations
bunx drizzle-kit migrate   # Run migrations
bunx drizzle-kit push      # Push schema to DB (dev)
bunx drizzle-kit studio    # Open Drizzle Studio
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org)
- [shadcn/ui](https://ui.shadcn.com)
- [Anthropic Claude](https://anthropic.com)
- [fal.ai](https://fal.ai)
- [Drizzle ORM](https://orm.drizzle.team)
- [Neon Database](https://neon.tech)

---

Built with ❤️ for restaurants worldwide
