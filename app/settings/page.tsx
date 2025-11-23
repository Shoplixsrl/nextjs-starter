"use client";

import * as React from "react";
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile", description: "Manage your account" },
      { icon: Lock, label: "Security", description: "Password & 2FA" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Palette, label: "Appearance", description: "Theme & display" },
      { icon: Bell, label: "Notifications", description: "Alerts & reminders" },
      { icon: Globe, label: "Language", description: "English (US)" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", description: "FAQs & support" },
    ],
  },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = React.useState(true);
  const [biometric, setBiometric] = React.useState(false);

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="mx-auto max-w-3xl px-4 py-6 md:px-6 lg:px-8">
        <Header />

        <AnimatedCard delay={0}>
          <GlassCard className="mb-6 p-5">
            <h2 className="mb-6 text-2xl font-bold">Settings</h2>

            {/* Quick Toggles */}
            <div className="mb-8 space-y-4 rounded-lg bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="notifications">Push Notifications</Label>
                  <span className="text-xs text-muted-foreground">
                    Receive alerts for transactions
                  </span>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="biometric">Biometric Login</Label>
                  <span className="text-xs text-muted-foreground">
                    Use Face ID or fingerprint
                  </span>
                </div>
                <Switch
                  id="biometric"
                  checked={biometric}
                  onCheckedChange={setBiometric}
                />
              </div>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
              {settingsSections.map((section, sectionIndex) => (
                <div key={section.title}>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-all duration-180 hover:bg-muted/50"
                          style={{
                            animationDelay: `${
                              (sectionIndex * 3 + itemIndex) * 50
                            }ms`,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{item.label}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Logout Button */}
            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/20 p-3 text-destructive transition-all duration-180 hover:bg-destructive/10">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </GlassCard>
        </AnimatedCard>
      </div>

      <BottomNav />
    </div>
  );
}
