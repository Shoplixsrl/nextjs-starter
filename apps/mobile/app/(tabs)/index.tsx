import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  // Mock data - in produzione dal backend
  const stats = {
    totalRevenue: 125430.50,
    revenueGrowth: 12.5,
    invoicesSent: 234,
    invoicesGrowth: 8.2,
    activeClients: 89,
    clientsGrowth: 15.3,
    averagePaymentTime: 28,
  };

  const recentInvoices = [
    { id: '2025/0042', client: 'Acme Corp SRL', amount: 2450.00, status: 'paid' },
    { id: '2025/0041', client: 'TechStart Italia', amount: 1890.00, status: 'sent' },
    { id: '2025/0040', client: 'Studio Rossi', amount: 3200.00, status: 'overdue' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, styles.revenueCard]}>
          <View style={styles.statIcon}>
            <Ionicons name="cash-outline" size={24} color="#3B82F6" />
          </View>
          <Text style={styles.statLabel}>Fatturato</Text>
          <Text style={styles.statValue}>€{stats.totalRevenue.toLocaleString('it-IT')}</Text>
          <View style={styles.statGrowth}>
            <Ionicons name="trending-up" size={14} color="#10B981" />
            <Text style={styles.growthText}>+{stats.revenueGrowth}%</Text>
          </View>
        </View>

        <View style={[styles.statCard, styles.invoicesCard]}>
          <View style={styles.statIcon}>
            <Ionicons name="document-text-outline" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.statLabel}>Fatture</Text>
          <Text style={styles.statValue}>{stats.invoicesSent}</Text>
          <View style={styles.statGrowth}>
            <Ionicons name="trending-up" size={14} color="#10B981" />
            <Text style={styles.growthText}>+{stats.invoicesGrowth}%</Text>
          </View>
        </View>

        <View style={[styles.statCard, styles.clientsCard]}>
          <View style={styles.statIcon}>
            <Ionicons name="people-outline" size={24} color="#10B981" />
          </View>
          <Text style={styles.statLabel}>Clienti</Text>
          <Text style={styles.statValue}>{stats.activeClients}</Text>
          <View style={styles.statGrowth}>
            <Ionicons name="trending-up" size={14} color="#10B981" />
            <Text style={styles.growthText}>+{stats.clientsGrowth}%</Text>
          </View>
        </View>

        <View style={[styles.statCard, styles.timeCard]}>
          <View style={styles.statIcon}>
            <Ionicons name="time-outline" size={24} color="#F59E0B" />
          </View>
          <Text style={styles.statLabel}>Tempo Pagamento</Text>
          <Text style={styles.statValue}>{stats.averagePaymentTime}g</Text>
          <View style={styles.statGrowth}>
            <Ionicons name="trending-down" size={14} color="#10B981" />
            <Text style={styles.growthText}>-5.2%</Text>
          </View>
        </View>
      </View>

      {/* AI Insights */}
      <View style={styles.aiCard}>
        <View style={styles.aiHeader}>
          <Ionicons name="sparkles" size={20} color="#8B5CF6" />
          <Text style={styles.aiTitle}>AI Insights</Text>
        </View>
        <View style={styles.aiInsight}>
          <Text style={styles.aiLabel}>💡 Consiglio del giorno</Text>
          <Text style={styles.aiText}>
            3 clienti hanno superato i 30 giorni di scadenza. Invia un reminder automatico?
          </Text>
          <TouchableOpacity style={styles.aiButton}>
            <Text style={styles.aiButtonText}>Invia Ora →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Invoices */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fatture Recenti</Text>
        {recentInvoices.map((invoice) => (
          <TouchableOpacity
            key={invoice.id}
            style={styles.invoiceCard}
            onPress={() => router.push(`/invoice/${invoice.id}`)}
          >
            <View style={styles.invoiceIcon}>
              <Ionicons name="document-text" size={24} color="#6B7280" />
            </View>
            <View style={styles.invoiceInfo}>
              <Text style={styles.invoiceClient}>{invoice.client}</Text>
              <Text style={styles.invoiceNumber}>#{invoice.id}</Text>
            </View>
            <View style={styles.invoiceRight}>
              <Text style={styles.invoiceAmount}>
                €{invoice.amount.toLocaleString('it-IT')}
              </Text>
              <View style={[
                styles.statusBadge,
                invoice.status === 'paid' && styles.statusPaid,
                invoice.status === 'sent' && styles.statusSent,
                invoice.status === 'overdue' && styles.statusOverdue,
              ]}>
                <Text style={styles.statusText}>
                  {invoice.status === 'paid' ? 'Pagata' :
                   invoice.status === 'sent' ? 'Inviata' : 'Scaduta'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* FAB Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/scan')}
      >
        <Ionicons name="camera" size={28} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  revenueCard: {
    borderLeftColor: '#3B82F6',
  },
  invoicesCard: {
    borderLeftColor: '#8B5CF6',
  },
  clientsCard: {
    borderLeftColor: '#10B981',
  },
  timeCard: {
    borderLeftColor: '#F59E0B',
  },
  statIcon: {
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  growthText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  aiCard: {
    backgroundColor: '#F3E8FF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E9D5FF',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  aiInsight: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
  aiLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  aiText: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 8,
  },
  aiButton: {
    alignSelf: 'flex-start',
  },
  aiButtonText: {
    color: '#7C3AED',
    fontWeight: '600',
    fontSize: 13,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  invoiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  invoiceIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceClient: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  invoiceNumber: {
    fontSize: 13,
    color: '#6B7280',
  },
  invoiceRight: {
    alignItems: 'flex-end',
  },
  invoiceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusPaid: {
    backgroundColor: '#D1FAE5',
  },
  statusSent: {
    backgroundColor: '#DBEAFE',
  },
  statusOverdue: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5B5BD6',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
