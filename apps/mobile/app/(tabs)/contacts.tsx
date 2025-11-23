import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactsScreen() {
  const contacts = [
    { id: '1', name: 'Acme Corp SRL', vat: 'IT12345678901', total: 45200, invoices: 23 },
    { id: '2', name: 'TechStart Italia', vat: 'IT98765432109', total: 32800, invoices: 18 },
    { id: '3', name: 'Studio Rossi', vat: 'IT55566677788', total: 28500, invoices: 31 },
    { id: '4', name: 'Green Energy SPA', vat: 'IT11122233344', total: 21200, invoices: 14 },
  ];

  const renderContact = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.vat}>P.IVA: {item.vat}</Text>
        <View style={styles.stats}>
          <Text style={styles.stat}>€{item.total.toLocaleString('it-IT')}</Text>
          <Text style={styles.statLabel}> • {item.invoices} fatture</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5B5BD6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  vat: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
