'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  ChefHat,
  Package,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Settings,
  LogOut,
  Building2,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Ingredients',
    href: '/dashboard/ingredients',
    icon: Package,
  },
  {
    name: 'Recipes',
    href: '/dashboard/recipes',
    icon: UtensilsCrossed,
  },
  {
    name: 'Menu Items',
    href: '/dashboard/menu',
    icon: ChefHat,
  },
  {
    name: 'Inventory',
    href: '/dashboard/inventory',
    icon: ShoppingCart,
  },
  {
    name: 'Purchase Orders',
    href: '/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    name: 'Waste Tracking',
    href: '/dashboard/waste',
    icon: AlertTriangle,
  },
  {
    name: 'AI Insights',
    href: '/dashboard/insights',
    icon: Sparkles,
    badge: 'AI',
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    name: 'Menu Engineering',
    href: '/dashboard/menu-engineering',
    icon: TrendingUp,
    badge: 'AI',
  },
];

interface DashboardNavProps {
  user?: {
    name: string;
    email: string;
    role: string;
  };
  organization?: {
    name: string;
  };
}

export function DashboardNav({ user, organization }: DashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' });
    router.push('/signin');
    router.refresh();
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
          <ChefHat className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            FoodCost AI
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 font-medium',
                    isActive &&
                      'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <Link href="/dashboard/settings">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 font-medium"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </ScrollArea>

      {/* User Menu */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto p-3"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left flex-1 min-w-0">
                <span className="text-sm font-medium truncate w-full">
                  {user?.name || 'User'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate w-full">
                  {organization?.name || 'Organization'}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Building2 className="mr-2 h-4 w-4" />
              <span>Organization Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
