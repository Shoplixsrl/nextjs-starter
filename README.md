# Serenity - Meditation App 🧘‍♀️

Una bellissima app di meditazione creata con Expo React Native, con palette di colori pastello lilla/azzurro e animazioni rilassanti.

## ✨ Features

- 🎨 **UI Calma e Rilassante**: Design ispirato a Calm e Headspace con palette pastello
- ⏱️ **Timer di Meditazione**: Timer animato con guida alla respirazione
- 🌸 **Onboarding Illustrato**: Schermata di benvenuto con animazioni fade
- 🎵 **Effetti Sonori Mock**: Supporto audio per meditazioni guidate
- 💫 **Animazioni Fluide**: Fade, blur, e breathing animations con Reanimated
- 📱 **Expo Router**: Navigazione moderna e file-based routing
- 💾 **Mock Data**: Nessun database, tutto in JSON locale

## 🎨 Color Palette

- **Lavender**: `#E6E6FA`
- **Powder Blue**: `#B0E0E6`
- **Thistle**: `#D8BFD8`
- **Sky Blue**: `#87CEEB`

## 📁 Struttura Progetto

```
.
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home (lista meditazioni)
│   ├── onboarding.tsx     # Onboarding
│   └── meditation/
│       └── [id].tsx       # Sessione meditazione
├── components/            # Componenti riutilizzabili
│   ├── BreathingCircle.tsx
│   ├── MeditationTimer.tsx
│   └── GradientButton.tsx
├── constants/             # Tema e colori
│   ├── Colors.ts
│   └── Theme.ts
├── data/                  # Mock data JSON
│   ├── meditations.json
│   └── onboarding.json
├── types/                 # TypeScript types
│   └── index.ts
└── assets/               # Immagini e suoni
```

## 🚀 Quick Start

### Installazione

```bash
# Installa dipendenze
npm install
```

### Development

```bash
# Avvia il server di sviluppo
npm start

# Avvia su iOS
npm run ios

# Avvia su Android
npm run android

# Avvia su Web
npm run web
```

### Build

```bash
# Crea build di produzione
npm run build

# Prebuild per sviluppo nativo
npm run prebuild
```

## 📱 Schermate

### Onboarding
- 3 slide animate con emoji e testo
- Pulsante "Salta" in alto a destra
- Paginazione con dots animati
- Animazioni fade-in per testo

### Home
- Lista di sessioni di meditazione
- Card con gradienti per categoria
- Badge durata
- Animazioni staggered all'apertura

### Meditazione
- Cerchio animato per guida respirazione (4s inhale, 2s hold, 4s exhale, 2s hold)
- Timer countdown
- Controlli play/pause
- Blur overlay quando attivo
- Schermata completamento con celebrazione

## 🎵 Audio Mock

L'audio è configurato con Expo AV ma usa URL di esempio. Per produzione:

1. Aggiungi file audio in `assets/sounds/`
2. Aggiorna i path in `data/meditations.json`
3. Carica gli asset con `require()`

## 🔧 Tecnologie

- **Expo SDK 52**
- **React Native 0.76.5**
- **Expo Router 4.0** - File-based routing
- **Reanimated 3.16** - Animazioni performanti
- **Expo Linear Gradient** - Gradienti
- **Expo Blur** - Effetti blur
- **Expo AV** - Audio playback
- **Expo Haptics** - Feedback tattile
- **AsyncStorage** - Persistenza locale
- **TypeScript** - Type safety

## 📝 Note

- **Nessun Database**: Tutti i dati sono in file JSON mock
- **Build Obbligatoria**: Esegui `npm run build` prima di ogni commit (se configurato con pre-commit hook)
- **Assets Placeholder**: I file icone/splash sono placeholder, sostituirli per produzione

## 🎯 Prossimi Passi

- [ ] Aggiungere file audio reali
- [ ] Aggiungere illustrazioni personalizzate
- [ ] Implementare tracciamento progresso utente
- [ ] Aggiungere più categorie di meditazione
- [ ] Dark mode
- [ ] Notifiche per promemoria giornalieri
- [ ] Condivisione social

## 📄 Licenza

Questo è un template di esempio. Personalizzalo come preferisci!

---

**Fatto con 💜 usando Expo & React Native**
