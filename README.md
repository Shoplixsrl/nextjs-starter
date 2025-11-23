# 🌂 UmbrellaCloud - Piattaforma Gestionale Produzione Ombrelloni

Una piattaforma gestionale all'avanguardia per la produzione artigianale di ombrelloni, gazebo e pergole. Progettata per superare i competitor come LAPI SRL con funzionalità avanzate, UI moderna e gestione completa del ciclo produttivo.

## ✨ Caratteristiche Principali

### 🎯 Gestione Completa Produzione
- **Ordini**: Sistema completo di gestione ordini con stati, priorità e tracking
- **Produzione**: Timeline produttiva con 6 fasi di lavorazione monitorate in tempo reale
- **Materiali**: Gestione inventario intelligente con alert scorte minime
- **Qualità**: Sistema di controllo qualità per ogni fase produttiva
- **CRM Clienti**: Anagrafica completa con storico ordini e fatturato
- **Fornitori**: Gestione fornitori e ordini di acquisto

### 📊 Analytics e Reporting
- Dashboard KPI in tempo reale
- Grafici di produzione e efficienza
- Alert automatici per materiali sotto scorta
- Tracking avanzamento ordini con progress bar

### 🎨 Design Moderno
- UI sublime con componenti shadcn/ui
- Gradients e animazioni fluide
- Layout responsive e mobile-friendly
- Sidebar moderna con navigazione intuitiva
- Color scheme professionale blu/indigo

## 🏭 Processo Produttivo (6 Fasi)

Basato sulla ricerca del processo produttivo reale degli ombrelloni artigianali:

1. **Stampa Personalizzata** - Stampa digitale/serigrafica su tessuto
2. **Taglio e Cucitura** - Taglio pannelli e cucitura elementi
3. **Preparazione Telaio** - Preparazione stecche, leva e corona
4. **Assemblaggio Telaio** - Assemblaggio con viti e bulloni
5. **Assemblaggio Finale** - Montaggio tessuto su telaio
6. **Controllo Qualità** - Ispezione finale e packaging

## 🗄️ Database Schema

### Tabelle Principali (16 tabelle)
- `users` - Utenti sistema (admin, production, sales, quality)
- `customers` - Anagrafica clienti business e privati
- `products` - Catalogo prodotti (ombrelloni, gazebo, pergole)
- `orders` - Ordini clienti con stati e tracking
- `production_orders` - Ordini di produzione con pianificazione
- `production_phases` - 6 fasi di produzione
- `production_tracking` - Tracking avanzamento fasi
- `materials` - Materiali (tessuti, telai, componenti)
- `bill_of_materials` - Distinte base prodotti
- `inventory_movements` - Movimenti di magazzino
- `suppliers` - Fornitori
- `purchase_orders` - Ordini ai fornitori
- `quality_checks` - Controlli qualità

## 🚀 Stack Tecnologico

- **Framework**: Next.js 15.4.6 (App Router)
- **UI**: shadcn/ui + Radix UI + Tailwind CSS v4
- **Database**: Drizzle ORM + Neon PostgreSQL
- **Language**: TypeScript (strict mode)
- **Icons**: Lucide React
- **Package Manager**: Bun

## 📦 Installazione

```bash
# Installa dipendenze
bun install

# Configura DATABASE_URL in .env.local
cp .env.example .env.local
# Modifica .env.local con il tuo Neon PostgreSQL URL

# Genera migrazioni database
bunx drizzle-kit generate

# Applica migrazioni
bunx drizzle-kit migrate

# Popola database con dati di esempio (opzionale)
bun run lib/db/seed.ts

# Avvia development server
bun run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## 🗺️ Struttura Moduli

### Dashboard (`/dashboard`)
- KPI cards (ordini attivi, in produzione, fatturato, alert)
- Ordini recenti con progress
- Stato produzione per fase
- Alert materiali sotto scorta

### Ordini (`/dashboard/orders`)
- Tabella completa ordini con filtri
- Stati: bozza, confermato, in produzione, completato, consegnato
- Priorità: alta, media, bassa
- Dialog creazione nuovo ordine

### Produzione (`/dashboard/production`)
- Timeline ordini in lavorazione
- Progress bar per ogni fase (6 fasi)
- Stato utilizzo postazioni di lavoro
- Dialog dettaglio con tracking completo

### Materiali (`/dashboard/materials`)
- Inventario completo con scorte
- Progress bar disponibilità
- Alert automatici scorte basse/critiche
- Gestione tessuti, telai, componenti

### Clienti (`/dashboard/customers`)
- Anagrafica clienti business e privati
- Storico ordini e fatturato
- Rating e valutazioni

## 📊 Vantaggi Competitivi vs LAPI SRL

Basato sulla ricerca di LAPI Ombrelloni (Roma):

1. **Digitalizzazione Completa** - Sistema cloud 100% vs. processi tradizionali
2. **Real-time Tracking** - Monitoraggio live di tutte le 6 fasi produttive
3. **Analytics Avanzate** - KPI e reporting automatizzati
4. **Scalabilità** - Architettura cloud-native serverless
5. **UI Moderna** - Interfaccia intuitiva di nuova generazione
6. **Integrazione Completa** - Tutti i processi in un'unica piattaforma
7. **Mobile Ready** - Accessibile da qualsiasi dispositivo

## 🔐 Ruoli Utente

- **Admin** - Accesso completo a tutti i moduli
- **Manager** - Gestione ordini, produzione, clienti
- **Production** - Visualizzazione e aggiornamento produzione
- **Sales** - Gestione ordini e clienti
- **Quality** - Controlli qualità e ispezioni

## 📝 Database Commands

```bash
# Genera migrazioni da schema changes
bunx drizzle-kit generate

# Applica migrazioni
bunx drizzle-kit migrate

# Push schema direttamente (dev)
bunx drizzle-kit push

# Apri Drizzle Studio GUI
bunx drizzle-kit studio
```

## 🚀 Deployment

Deploy su Vercel:
```bash
# Configura environment variables:
# - DATABASE_URL (Neon PostgreSQL)

# Deploy automatico da Git push
git push origin main
```

---

**Built with Next.js 15 + shadcn/ui + Drizzle ORM**
