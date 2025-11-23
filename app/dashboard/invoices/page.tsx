'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FileText,
  Upload,
  Camera,
  CheckCircle2,
  Clock,
  Sparkles,
  Eye,
  Trash2,
} from 'lucide-react';
import { format } from 'date-fns';

export default function InvoicesPage() {
  const [invoices] = useState([
    {
      id: '1',
      invoiceNumber: 'INV-2025-001',
      supplier: 'Fresh Farms Co.',
      date: new Date('2025-11-22'),
      total: 1245.50,
      status: 'processed',
      items: 8,
      scannedAt: new Date('2025-11-22T09:15:00'),
      aiConfidence: 98,
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-002',
      supplier: 'Italian Imports Ltd',
      date: new Date('2025-11-21'),
      total: 890.30,
      status: 'processing',
      items: 5,
      scannedAt: new Date('2025-11-21T14:30:00'),
      aiConfidence: 95,
    },
    {
      id: '3',
      invoiceNumber: 'INV-2025-003',
      supplier: 'Quality Meats Inc',
      date: new Date('2025-11-20'),
      total: 2340.00,
      status: 'processed',
      items: 12,
      scannedAt: new Date('2025-11-20T11:45:00'),
      aiConfidence: 99,
    },
  ]);

  const statusColors = {
    processed: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400',
    processing: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
    pending: 'bg-slate-50 text-slate-700 dark:bg-slate-950/50 dark:text-slate-400',
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-indigo-500" />
            Invoice Scanning
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            AI-powered invoice processing and data extraction
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Invoice</DialogTitle>
              <DialogDescription>
                Upload a photo or PDF of your supplier invoice for automatic processing
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-12 text-center hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                <p className="text-lg font-semibold mb-2">Drop invoice here or click to browse</p>
                <p className="text-sm text-slate-500">
                  Supports PDF, JPG, PNG up to 10MB
                </p>
              </div>

              {/* Camera Option */}
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-3">or</p>
                <Button variant="outline" className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo with Camera
                </Button>
              </div>

              {/* AI Processing Info */}
              <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-900">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-1">
                      AI-Powered Extraction
                    </h4>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300">
                      Our AI automatically extracts supplier info, items, quantities, prices,
                      and totals. Review and approve before adding to your inventory.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Invoices This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              +12% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€24,567</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              AI Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.3%</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Average confidence
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Time Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.5 hrs</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>
            All your supplier invoices processed with AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>AI Confidence</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <div className="font-medium">{invoice.invoiceNumber}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{invoice.supplier}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(invoice.date, 'MMM dd, yyyy')}
                    </div>
                    <div className="text-xs text-slate-500">
                      Scanned {format(invoice.scannedAt, 'HH:mm')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{invoice.items} items</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">€{invoice.total.toFixed(2)}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 font-medium"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      {invoice.aiConfidence}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {invoice.status === 'processed' ? (
                      <Badge className={statusColors.processed}>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Processed
                      </Badge>
                    ) : (
                      <Badge className={statusColors.processing}>
                        <Clock className="h-3 w-3 mr-1" />
                        Processing
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            How AI Invoice Processing Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Upload or Scan</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Take a photo of the invoice or upload a PDF file
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">AI Extraction</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Our AI reads and extracts all data (supplier, items, prices, totals)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Auto-Sync</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Data automatically syncs to inventory and updates prices
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
