# GitHub Actions Deploy Setup per Vercel

Questa guida ti aiuterà a configurare il deploy automatico su Vercel tramite GitHub Actions.

## Prerequisiti

1. Account Vercel (https://vercel.com)
2. Progetto già collegato a Vercel o pronto per essere collegato
3. Accesso alle impostazioni del repository GitHub

## Passo 1: Ottenere i Token e ID da Vercel

### 1.1 Vercel Token

1. Vai su https://vercel.com/account/tokens
2. Clicca su **Create Token**
3. Dai un nome al token (es. "GitHub Actions Deploy")
4. Scegli lo scope appropriato (consigliato: Full Account)
5. Copia il token generato (lo vedrai solo una volta!)

### 1.2 Vercel Organization ID

1. Vai su https://vercel.com
2. Vai nelle impostazioni del tuo team/organizzazione
3. Nella tab **General**, trovi il **Team ID** (questo è il tuo `VERCEL_ORG_ID`)
4. Oppure usa il comando CLI:
   ```bash
   vercel whoami
   ```

### 1.3 Vercel Project ID

Opzione A - Dal dashboard Vercel:
1. Apri il tuo progetto su Vercel
2. Vai in **Settings** → **General**
3. Trovi il **Project ID**

Opzione B - Tramite CLI:
```bash
# Dalla root del progetto
vercel link
# Questo creerà un file .vercel/project.json con il project ID
cat .vercel/project.json
```

## Passo 2: Configurare i GitHub Secrets

1. Vai nel tuo repository GitHub
2. Vai in **Settings** → **Secrets and variables** → **Actions**
3. Clicca su **New repository secret**
4. Aggiungi questi 3 secrets:

| Nome Secret | Valore | Descrizione |
|-------------|--------|-------------|
| `VERCEL_TOKEN` | Il token creato al passo 1.1 | Token di autenticazione Vercel |
| `VERCEL_ORG_ID` | Il tuo Organization/Team ID | ID dell'organizzazione Vercel |
| `VERCEL_PROJECT_ID` | Il tuo Project ID | ID del progetto Vercel |

## Passo 3: Verifica il Workflow

1. Fai un commit e push al branch `main` o crea una Pull Request
2. Vai nella tab **Actions** del tuo repository GitHub
3. Verifica che il workflow "Deploy to Vercel" sia in esecuzione
4. Se tutto è configurato correttamente, vedrai:
   - ✅ Build completata
   - ✅ Deploy su Vercel (Preview per PR, Production per push su main)
   - 💬 Commento automatico nella PR con l'URL di preview

## Come Funziona

### Deploy Automatici

- **Push su `main`/`master`**: Deploy in **Production**
- **Pull Request**: Deploy in **Preview** con URL temporaneo
- **Commento automatico**: Ogni PR riceverà un commento con l'URL di preview

### Steps del Workflow

1. **Checkout**: Scarica il codice
2. **Setup Bun**: Installa Bun runtime
3. **Install**: Installa le dipendenze
4. **Lint**: Esegue ESLint
5. **Build**: Compila il progetto Next.js
6. **Vercel CLI**: Installa Vercel CLI
7. **Deploy**: Deploya su Vercel (preview o production)
8. **Comment**: Commenta la PR con l'URL (solo per PR)

## Troubleshooting

### Errore: "Missing required secrets"
- Verifica che tutti e 3 i secrets siano configurati correttamente in GitHub

### Errore: "Invalid token"
- Rigenera il token Vercel e aggiorna il secret `VERCEL_TOKEN`

### Errore: "Project not found"
- Verifica che il `VERCEL_PROJECT_ID` sia corretto
- Assicurati che il progetto esista su Vercel

### Build fallisce localmente ma non su Vercel
- Il workflow esegue `bun run build` prima del deploy
- Se il build locale fallisce, anche il workflow fallirà
- Esegui `bun run build` localmente per debuggare

## Variabili d'Ambiente

Se il tuo progetto usa variabili d'ambiente (es. `DATABASE_URL`):

1. Aggiungile in Vercel Dashboard: **Project Settings** → **Environment Variables**
2. Il comando `vercel pull` nel workflow le scaricherà automaticamente
3. Oppure aggiungile come GitHub Secrets e passale al build:

```yaml
- name: Build project
  run: bun run build
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## Deploy Manuale (Fallback)

Se preferisci il deploy manuale o hai problemi con GitHub Actions:

```bash
# Install Vercel CLI
bun add -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

## Workflow Alternativo: Solo Vercel Integration

Se preferisci, puoi anche usare l'integrazione nativa di Vercel con GitHub:

1. Vai su https://vercel.com/new
2. Importa il repository GitHub
3. Vercel creerà deploy automatici senza bisogno di GitHub Actions

**Pro**: Setup più semplice, nessun secret da configurare
**Contro**: Meno controllo sul processo di build/test
