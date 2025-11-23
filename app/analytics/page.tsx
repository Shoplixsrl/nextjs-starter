"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Eye,
  QrCode,
  MapPin,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Users,
  DollarSign,
  Award
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Mock data - in production this comes from database
const menuViewsData = [
  { date: "Mon", views: 245, scans: 89 },
  { date: "Tue", views: 312, scans: 102 },
  { date: "Wed", views: 289, scans: 95 },
  { date: "Thu", views: 398, scans: 134 },
  { date: "Fri", views: 567, scans: 198 },
  { date: "Sat", views: 823, scans: 301 },
  { date: "Sun", views: 734, scans: 267 },
];

const deviceData = [
  { name: "Mobile", value: 68, color: "#8B5CF6" },
  { name: "Desktop", value: 22, color: "#EC4899" },
  { name: "Tablet", value: 10, color: "#3B82F6" },
];

const topItems = [
  { name: "Spaghetti Carbonara", views: 1243, orders: 98, revenue: 1568 },
  { name: "Margherita Pizza", views: 1102, orders: 87, revenue: 1218 },
  { name: "Tiramisu", views: 987, orders: 76, revenue: 684 },
  { name: "Bruschetta", views: 876, orders: 71, revenue: 603.50 },
  { name: "Risotto ai Funghi", views: 734, orders: 58, revenue: 1102 },
];

const qrLocations = [
  { location: "Table 1-5", scans: 234, avgTime: "12:34" },
  { location: "Table 6-10", scans: 198, avgTime: "11:23" },
  { location: "Bar Counter", scans: 167, avgTime: "8:45" },
  { location: "Terrace", scans: 142, avgTime: "15:12" },
  { location: "Private Room", scans: 45, avgTime: "18:56" },
];

const peakHours = [
  { hour: "09:00", scans: 12 },
  { hour: "10:00", scans: 18 },
  { hour: "11:00", scans: 34 },
  { hour: "12:00", scans: 89 },
  { hour: "13:00", scans: 123 },
  { hour: "14:00", scans: 76 },
  { hour: "15:00", scans: 45 },
  { hour: "16:00", scans: 23 },
  { hour: "17:00", scans: 34 },
  { hour: "18:00", scans: 67 },
  { hour: "19:00", scans: 156 },
  { hour: "20:00", scans: 198 },
  { hour: "21:00", scans: 167 },
  { hour: "22:00", scans: 89 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Real-time insights and performance metrics
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700">Live</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="w-4 h-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,368</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +23.5% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">QR Scans</CardTitle>
              <QrCode className="w-4 h-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,186</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +18.2% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              <Clock className="w-4 h-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4:32</div>
              <p className="text-xs text-slate-600">minutes per visit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="w-4 h-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +12.8% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items">Menu Items</TabsTrigger>
            <TabsTrigger value="qr">QR Codes</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Views Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Menu Views & QR Scans</CardTitle>
                <CardDescription>Last 7 days performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={menuViewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      name="Views"
                    />
                    <Line
                      type="monotone"
                      dataKey="scans"
                      stroke="#EC4899"
                      strokeWidth={2}
                      name="Scans"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Device Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Device Distribution</CardTitle>
                  <CardDescription>How customers view your menu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name} ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <Smartphone className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="font-bold">68%</div>
                      <div className="text-xs text-slate-600">Mobile</div>
                    </div>
                    <div className="text-center">
                      <Monitor className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                      <div className="font-bold">22%</div>
                      <div className="text-xs text-slate-600">Desktop</div>
                    </div>
                    <div className="text-center">
                      <Tablet className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-bold">10%</div>
                      <div className="text-xs text-slate-600">Tablet</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Peak Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Peak Hours</CardTitle>
                  <CardDescription>When customers scan your menu</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={peakHours}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="scans" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="items" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Items</CardTitle>
                <CardDescription>Most viewed and ordered dishes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topItems.map((item, idx) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {item.views} views • {item.orders} orders
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          €{item.revenue.toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-600">revenue</div>
                      </div>
                      {idx === 0 && (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          <Award className="w-3 h-3 mr-1" />
                          Top
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qr" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Performance by Location</CardTitle>
                <CardDescription>Track which tables generate most scans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qrLocations.map((location) => (
                    <div
                      key={location.location}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <div className="flex-1">
                        <div className="font-semibold">{location.location}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Avg. session: {location.avgTime}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">
                          {location.scans}
                        </div>
                        <div className="text-xs text-slate-600">scans</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>Powered by advanced analytics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-green-900 dark:text-green-100">
                          Increase Carbonara Price
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          High demand (98 orders) suggests you can increase price by 10-15% without impacting sales
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-blue-900 dark:text-blue-100">
                          Promote Risotto ai Funghi
                        </div>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                          High views (734) but lower orders suggest better photos or description needed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-purple-900 dark:text-purple-100">
                          Add Happy Hour Menu
                        </div>
                        <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                          Peak traffic at 12-1pm and 7-9pm. Consider special lunch and dinner menus
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Optimization</CardTitle>
                  <CardDescription>Maximize your profitability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Current Food Cost</span>
                      <span className="text-2xl font-bold text-orange-600">32%</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      Target: 28-30% • Potential savings: €450/week
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Menu Contribution Margin</span>
                      <span className="text-2xl font-bold text-green-600">68%</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      Above average! Your menu pricing is optimized
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Predicted Weekly Revenue</span>
                      <span className="text-2xl font-bold text-purple-600">€5,287</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      Based on current trends and AI forecasting
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
