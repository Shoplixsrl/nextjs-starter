"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Plus, Building2, User, Mail, Phone, MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const customers = [
  {
    id: 1,
    code: "CLI001",
    name: "Hotel Mediterraneo SRL",
    type: "business",
    email: "acquisti@hotelmediterraneo.it",
    phone: "+39 081 1234567",
    city: "Napoli",
    totalOrders: 15,
    totalRevenue: 45000,
    rating: 5,
  },
  {
    id: 2,
    code: "CLI002",
    name: "Ristorante Il Giardino",
    type: "business",
    email: "info@ristoranteilgiardino.it",
    phone: "+39 06 7654321",
    city: "Roma",
    totalOrders: 8,
    totalRevenue: 12000,
    rating: 4,
  },
  {
    id: 3,
    code: "CLI003",
    name: "Maria Ferrari",
    type: "private",
    email: "maria.ferrari@email.it",
    phone: "+39 338 1234567",
    city: "Milano",
    totalOrders: 2,
    totalRevenue: 1800,
    rating: 5,
  },
]

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Gestione Clienti
            </h1>
            <p className="text-slate-600 mt-1">
              CRM e anagrafica clienti
            </p>
          </div>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
            <Plus className="h-4 w-4" />
            Nuovo Cliente
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Totale Clienti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{customers.length}</div>
              <p className="text-xs text-slate-500 mt-1">Clienti attivi</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Business
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {customers.filter(c => c.type === "business").length}
              </div>
              <p className="text-xs text-slate-500 mt-1">Aziende</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Privati
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">
                {customers.filter(c => c.type === "private").length}
              </div>
              <p className="text-xs text-slate-500 mt-1">Clienti privati</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Fatturato Totale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                €{customers.reduce((sum, c) => sum + c.totalRevenue, 0).toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">Lifetime value</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Elenco Clienti</CardTitle>
            <CardDescription>Gestisci la tua base clienti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="p-4 rounded-lg border border-slate-200 bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600">
                        <AvatarFallback className="text-white font-semibold">
                          {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-900">{customer.name}</div>
                        <div className="text-xs text-slate-500">{customer.code}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {customer.type === "business" ? <Building2 className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                      {customer.type === "business" ? "Azienda" : "Privato"}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="h-4 w-4" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-4 w-4" />
                      <span>{customer.city}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="text-slate-500">Ordini</div>
                        <div className="font-semibold text-slate-900">{customer.totalOrders}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-500">Fatturato</div>
                        <div className="font-semibold text-green-600">€{customer.totalRevenue.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{customer.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
