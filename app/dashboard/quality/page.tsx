"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardCheck, Plus } from "lucide-react"

export default function QualityPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Controllo Qualità
            </h1>
            <p className="text-slate-600 mt-1">
              Ispezioni e checklist qualità produzione
            </p>
          </div>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
            <Plus className="h-4 w-4" />
            Nuova Ispezione
          </Button>
        </div>

        <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Modulo Qualità
            </CardTitle>
            <CardDescription>
              Funzionalità in sviluppo - Sistema completo di controllo qualità
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Questa sezione permetterà di eseguire controlli qualità per ogni fase,
              gestire difetti e azioni correttive.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
