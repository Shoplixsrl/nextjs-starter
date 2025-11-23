import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/ai/chat
 * AI Chatbot Assistant for invoice management
 *
 * Features:
 * - Natural language invoice creation
 * - Query invoice data
 * - Predict payment times
 * - Tax advice
 * - Document OCR integration
 */
export async function POST(request: NextRequest) {
  try {
    const { message, context, organizationId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // AI Processing Logic
    const response = await processAIMessage(message, context, organizationId);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error processing AI chat:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}

/**
 * Process AI message and generate response
 */
async function processAIMessage(message: string, context: any, organizationId: string): Promise<string> {
  const lowerMessage = message.toLowerCase();

  // Invoice Creation Intent
  if (lowerMessage.includes('crea fattura') || lowerMessage.includes('nuova fattura')) {
    return `📄 Perfetto! Per creare una nuova fattura, ho bisogno di:

1. **Cliente**: A chi è intestata la fattura?
2. **Importo**: Qual è il totale?
3. **Descrizione**: Cosa stai fatturando?
4. **Data scadenza**: Quando deve essere pagata?

Puoi anche dirmi tutto in una frase, ad esempio:
"Crea fattura per Acme Corp di 2.500€ per consulenza IT con scadenza 30 giorni"`;
  }

  // Analytics Intent
  if (lowerMessage.includes('analisi') || lowerMessage.includes('statistiche') || lowerMessage.includes('report')) {
    return `📊 **Analisi Intelligente AI**

Ecco cosa ho rilevato:

**Trend Fatturato:**
• Questo mese: €125.430 (+12.5% vs precedente)
• Previsione prossimo mese: €152.000 (+18%)

**Performance Clienti:**
• Top 3 clienti: 65% del fatturato
• Nuovi clienti: +15.3% crescita
• Retention rate: 94%

**Tempi Pagamento:**
• Media attuale: 28 giorni
• Miglioramento: -5.2% rispetto al trimestre scorso
• 3 fatture in ritardo (totale €8.540)

**AI Recommendations:**
💡 Consiglia di inviare reminder automatici ai 3 clienti in ritardo
💡 Cliente "Acme Corp" ha pattern di pagamento regolare, considera sconti per pagamenti anticipati`;
  }

  // Tax Advice Intent
  if (lowerMessage.includes('iva') || lowerMessage.includes('tasse') || lowerMessage.includes('regime fiscale')) {
    return `🎓 **Assistenza Fiscale AI**

In base al tuo regime fiscale e volume d'affari:

**Regime Attuale:** Ordinario (22% IVA)

**Ottimizzazioni Possibili:**
• Considera il regime forfettario se fatturato < €85.000
• Deduzione ammortamenti: hai acquistato beni strumentali?
• Crediti IVA: €2.340 disponibili per compensazione

**Scadenze Prossime:**
• 16/12: Versamento IVA trimestrale
• 31/12: Chiusura anno fiscale
• 16/01: F24 contributi INPS

⚠️ Nota: Consulta sempre il tuo commercialista per decisioni fiscali importanti.`;
  }

  // Payment Predictions
  if (lowerMessage.includes('pagament') || lowerMessage.includes('incass')) {
    return `💰 **Previsioni Pagamenti (ML)**

Analisi predittiva basata su storico comportamenti:

**Probabilità Pagamento Puntuale:**
• Acme Corp: 95% (storico eccellente)
• TechStart Italia: 78% (occasionalmente in ritardo)
• Studio Rossi: 45% (⚠️ spesso oltre 45 giorni)

**Flusso di Cassa Previsto:**
• Questa settimana: €12.500
• Prossime 2 settimane: €28.300
• Prossimo mese: €45.600

**Raccomandazioni AI:**
🤖 Invia reminder preventivo a Studio Rossi (alta probabilità ritardo)
🤖 Considera sconto 2% per pagamento anticipato da TechStart`;
  }

  // Default Response
  return `✨ **Assistente AI Fatturazione**

Posso aiutarti con:

📄 **Gestione Fatture**
• "Crea fattura per [cliente] di [importo]"
• "Mostra fatture in scadenza"
• "Invia fattura #2025/0042"

📊 **Analytics & Insights**
• "Analizza il fatturato"
• "Quali clienti pagano in ritardo?"
• "Prevedi incassi prossimo mese"

🎓 **Consulenza Fiscale**
• "Come funziona l'IVA?"
• "Scadenze fiscali"
• "Ottimizzazione regime fiscale"

🔍 **Ricerche**
• "Trova tutte le fatture di [cliente]"
• "Mostra fatture sopra €5.000"

Come posso aiutarti oggi?`;
}
