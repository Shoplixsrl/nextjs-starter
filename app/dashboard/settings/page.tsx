"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Impostazioni
          </h1>
          <p className="text-slate-600 mt-1">
            Configurazione sistema e preferenze
          </p>
        </div>

        <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurazione Sistema
            </CardTitle>
            <CardDescription>
              Funzionalità in sviluppo - Impostazioni e configurazioni
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Questa sezione permetterà di configurare utenti, permessi,
              preferenze aziendali e integrazioni.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
