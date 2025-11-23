"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Analytics e Reporting
          </h1>
          <p className="text-slate-600 mt-1">
            Dashboard analitiche e report avanzati
          </p>
        </div>

        <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Modulo Analytics
            </CardTitle>
            <CardDescription>
              Funzionalità in sviluppo - Dashboard e report avanzati
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Questa sezione conterrà grafici avanzati, report di produzione,
              analisi dei costi e previsioni.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
