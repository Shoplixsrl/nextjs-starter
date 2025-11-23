import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Ciao! Sono il tuo assistente AI per la fatturazione. Come posso aiutarti oggi?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('fattura') || lowerInput.includes('invoice')) {
      return '📄 Posso aiutarti a creare una nuova fattura! Dimmi:\n\n1. Nome del cliente\n2. Importo\n3. Descrizione dei servizi\n\nOppure usa il comando vocale: "Crea fattura per [cliente] di [importo] euro"';
    }

    if (lowerInput.includes('cliente') || lowerInput.includes('customer')) {
      return '👥 Hai 89 clienti attivi. I più importanti per fatturato sono:\n\n1. Acme Corp SRL - €45.200\n2. TechStart Italia - €32.800\n3. Green Energy SPA - €28.500\n\nVuoi vedere altri dettagli?';
    }

    if (lowerInput.includes('pagamento') || lowerInput.includes('payment')) {
      return '💰 Analisi pagamenti:\n\n• Tempo medio: 28 giorni (-5.2%)\n• In ritardo: 3 fatture (€8.540)\n• In scadenza: 5 fatture (€12.300)\n\nVuoi che invii i reminder automatici?';
    }

    if (lowerInput.includes('previsione') || lowerInput.includes('forecast')) {
      return '📊 Previsioni AI per il prossimo mese:\n\n• Fatturato stimato: €152.000 (+18%)\n• Nuovi clienti previsti: 12-15\n• Tasso incasso: 94%\n\nBasato su machine learning degli ultimi 12 mesi.';
    }

    return '✨ Ho capito la tua richiesta! Alcune cose che posso fare:\n\n• Creare fatture con comando vocale\n• Analizzare trend e previsioni\n• Gestire scadenze e pagamenti\n• Suggerire ottimizzazioni fiscali\n• Rispondere a domande sulla normativa\n\nCosa ti serve?';
  };

  const quickActions = [
    { icon: 'add-circle', text: 'Nuova Fattura', color: '#3B82F6' },
    { icon: 'analytics', text: 'Analytics', color: '#8B5CF6' },
    { icon: 'notifications', text: 'Scadenze', color: '#F59E0B' },
    { icon: 'help-circle', text: 'Aiuto Fiscale', color: '#10B981' },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                <Ionicons name={action.icon as any} size={20} color={action.color} />
              </View>
              <Text style={styles.actionText}>{action.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            {message.sender === 'ai' && (
              <View style={styles.aiAvatar}>
                <Ionicons name="sparkles" size={16} color="#8B5CF6" />
              </View>
            )}
            <View
              style={[
                styles.messageContent,
                message.sender === 'user' ? styles.userContent : styles.aiContent,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.sender === 'user' ? styles.userText : styles.aiText,
                ]}
              >
                {message.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.micButton}>
          <Ionicons name="mic" size={24} color="#8B5CF6" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Chiedi qualcosa all'AI..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  quickActions: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  actionButton: {
    alignItems: 'center',
    marginRight: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  actionText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userBubble: {
    justifyContent: 'flex-end',
  },
  aiBubble: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageContent: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  userContent: {
    backgroundColor: '#5B5BD6',
    borderBottomRightRadius: 4,
  },
  aiContent: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  aiText: {
    color: '#111827',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#111827',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5B5BD6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
});
