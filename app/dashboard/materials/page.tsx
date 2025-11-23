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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Package,
  AlertTriangle,
  TrendingDown,
  ShoppingCart,
  Search,
  Plus,
  Filter,
  ArrowUpDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

const materials = [
  {
    id: 1,
    code: "FAB001",
    name: "Tessuto Acrilico Bianco",
    type: "fabric",
    current: 250,
    min: 50,
    max: 500,
    unit: "m",
    cost: 15.50,
    supplier: "Tessuti Italiani SRL",
    status: "optimal",
  },
  {
    id: 2,
    code: "FAB003",
    name: "Tessuto Acrilico Verde",
    type: "fabric",
    current: 45,
    min: 50,
    max: 300,
    unit: "m",
    cost: 16.00,
    supplier: "Tessuti Italiani SRL",
    status: "low",
  },
  {
    id: 3,
    code: "FRA001",
    name: "Palo Centrale Alluminio 3m",
    type: "frame_aluminum",
    current: 80,
    min: 20,
    max: 150,
    unit: "pz",
    cost: 45.00,
    supplier: "Telai Alluminio Roma",
    status: "optimal",
  },
  {
    id: 4,
    code: "FRA004",
    name: "Palo Centrale Legno Teak 3m",
    type: "frame_wood",
    current: 8,
    min: 10,
    max: 40,
    unit: "pz",
    cost: 85.00,
    supplier: "Componenti Legno Toscana",
    status: "critical",
  },
  {
    id: 5,
    code: "COM004",
    name: "Sistema LED Integrato",
    type: "lighting",
    current: 12,
    min: 10,
    max: 50,
    unit: "pz",
    cost: 95.00,
    supplier: "Telai Alluminio Roma",
    status: "low",
  },
  {
    id: 6,
    code: "COM001",
    name: "Corona Plastica Nera",
    type: "crown",
    current: 150,
    min: 40,
    max: 200,
    unit: "pz",
    cost: 8.50,
    supplier: "Telai Alluminio Roma",
    status: "optimal",
  },
]

const typeLabels = {
  fabric: "Tessuto",
  frame_aluminum: "Telaio Alluminio",
  frame_wood: "Telaio Legno",
  crown: "Corona",
  lever: "Leva",
  lighting: "Illuminazione",
  fasteners: "Minuteria",
}

const statusConfig = {
  optimal: {
    label: "Ottimale",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  low: {
    label: "Scorta Bassa",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  critical: {
    label: "Critico",
    color: "bg-red-100 text-red-700 border-red-200",
  },
}

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || material.type === typeFilter
    return matchesSearch && matchesType
  })

  const criticalCount = materials.filter((m) => m.status === "critical").length
  const lowCount = materials.filter((m) => m.status === "low").length
  const totalValue = materials.reduce((sum, m) => sum + m.current * m.cost, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Gestione Materiali
            </h1>
            <p className="text-slate-600 mt-1">
              Inventario e scorte materiali produzione
            </p>
          </div>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
            <Plus className="h-4 w-4" />
            Nuovo Materiale
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Totale Materiali
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {materials.length}
              </div>
              <p className="text-xs text-slate-500 mt-1">Tipologie attive</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Valore Inventario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                €{totalValue.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-slate-500 mt-1">Valore totale scorte</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Scorte Basse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{lowCount}</div>
              <p className="text-xs text-slate-500 mt-1">Sotto scorta minima</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                Alert Critici
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
              <p className="text-xs text-slate-500 mt-1">Riordino urgente</p>
            </CardContent>
          </Card>
        </div>

        {/* Materials Table */}
        <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Inventario Materiali</CardTitle>
                <CardDescription>
                  Gestisci scorte e materiali di produzione
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Cerca materiali..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tutti i tipi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i tipi</SelectItem>
                    <SelectItem value="fabric">Tessuti</SelectItem>
                    <SelectItem value="frame_aluminum">Telai Alluminio</SelectItem>
                    <SelectItem value="frame_wood">Telai Legno</SelectItem>
                    <SelectItem value="lighting">Illuminazione</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-semibold">Codice</TableHead>
                    <TableHead className="font-semibold">Nome Materiale</TableHead>
                    <TableHead className="font-semibold">Tipo</TableHead>
                    <TableHead className="font-semibold">Fornitore</TableHead>
                    <TableHead className="font-semibold">Scorta</TableHead>
                    <TableHead className="font-semibold">Disponibilità</TableHead>
                    <TableHead className="font-semibold">Stato</TableHead>
                    <TableHead className="font-semibold text-right">Costo/Unità</TableHead>
                    <TableHead className="font-semibold text-right">Valore Totale</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaterials.map((material) => {
                    const stockPercentage = (material.current / material.max) * 100
                    const status = statusConfig[material.status as keyof typeof statusConfig]

                    return (
                      <TableRow key={material.id} className="hover:bg-slate-50/50">
                        <TableCell className="font-mono font-medium">
                          {material.code}
                        </TableCell>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {typeLabels[material.type as keyof typeof typeLabels]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {material.supplier}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <span className="font-semibold">{material.current}</span>
                            <span className="text-slate-500"> / {material.max}</span>
                            <span className="text-xs text-slate-400 ml-1">{material.unit}</span>
                          </div>
                          {material.current < material.min && (
                            <div className="text-xs text-red-600 mt-1">
                              Min: {material.min} {material.unit}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 min-w-[100px]">
                            <Progress
                              value={stockPercentage}
                              className={cn(
                                "h-1.5",
                                material.status === "optimal" && "[&>div]:bg-green-500",
                                material.status === "low" && "[&>div]:bg-amber-500",
                                material.status === "critical" && "[&>div]:bg-red-500"
                              )}
                            />
                            <div className="text-xs text-slate-500">
                              {stockPercentage.toFixed(0)}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("border text-xs", status.color)}>
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          €{material.cost.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          €{(material.current * material.cost).toLocaleString('it-IT', {
                            minimumFractionDigits: 2
                          })}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        {(lowCount > 0 || criticalCount > 0) && (
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm border-l-4 border-l-amber-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    Materiali da Riordinare
                  </CardTitle>
                  <CardDescription>
                    Materiali sotto scorta minima che richiedono riordino
                  </CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Genera Ordine Acquisto
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {materials
                  .filter((m) => m.status !== "optimal")
                  .map((material) => (
                    <div
                      key={material.id}
                      className={cn(
                        "p-4 rounded-lg border-l-4",
                        material.status === "critical"
                          ? "bg-red-50 border-l-red-500"
                          : "bg-amber-50 border-l-amber-500"
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-slate-900">
                            {material.name}
                          </div>
                          <div className="text-xs text-slate-600 mt-1">
                            Cod: {material.code}
                          </div>
                        </div>
                        <Badge
                          className={cn(
                            "border text-xs",
                            statusConfig[material.status as keyof typeof statusConfig].color
                          )}
                        >
                          {statusConfig[material.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Disponibile:</span>
                          <span className="font-semibold">
                            {material.current} {material.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Minimo:</span>
                          <span className="font-medium">
                            {material.min} {material.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Da ordinare:</span>
                          <span className="font-semibold text-blue-600">
                            {Math.max(material.min - material.current, 0)} {material.unit}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3" variant="outline">
                        Ordina Ora
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
