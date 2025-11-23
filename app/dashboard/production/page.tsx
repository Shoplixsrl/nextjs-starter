"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Factory,
  PlayCircle,
  PauseCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

const productionOrders = [
  {
    id: "PROD-001",
    orderNumber: "ORD-2025-024",
    product: "Ombrellone Palo Laterale 3x4m",
    quantity: 10,
    customer: "Hotel Mediterraneo",
    status: "in_progress",
    progress: 65,
    currentPhase: "Assemblaggio Telaio",
    assignedTo: "Giovanni Bianchi",
    priority: "high",
    scheduledStart: "2025-01-16",
    scheduledEnd: "2025-01-30",
    phases: [
      { name: "Stampa Personalizzata", status: "completed", progress: 100 },
      { name: "Taglio e Cucitura", status: "completed", progress: 100 },
      { name: "Preparazione Telaio", status: "completed", progress: 100 },
      { name: "Assemblaggio Telaio", status: "in_progress", progress: 60 },
      { name: "Assemblaggio Finale", status: "not_started", progress: 0 },
      { name: "Controllo Qualità", status: "not_started", progress: 0 },
    ],
  },
  {
    id: "PROD-002",
    orderNumber: "ORD-2025-023",
    product: "Ombrellone Palo Centrale 3x3m",
    quantity: 5,
    customer: "Ristorante Il Giardino",
    status: "in_progress",
    progress: 45,
    currentPhase: "Preparazione Componenti",
    assignedTo: "Marco Ferrari",
    priority: "medium",
    scheduledStart: "2025-01-21",
    scheduledEnd: "2025-02-08",
    phases: [
      { name: "Stampa Personalizzata", status: "completed", progress: 100 },
      { name: "Taglio e Cucitura", status: "completed", progress: 100 },
      { name: "Preparazione Telaio", status: "in_progress", progress: 70 },
      { name: "Assemblaggio Telaio", status: "not_started", progress: 0 },
      { name: "Assemblaggio Finale", status: "not_started", progress: 0 },
      { name: "Controllo Qualità", status: "not_started", progress: 0 },
    ],
  },
  {
    id: "PROD-003",
    orderNumber: "ORD-2025-022",
    product: "Gazebo Professionale 3x3m",
    quantity: 3,
    customer: "Villa Rosa Beach",
    status: "pending",
    progress: 0,
    currentPhase: "In attesa",
    assignedTo: "Non assegnato",
    priority: "high",
    scheduledStart: "2025-01-25",
    scheduledEnd: "2025-02-15",
    phases: [
      { name: "Stampa Personalizzata", status: "not_started", progress: 0 },
      { name: "Taglio e Cucitura", status: "not_started", progress: 0 },
      { name: "Preparazione Telaio", status: "not_started", progress: 0 },
      { name: "Assemblaggio Telaio", status: "not_started", progress: 0 },
      { name: "Assemblaggio Finale", status: "not_started", progress: 0 },
      { name: "Controllo Qualità", status: "not_started", progress: 0 },
    ],
  },
]

const workstations = [
  {
    name: "Stampa e Cucitura",
    active: 8,
    total: 10,
    utilization: 80,
    status: "optimal",
  },
  {
    name: "Preparazione Telai",
    active: 5,
    total: 6,
    utilization: 83,
    status: "optimal",
  },
  {
    name: "Assemblaggio",
    active: 6,
    total: 8,
    utilization: 75,
    status: "good",
  },
  {
    name: "Controllo Qualità",
    active: 2,
    total: 4,
    utilization: 50,
    status: "low",
  },
]

const statusConfig = {
  pending: {
    label: "In Attesa",
    color: "bg-slate-100 text-slate-700 border-slate-200",
  },
  in_progress: {
    label: "In Corso",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  on_hold: {
    label: "In Pausa",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  completed: {
    label: "Completato",
    color: "bg-green-100 text-green-700 border-green-200",
  },
}

const phaseStatusConfig = {
  not_started: { color: "bg-slate-200", textColor: "text-slate-600" },
  in_progress: { color: "bg-blue-500", textColor: "text-blue-600" },
  completed: { color: "bg-green-500", textColor: "text-green-600" },
}

const priorityColors = {
  high: "border-l-red-500",
  medium: "border-l-amber-500",
  low: "border-l-green-500",
}

export default function ProductionPage() {
  const [selectedOrder, setSelectedOrder] = React.useState<typeof productionOrders[0] | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Gestione Produzione
            </h1>
            <p className="text-slate-600 mt-1">
              Pianifica e monitora le attività produttive
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Pianifica
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
              <PlayCircle className="h-4 w-4" />
              Avvia Produzione
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Ordini Attivi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">12</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span>+8% vs. settimana scorsa</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Efficienza Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">87%</div>
              <Progress value={87} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Tempo Medio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">6.2 giorni</div>
              <p className="text-xs text-slate-500 mt-1">Per ordine completato</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Operatori Attivi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">21/28</div>
              <p className="text-xs text-slate-500 mt-1">Postazioni occupate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Production Timeline */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Timeline Produzione</CardTitle>
                <CardDescription>Ordini in lavorazione e pianificati</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {productionOrders.map((order) => (
                  <div
                    key={order.id}
                    className={cn(
                      "p-4 rounded-lg border-l-4 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer",
                      priorityColors[order.priority as keyof typeof priorityColors]
                    )}
                    onClick={() => {
                      setSelectedOrder(order)
                      setDialogOpen(true)
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-semibold text-slate-900">
                            {order.id}
                          </span>
                          <Badge className={cn("border text-xs", statusConfig[order.status as keyof typeof statusConfig].color)}>
                            {statusConfig[order.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>
                        <div className="text-sm font-medium text-slate-700">
                          {order.product} (x{order.quantity})
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Cliente: {order.customer}
                        </div>
                      </div>
                      <div className="text-right text-xs text-slate-500">
                        <div>Inizio: {order.scheduledStart}</div>
                        <div>Fine: {order.scheduledEnd}</div>
                      </div>
                    </div>

                    {/* Phase Progress */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Fase corrente: {order.currentPhase}</span>
                        <span className="font-medium text-slate-700">{order.progress}%</span>
                      </div>
                      <div className="flex gap-1">
                        {order.phases.map((phase, index) => (
                          <div
                            key={index}
                            className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden"
                            title={phase.name}
                          >
                            <div
                              className={cn(
                                "h-full transition-all",
                                phaseStatusConfig[phase.status as keyof typeof phaseStatusConfig].color
                              )}
                              style={{ width: `${phase.progress}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="h-3 w-3" />
                        <span>{order.assignedTo}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Dettagli
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Workstations Status */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Stato Postazioni</CardTitle>
                <CardDescription>Utilizzo linee produttive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {workstations.map((workstation) => (
                  <div key={workstation.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        {workstation.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {workstation.active}/{workstation.total}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <Progress
                        value={workstation.utilization}
                        className={cn(
                          "h-2",
                          workstation.status === "optimal" && "[&>div]:bg-green-500",
                          workstation.status === "good" && "[&>div]:bg-blue-500",
                          workstation.status === "low" && "[&>div]:bg-amber-500"
                        )}
                      />
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={cn(
                            "font-medium",
                            workstation.status === "optimal" && "text-green-600",
                            workstation.status === "good" && "text-blue-600",
                            workstation.status === "low" && "text-amber-600"
                          )}
                        >
                          {workstation.status === "optimal" && "Ottimale"}
                          {workstation.status === "good" && "Buono"}
                          {workstation.status === "low" && "Basso"}
                        </span>
                        <span className="text-slate-500">
                          {workstation.utilization}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">Azioni Rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="secondary" className="w-full justify-start gap-2">
                  <PlayCircle className="h-4 w-4" />
                  Avvia Nuova Produzione
                </Button>
                <Button variant="secondary" className="w-full justify-start gap-2">
                  <Clock className="h-4 w-4" />
                  Visualizza Gantt
                </Button>
                <Button variant="secondary" className="w-full justify-start gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Controllo Qualità
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Production Detail Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Dettaglio Ordine di Produzione</DialogTitle>
              <DialogDescription>
                {selectedOrder?.id} - {selectedOrder?.product}
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="text-xs text-slate-500">Cliente</div>
                    <div className="font-medium">{selectedOrder.customer}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Quantità</div>
                    <div className="font-medium">{selectedOrder.quantity} unità</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Assegnato a</div>
                    <div className="font-medium">{selectedOrder.assignedTo}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Avanzamento</div>
                    <div className="font-medium">{selectedOrder.progress}%</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Fasi di Produzione</h4>
                  {selectedOrder.phases.map((phase, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white border rounded-lg"
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                          phase.status === "completed" && "bg-green-100",
                          phase.status === "in_progress" && "bg-blue-100",
                          phase.status === "not_started" && "bg-slate-100"
                        )}
                      >
                        {phase.status === "completed" && (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        )}
                        {phase.status === "in_progress" && (
                          <Clock className="h-4 w-4 text-blue-600" />
                        )}
                        {phase.status === "not_started" && (
                          <div className="w-2 h-2 rounded-full bg-slate-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{phase.name}</div>
                        {phase.status === "in_progress" && (
                          <Progress value={phase.progress} className="h-1.5 mt-1" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "text-sm font-medium",
                          phaseStatusConfig[phase.status as keyof typeof phaseStatusConfig].textColor
                        )}
                      >
                        {phase.progress}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
