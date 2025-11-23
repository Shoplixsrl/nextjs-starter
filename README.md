# 🚀 AI E-Commerce SaaS Platform

> **Next-generation Shopify alternative powered by AI** - Build, customize, and manage e-commerce stores through natural conversation.

[![Built with Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-orange)](https://turbo.build/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🤖 AI-Powered Store Generation
- **Conversational Interface**: Describe your store idea in natural language
- **Intelligent Generation**: AI creates complete store configurations including products, categories, themes, and content
- **Real-time Preview**: See your store come to life as you chat
- **Claude 3.5 Sonnet** & **GPT-4** integration for superior generation quality

### 🏪 Complete E-Commerce Platform
- **Product Management**: Full catalog with variants, inventory tracking, SKUs
- **Order Management**: Complete order lifecycle from checkout to fulfillment
- **Customer CRM**: Customer profiles, addresses, purchase history, segmentation
- **Inventory & Warehouses**: Multi-warehouse support with stock tracking
- **Logistics Integration**: Shipping, tracking, fulfillment management
- **Analytics Dashboard**: Revenue, conversion rates, top products, insights

### 🎨 Modern UI/UX
- **Split-Panel Interface**: Chat on left, live preview on right (Lovable/Bolt-style)
- **Responsive Design**: Desktop, tablet, and mobile previews
- **shadcn/ui Components**: 46+ pre-built, beautiful components
- **Dark Mode**: Full dark mode support with next-themes
- **Theme Customization**: Real-time theme editing and preview

### 🏗️ Architecture

```
ai-ecommerce-saas/
├── apps/
│   ├── web/              # Next.js 15 Web Application
│   └── mobile/           # React Native/Expo Mobile App (coming soon)
├── packages/
│   ├── database/         # Drizzle ORM + Neon PostgreSQL
│   ├── types/            # Shared TypeScript types & Zod schemas
│   ├── ai-engine/        # AI integration (Claude, GPT-4)
│   ├── ecommerce-core/   # Business logic (products, orders, customers)
│   └── ui/               # Shared UI components
└── turbo.json            # Turborepo configuration
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 20.0.0
- **Bun** >= 1.3.2 (package manager)
- **PostgreSQL** database (Neon recommended)
- **Anthropic API Key** or **OpenAI API Key**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shoplixsrl/nextjs-starter.git
   cd nextjs-starter
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example apps/web/.env.local
   ```

   Edit `apps/web/.env.local`:
   ```env
   DATABASE_URL=your_neon_postgres_url
   ANTHROPIC_API_KEY=your_anthropic_key
   AUTH_SECRET=your_random_secret
   ```

4. **Generate and run database migrations**
   ```bash
   cd packages/database
   bunx drizzle-kit generate
   bunx drizzle-kit migrate
   cd ../..
   ```

5. **Start development server**
   ```bash
   bun run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 15.4.6 (App Router, Turbopack, React Server Components)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State Management**: Zustand + TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 20+ / Bun
- **API**: Next.js API Routes + Server Actions
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM
- **Auth**: NextAuth v5 (multi-tenant support)
- **Type Safety**: TypeScript strict mode

### AI & ML
- **Primary**: Anthropic Claude 3.5 Sonnet
- **Fallback**: OpenAI GPT-4 Turbo
- **SDK**: Vercel AI SDK (streaming support)
- **Features**: Store generation, product descriptions, SEO optimization, analytics insights

### DevOps
- **Monorepo**: Turborepo
- **Package Manager**: Bun
- **Deployment**: Vercel (recommended)
- **CI/CD**: GitHub Actions (optional)

## 🗄️ Database Schema

### Core Tables
- **organizations**: Multi-tenant organization management
- **users**: User accounts and authentication
- **organization_members**: Team members and roles
- **stores**: E-commerce store instances
- **products**: Product catalog with variants
- **customers**: Customer profiles and CRM
- **orders**: Order management and fulfillment
- **warehouses**: Inventory locations
- **inventory_levels**: Stock tracking
- **ai_conversations**: Chat history
- **ai_generations**: AI-generated content
- **analytics**: Performance metrics

[View complete schema](./packages/database/src/schema.ts)

## 🎯 Use Cases

### For Entrepreneurs
- Launch an e-commerce store in minutes without coding
- Test product ideas with AI-generated catalogs
- Iterate on store design through conversation

### For Agencies
- Rapid prototyping for client presentations
- Generate multiple store concepts quickly
- White-label e-commerce solution

### For Developers
- Modern, type-safe e-commerce codebase
- Extensible architecture with shared packages
- Best practices for Next.js + AI integration

## 📱 Mobile App (Coming Soon)

React Native + Expo mobile application with:
- Shared UI components from web
- Offline-first architecture
- Push notifications
- Native camera integration
- Biometric authentication

## 🛣️ Roadmap

- [x] Monorepo setup with Turborepo
- [x] Complete database schema (20+ tables)
- [x] AI chat interface with streaming
- [x] Split-panel UI (chat + preview)
- [x] Store generation engine
- [ ] NextAuth v5 authentication
- [ ] Product management UI
- [ ] Order management dashboard
- [ ] Customer CRM interface
- [ ] Analytics dashboard
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] SEO optimization tools
- [ ] React Native mobile app
- [ ] Theme marketplace
- [ ] Plugin system
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Lovable](https://lovable.dev), [Bolt.new](https://bolt.new), and [v0](https://v0.dev)
- Built with [shadcn/ui](https://ui.shadcn.com/)
- Powered by [Anthropic Claude](https://www.anthropic.com/)
- Deployed on [Vercel](https://vercel.com/)

## 📞 Support

- 📧 Email: support@shoplix.com
- 💬 Discord: [Join our community](https://discord.gg/shoplix)
- 🐛 Issues: [GitHub Issues](https://github.com/Shoplixsrl/nextjs-starter/issues)

---

**Made with ❤️ by Shoplix Team**

*Building the future of AI-powered e-commerce*
