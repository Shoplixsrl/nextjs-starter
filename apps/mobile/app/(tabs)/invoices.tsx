import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function InvoicesScreen() {
  const router = useRouter();

  const invoices = [
    { id: '2025/0042', client: 'Acme Corp SRL', amount: 2450.00, status: 'paid', date: '2025-11-20' },
    { id: '2025/0041', client: 'TechStart Italia', amount: 1890.00, status: 'sent', date: '2025-11-19' },
    { id: '2025/0040', client: 'Studio Rossi', amount: 3200.00, status: 'overdue', date: '2025-11-15' },
    { id: '2025/0039', client: 'Green Energy SPA', amount: 5600.00, status: 'paid', date: '2025-11-14' },
    { id: '2025/0038', client: 'Digital Solutions', amount: 1200.00, status: 'draft', date: '2025-11-13' },
  ];

  const renderInvoice = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/invoice/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.invoiceNumber}>#{item.id}</Text>
          <Text style={styles.clientName}>{item.client}</Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.amount}>€{item.amount.toLocaleString('it-IT')}</Text>
          <View style={[
            styles.badge,
            item.status === 'paid' && styles.badgePaid,
            item.status === 'sent' && styles.badgeSent,
            item.status === 'overdue' && styles.badgeOverdue,
            item.status === 'draft' && styles.badgeDraft,
          ]}>
            <Text style={styles.badgeText}>
              {item.status === 'paid' ? 'Pagata' :
               item.status === 'sent' ? 'Inviata' :
               item.status === 'overdue' ? 'Scaduta' : 'Bozza'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={invoices}
        renderItem={renderInvoice}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/new-invoice')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  clientName: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgePaid: {
    backgroundColor: '#D1FAE5',
  },
  badgeSent: {
    backgroundColor: '#DBEAFE',
  },
  badgeOverdue: {
    backgroundColor: '#FEE2E2',
  },
  badgeDraft: {
    backgroundColor: '#F3F4F6',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
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
