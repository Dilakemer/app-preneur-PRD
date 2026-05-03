import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAraclar } from '../../hooks/useAraclar';
import { AracKarti } from '../../components/AracKarti';
import { EmptyState } from '../../components/EmptyState';
import { renkler } from '../../constants/renkler';

export default function AnaEkran() {
  const router = useRouter();
  const { araclar, yukleniyor } = useAraclar();
  const [refreshing, setRefreshing] = React.useState(false);

  if (yukleniyor) return <Text style={{ padding: 20 }}>Yükleniyor...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {araclar.length === 0 ? (
        <View style={styles.emptyWrap}>
          <EmptyState onAdd={() => router.push('/arac/ekle')} />
        </View>
      ) : (
        <FlatList
          data={araclar}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AracKarti arac={item} onPress={() => router.push(`/arac/${item.id}`)} />
          )}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 800); }} />}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/arac/ekle')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: renkler.arkaPlan },
  listContent: { paddingVertical: 8 },
  emptyWrap: { padding: 16 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: renkler.vurgu,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  fabText: { color: renkler.beyaz, fontSize: 32, lineHeight: 34, fontWeight: '700' },
});
