"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  FileText,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const orders = [
  {
    id: 1,
    orderNumber: "ORD-2025-024",
    customer: "Hotel Mediterraneo SRL",
    products: "Ombrellone Palo Laterale 3x4m (x10)",
    orderDate: "2025-01-15",
    deliveryDate: "2025-02-01",
    totalAmount: 5990,
    status: "in_production",
    priority: "high",
  },
  {
    id: 2,
    orderNumber: "ORD-2025-023",
    customer: "Ristorante Il Giardino",
    products: "Ombrellone Palo Centrale 3x3m (x5)",
    orderDate: "2025-01-20",
    deliveryDate: "2025-02-10",
    totalAmount: 1495,
    status: "confirmed",
    priority: "medium",
  },
  {
    id: 3,
    orderNumber: "ORD-2025-022",
    customer: "Villa Rosa Beach",
    products: "Gazebo Professionale 3x3m (x3)",
    orderDate: "2025-01-18",
    deliveryDate: "2025-02-15",
    totalAmount: 3897,
    status: "in_production",
    priority: "high",
  },
  {
    id: 4,
    orderNumber: "ORD-2025-021",
    customer: "Lido Azzurro",
    products: "Ombrellone Legno Teak 2.5x2.5m (x8)",
    orderDate: "2025-01-12",
    deliveryDate: "2025-01-28",
    totalAmount: 7192,
    status: "completed",
    priority: "medium",
  },
  {
    id: 5,
    orderNumber: "ORD-2025-020",
    customer: "Beach Club Sole",
    products: "Ombrellone Palo Centrale 3x3m (x15)",
    orderDate: "2025-01-10",
    deliveryDate: "2025-01-30",
    totalAmount: 4485,
    status: "delivered",
    priority: "low",
  },
  {
    id: 6,
    orderNumber: "ORD-2025-019",
    customer: "Caffè Piazza",
    products: "Ombrellone Palo Laterale 3x4m (x2)",
    orderDate: "2025-01-08",
    deliveryDate: "2025-01-25",
    totalAmount: 1198,
    status: "draft",
    priority: "low",
  },
]

const statusConfig = {
  draft: {
    label: "Bozza",
    color: "bg-slate-100 text-slate-700 border-slate-200",
    icon: FileText,
  },
  confirmed: {
    label: "Confermato",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2,
  },
  in_production: {
    label: "In Produzione",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Package,
  },
  completed: {
    label: "Completato",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: CheckCircle2,
  },
  delivered: {
    label: "Consegnato",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    icon: Truck,
  },
  cancelled: {
    label: "Annullato",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: XCircle,
  },
}

const priorityConfig = {
  high: { label: "Alta", color: "text-red-600" },
  medium: { label: "Media", color: "text-amber-600" },
  low: { label: "Bassa", color: "text-green-600" },
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [isNewOrderOpen, setIsNewOrderOpen] = React.useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Gestione Ordini
            </h1>
            <p className="text-slate-600 mt-1">
              Gestisci tutti gli ordini e le commesse
            </p>
          </div>
          <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
                <Plus className="h-4 w-4" />
                Nuovo Ordine
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crea Nuovo Ordine</DialogTitle>
                <DialogDescription>
                  Inserisci i dettagli del nuovo ordine cliente
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Cliente</Label>
                    <Select>
                      <SelectTrigger id="customer">
                        <SelectValue placeholder="Seleziona cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Hotel Mediterraneo SRL</SelectItem>
                        <SelectItem value="2">Ristorante Il Giardino</SelectItem>
                        <SelectItem value="3">Villa Rosa Beach</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryDate">Data Consegna</Label>
                    <Input id="deliveryDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product">Prodotto</Label>
                  <Select>
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Seleziona prodotto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ombrellone Palo Centrale 3x3m</SelectItem>
                      <SelectItem value="2">Ombrellone Palo Laterale 3x4m</SelectItem>
                      <SelectItem value="3">Ombrellone Legno Teak 2.5x2.5m</SelectItem>
                      <SelectItem value="4">Gazebo Professionale 3x3m</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantità</Label>
                    <Input id="quantity" type="number" min="1" defaultValue="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priorità</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="priority">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="low">Bassa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Note</Label>
                  <Textarea id="notes" placeholder="Note aggiuntive..." rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewOrderOpen(false)}>
                  Annulla
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  Crea Ordine
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Totale Ordini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">24</div>
              <p className="text-xs text-slate-500 mt-1">Ordini attivi</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                In Produzione
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-xs text-slate-500 mt-1">In lavorazione</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Valore Totale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">€48,250</div>
              <p className="text-xs text-slate-500 mt-1">Questo mese</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                In Scadenza
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">3</div>
              <p className="text-xs text-slate-500 mt-1">Prossimi 7 giorni</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Elenco Ordini</CardTitle>
                <CardDescription>
                  Gestisci e monitora tutti gli ordini
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Cerca ordini..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti gli stati</SelectItem>
                    <SelectItem value="draft">Bozza</SelectItem>
                    <SelectItem value="confirmed">Confermato</SelectItem>
                    <SelectItem value="in_production">In Produzione</SelectItem>
                    <SelectItem value="completed">Completato</SelectItem>
                    <SelectItem value="delivered">Consegnato</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-semibold">Numero Ordine</TableHead>
                    <TableHead className="font-semibold">Cliente</TableHead>
                    <TableHead className="font-semibold">Prodotti</TableHead>
                    <TableHead className="font-semibold">Data Ordine</TableHead>
                    <TableHead className="font-semibold">Consegna</TableHead>
                    <TableHead className="font-semibold">Priorità</TableHead>
                    <TableHead className="font-semibold">Stato</TableHead>
                    <TableHead className="font-semibold text-right">Totale</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig]
                    const StatusIcon = status.icon
                    const priority = priorityConfig[order.priority as keyof typeof priorityConfig]

                    return (
                      <TableRow key={order.id} className="hover:bg-slate-50/50">
                        <TableCell className="font-mono font-medium">
                          {order.orderNumber}
                        </TableCell>
                        <TableCell className="font-medium">{order.customer}</TableCell>
                        <TableCell className="text-slate-600 text-sm">
                          {order.products}
                        </TableCell>
                        <TableCell className="text-sm">{order.orderDate}</TableCell>
                        <TableCell className="text-sm">{order.deliveryDate}</TableCell>
                        <TableCell>
                          <span className={cn("text-sm font-medium", priority.color)}>
                            {priority.label}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("border gap-1", status.color)}>
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          €{order.totalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Azioni</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2">
                                <Eye className="h-4 w-4" />
                                Visualizza
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Edit className="h-4 w-4" />
                                Modifica
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Download className="h-4 w-4" />
                                Scarica PDF
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 text-red-600">
                                <Trash2 className="h-4 w-4" />
                                Elimina
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
