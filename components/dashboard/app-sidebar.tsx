"use client";

import * as React from "react";
import {
  LayoutDashboard,
  LineChart,
  Wallet,
  Settings,
  HelpCircle,
  TrendingUp,
  PieChart,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#" },
  { name: "Analytics", icon: LineChart, href: "#" },
  { name: "Portfolio", icon: PieChart, href: "#" },
  { name: "Transactions", icon: Wallet, href: "#" },
  { name: "Reports", icon: TrendingUp, href: "#" },
];

const bottomNavigation = [
  { name: "Settings", icon: Settings, href: "#" },
  { name: "Help & Support", icon: HelpCircle, href: "#" },
];

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full border-r bg-sidebar transition-all",
          "md:relative md:translate-x-0",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg font-mono">FinDash</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn("h-8 w-8", isCollapsed && "mx-auto")}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "text-sidebar-foreground",
                  item.name === "Dashboard" && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </a>
            ))}
          </nav>

          <Separator className="my-4" />

          <nav className="flex flex-col gap-1">
            {bottomNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "text-sidebar-foreground"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </a>
            ))}
          </nav>
        </ScrollArea>

        {!isCollapsed && (
          <div className="border-t p-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <p className="text-xs font-medium text-primary">Pro Plan</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Unlock advanced analytics
              </p>
              <Button size="sm" className="mt-2 w-full">
                Upgrade
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
