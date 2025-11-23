"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Factory,
  Package,
  AlertTriangle,
  DollarSign,
  Users,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    name: "Ordini Attivi",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: ShoppingCart,
    color: "blue",
    description: "rispetto al mese scorso",
  },
  {
    name: "In Produzione",
    value: "12",
    change: "+8%",
    trend: "up",
    icon: Factory,
    color: "indigo",
    description: "ordini in lavorazione",
  },
  {
    name: "Fatturato Mensile",
    value: "€48,250",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "green",
    description: "obiettivo: €50,000",
  },
  {
    name: "Alert Materiali",
    value: "5",
    change: "-2",
    trend: "down",
    icon: AlertTriangle,
    color: "amber",
    description: "sotto scorta minima",
  },
]

const recentOrders = [
  {
    id: "ORD-2025-024",
    customer: "Hotel Mediterraneo",
    product: "Ombrellone Palo Laterale 3x4m",
    quantity: 10,
    value: "€5,990",
    status: "in_production",
    priority: "high",
    progress: 65,
  },
  {
    id: "ORD-2025-023",
    customer: "Ristorante Il Giardino",
    product: "Ombrellone Palo Centrale 3x3m",
    quantity: 5,
    value: "€1,495",
    status: "confirmed",
    priority: "medium",
    progress: 0,
  },
  {
    id: "ORD-2025-022",
    customer: "Villa Rosa Beach",
    product: "Gazebo Professionale 3x3m",
    quantity: 3,
    value: "€3,897",
    status: "in_production",
    priority: "high",
    progress: 45,
  },
  {
    id: "ORD-2025-021",
    customer: "Lido Azzurro",
    product: "Ombrellone Legno Teak 2.5x2.5m",
    quantity: 8,
    value: "€7,192",
    status: "quality_check",
    priority: "medium",
    progress: 95,
  },
]

const productionPhases = [
  { name: "Stampa Personalizzata", completed: 8, total: 10, color: "bg-blue-500" },
  { name: "Taglio e Cucitura", completed: 6, total: 10, color: "bg-indigo-500" },
  { name: "Preparazione Telaio", completed: 7, total: 10, color: "bg-purple-500" },
  { name: "Assemblaggio", completed: 5, total: 10, color: "bg-pink-500" },
  { name: "Controllo Qualità", completed: 3, total: 10, color: "bg-green-500" },
]

const lowStockMaterials = [
  { name: "Tessuto Acrilico Verde", current: 45, min: 50, unit: "m" },
  { name: "Sistema LED Integrato", current: 8, min: 10, unit: "pz" },
  { name: "Palo Legno Teak 3m", current: 6, min: 10, unit: "pz" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "in_production":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "confirmed":
      return "bg-green-100 text-green-700 border-green-200"
    case "quality_check":
      return "bg-purple-100 text-purple-700 border-purple-200"
    default:
      return "bg-slate-100 text-slate-700 border-slate-200"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "in_production":
      return "In Produzione"
    case "confirmed":
      return "Confermato"
    case "quality_check":
      return "Controllo Qualità"
    default:
      return status
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "border-l-red-500"
    case "medium":
      return "border-l-amber-500"
    case "low":
      return "border-l-green-500"
    default:
      return "border-l-slate-300"
  }
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-slate-600 mt-1">
              Panoramica generale della produzione
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Clock className="h-4 w-4" />
              Oggi
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
              <ShoppingCart className="h-4 w-4" />
              Nuovo Ordine
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.name}
                className="relative overflow-hidden border-0 shadow-lg bg-white/50 backdrop-blur-sm"
              >
                <div className={cn(
                  "absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full opacity-10",
                  stat.color === "blue" && "bg-blue-500",
                  stat.color === "indigo" && "bg-indigo-500",
                  stat.color === "green" && "bg-green-500",
                  stat.color === "amber" && "bg-amber-500"
                )} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {stat.name}
                  </CardTitle>
                  <div className={cn(
                    "p-2 rounded-lg",
                    stat.color === "blue" && "bg-blue-100",
                    stat.color === "indigo" && "bg-indigo-100",
                    stat.color === "green" && "bg-green-100",
                    stat.color === "amber" && "bg-amber-100"
                  )}>
                    <Icon className={cn(
                      "h-4 w-4",
                      stat.color === "blue" && "text-blue-600",
                      stat.color === "indigo" && "text-indigo-600",
                      stat.color === "green" && "text-green-600",
                      stat.color === "amber" && "text-amber-600"
                    )} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    )}>
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {stat.change}
                    </div>
                    <span className="text-xs text-slate-500">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Ordini Recenti</CardTitle>
                  <CardDescription>Ultimi ordini in lavorazione</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  Vedi tutti
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className={cn(
                    "p-4 rounded-lg border-l-4 bg-white shadow-sm hover:shadow-md transition-shadow",
                    getPriorityColor(order.priority)
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">{order.id}</div>
                      <div className="text-sm text-slate-600">{order.customer}</div>
                    </div>
                    <Badge className={cn("border", getStatusColor(order.status))}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-700 mb-2">{order.product}</div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span>Quantità: {order.quantity}</span>
                    <span className="font-semibold text-slate-900">{order.value}</span>
                  </div>
                  {order.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Avanzamento</span>
                        <span className="font-medium text-slate-700">{order.progress}%</span>
                      </div>
                      <Progress value={order.progress} className="h-1.5" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Production Status */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Stato Produzione</CardTitle>
                <CardDescription>Avanzamento per fase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {productionPhases.map((phase) => (
                  <div key={phase.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{phase.name}</span>
                      <span className="text-slate-500">
                        {phase.completed}/{phase.total}
                      </span>
                    </div>
                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all", phase.color)}
                        style={{ width: `${(phase.completed / phase.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm border-l-4 border-l-amber-500">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-xl">Alert Materiali</CardTitle>
                </div>
                <CardDescription>Materiali sotto scorta minima</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {lowStockMaterials.map((material) => (
                  <div
                    key={material.name}
                    className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200"
                  >
                    <div>
                      <div className="font-medium text-slate-900">{material.name}</div>
                      <div className="text-xs text-slate-600">
                        Scorta minima: {material.min} {material.unit}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-amber-600">
                        {material.current} {material.unit}
                      </div>
                      <Button size="sm" variant="outline" className="mt-1 h-7 text-xs">
                        Ordina
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
