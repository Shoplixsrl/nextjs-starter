import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Users,
  Euro,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Plus,
} from 'lucide-react';

export default function DashboardPage() {
  // Mock data - in produzione verrà dal database
  const stats = {
    totalRevenue: 125430.50,
    revenueGrowth: 12.5,
    invoicesSent: 234,
    invoicesGrowth: 8.2,
    activeClients: 89,
    clientsGrowth: 15.3,
    averagePaymentTime: 28,
    paymentTimeChange: -5.2, // negative is good!
  };

  const recentInvoices = [
    { id: '2025/0042', client: 'Acme Corp SRL', amount: 2450.00, status: 'paid', date: '2025-11-20' },
    { id: '2025/0041', client: 'TechStart Italia', amount: 1890.00, status: 'sent', date: '2025-11-19' },
    { id: '2025/0040', client: 'Studio Rossi', amount: 3200.00, status: 'overdue', date: '2025-11-15' },
    { id: '2025/0039', client: 'Green Energy SPA', amount: 5600.00, status: 'paid', date: '2025-11-14' },
  ];

  const upcomingPayments = [
    { client: 'Acme Corp SRL', amount: 1200.00, dueDate: '2025-11-25' },
    { client: 'Digital Solutions', amount: 3400.00, dueDate: '2025-11-28' },
    { client: 'Farmacia Centrale', amount: 890.00, dueDate: '2025-12-01' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600 mt-1">Benvenuto, ecco il riepilogo della tua attività</p>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="mr-2 w-5 h-5" />
              Nuova Fattura
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Fatturato Totale</CardDescription>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Euro className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                €{stats.totalRevenue.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">+{stats.revenueGrowth}%</span>
                <span className="text-gray-600">vs mese scorso</span>
              </div>
            </CardContent>
          </Card>

          {/* Invoices Card */}
          <Card className="border-l-4 border-l-purple-600">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Fatture Emesse</CardDescription>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.invoicesSent}</div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">+{stats.invoicesGrowth}%</span>
                <span className="text-gray-600">vs mese scorso</span>
              </div>
            </CardContent>
          </Card>

          {/* Clients Card */}
          <Card className="border-l-4 border-l-green-600">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Clienti Attivi</CardDescription>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeClients}</div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">+{stats.clientsGrowth}%</span>
                <span className="text-gray-600">vs mese scorso</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Time Card */}
          <Card className="border-l-4 border-l-orange-600">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Tempo Medio Pagamento</CardDescription>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.averagePaymentTime} giorni</div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <ArrowDownRight className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">{Math.abs(stats.paymentTimeChange)}%</span>
                <span className="text-gray-600">più veloce</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Invoices */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Fatture Recenti</CardTitle>
                  <Button variant="outline" size="sm">Vedi Tutte</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-semibold">{invoice.client}</div>
                          <div className="text-sm text-gray-600">Fattura #{invoice.id}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          €{invoice.amount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="mt-1">
                          {invoice.status === 'paid' && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Pagata
                            </Badge>
                          )}
                          {invoice.status === 'sent' && (
                            <Badge variant="outline" className="text-blue-700 border-blue-300">
                              <Clock className="w-3 h-3 mr-1" />
                              Inviata
                            </Badge>
                          )}
                          {invoice.status === 'overdue' && (
                            <Badge variant="destructive">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Scaduta
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Insights Card */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-purple-100">
                  <div className="text-sm font-medium mb-1">💡 Consiglio del giorno</div>
                  <div className="text-sm text-gray-600">
                    3 clienti hanno superato i 30 giorni di scadenza. Invia un reminder automatico?
                  </div>
                  <Button size="sm" variant="link" className="px-0 mt-2">
                    Invia Ora →
                  </Button>
                </div>
                <div className="p-3 bg-white rounded-lg border border-blue-100">
                  <div className="text-sm font-medium mb-1">📊 Previsione</div>
                  <div className="text-sm text-gray-600">
                    Previsto un incremento del 18% nel fatturato del prossimo mese.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Payments */}
            <Card>
              <CardHeader>
                <CardTitle>Prossimi Incassi</CardTitle>
                <CardDescription>Scadenze in arrivo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingPayments.map((payment, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium text-sm">{payment.client}</div>
                      <div className="text-xs text-gray-600">Scadenza: {payment.dueDate}</div>
                    </div>
                    <div className="font-bold">
                      €{payment.amount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
