# AGENTS.md

## Dev Environment Tips

### Initial Setup
```bash
# Install dependencies
npm install

# Start development server with Turbopack (faster builds)
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

### Development Server
- Server runs on `http://localhost:3000`
- Turbopack enabled for faster HMR and builds
- Auto-reload on file changes in `/app` directory

### Package Management
- Primary: npm (package-lock.json)
- Alternative: Bun (bun.lock present)
- Node.js requirement: ≥20.0.0

## Testing Instructions

### Linting & Type Checking
```bash
# Run ESLint
npm run lint

# TypeScript type checking (via build)
npm run build
```

### Test Coverage
Currently no test framework configured. Consider implementing:
- Unit tests with Jest or Vitest
- E2E tests with Playwright
- Component testing with React Testing Library

## PR Instructions

### Commit Guidelines
- Use conventional commits format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep commits atomic and focused

### Pre-commit Checks
Before submitting PR, ensure:
1. `npm run lint` passes without errors
2. `npm run build` completes successfully
3. No TypeScript errors present
4. New components follow existing patterns

### Code Review Expectations
- All new components should use existing UI library when possible
- Follow established patterns in `/components/ui/`
- Maintain TypeScript strict mode compliance
- Use Tailwind CSS for styling (no inline styles)

## Project Context

### Architecture Overview
- **Framework**: Next.js 15.4.6 with App Router
- **UI Library**: shadcn/ui (46 pre-built components)
- **Styling**: Tailwind CSS v4 with CSS variables
- **State Management**: React hooks + Context API
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Directory Structure
```
/app              # App Router pages and layouts
  layout.tsx      # Root layout with providers
  page.tsx        # Homepage
  globals.css     # Global styles with Tailwind
/components       # React components
  /ui             # shadcn/ui components library
/lib              # Utilities and helpers
  utils.ts        # cn() utility for classnames
/hooks            # Custom React hooks
/public           # Static assets
```

### Key Technologies
- React 19.1.0 with latest features
- TypeScript with strict mode
- Turbopack for development
- PostCSS with Tailwind v4
- Radix UI primitives for accessibility

## Component Guidelines

### Using UI Components
The project includes 46 pre-built shadcn/ui components:
- Always check `/components/ui/` before creating new components
- Components use Radix UI for accessibility
- Styled with Tailwind CSS and CSS variables

### Common Components Available
- **Forms**: Input, Select, Checkbox, Radio, Switch, Textarea
- **Overlays**: Dialog, Sheet, Popover, Tooltip, Alert Dialog
- **Navigation**: Tabs, Navigation Menu, Breadcrumb
- **Data Display**: Table, Card, Badge, Avatar
- **Feedback**: Alert, Toast (via sonner), Progress
- **Layout**: Accordion, Collapsible, Resizable Panels

### Component Patterns
```typescript
// Use cn() utility for conditional classes
import { cn } from "@/lib/utils"

// Example component pattern
export function Component({ className, ...props }) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* content */}
    </div>
  )
}
```

### Form Handling
```typescript
// Use React Hook Form with Zod
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  field: z.string().min(1, "Required")
})

const form = useForm({
  resolver: zodResolver(schema)
})
```

## Domain-Specific Vocabulary
- **RSC**: React Server Components
- **App Router**: Next.js file-based routing in `/app`
- **Turbopack**: Faster bundler replacing Webpack
- **shadcn/ui**: Component library built on Radix UI
- **Radix UI**: Unstyled, accessible component primitives
- **CSS Variables**: Theme system using CSS custom properties

## Security Considerations
- Never expose API keys or secrets in client code
- Use environment variables for sensitive configuration
- Validate all user inputs with Zod schemas
- Sanitize data before rendering to prevent XSS
- Use Next.js built-in security headers

## Performance Tips
- Leverage React Server Components for static content
- Use dynamic imports for code splitting
- Optimize images with Next.js Image component
- Implement proper caching strategies
- Monitor bundle size with build analysis