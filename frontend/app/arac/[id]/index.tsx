import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAraclar } from '../../../hooks/useAraclar';
import { AracKarti } from '../../../components/AracKarti';
import { renkler } from '../../../constants/renkler';
import { tarihFormatla, enYakinTarihBul } from '../../../utils/tarihHesapla';

export default function AracDetayScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { aracGetir } = useAraclar();
  const arac = id ? aracGetir(id) : undefined;

  if (!arac) return <Text style={{ padding: 20 }}>Araç bulunamadı.</Text>;

  const enYakin = enYakinTarihBul(arac);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ gap: 16, padding: 16 }}>
      <AracKarti arac={arac} onPress={() => {}} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yaklaşan Tarih</Text>
        {enYakin ? (
          <Text style={styles.sectionText}>{`${enYakin.kategori.toUpperCase()}: ${tarihFormatla(enYakin.tarih)}`}</Text>
        ) : (
          <Text style={styles.sectionText}>Henüz bir tarih eklenmedi.</Text>
        )}
      </View>

      <View style={styles.sectionRow}>
        <Pressable style={styles.primaryButton} onPress={() => router.push(`/arac/${arac.id}/duzenle`)}>
          <Text style={styles.primaryText}>Düzenle</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.secondaryText}>Geri</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: renkler.arkaPlan },
  section: { backgroundColor: renkler.kart, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: renkler.cizgi },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6, color: renkler.metin },
  sectionText: { color: renkler.metinIkincil },
  sectionRow: { flexDirection: 'row', gap: 12, marginTop: 6 },
  primaryButton: { flex: 1, backgroundColor: renkler.vurgu, padding: 12, borderRadius: 12, alignItems: 'center' },
  primaryText: { color: renkler.beyaz, fontWeight: '700' },
  secondaryButton: { flex: 1, backgroundColor: '#EFF3F6', padding: 12, borderRadius: 12, alignItems: 'center' },
  secondaryText: { color: renkler.metin },
});
