import { Pressable, StyleSheet, Text, View } from 'react-native';
import { renkler } from '../constants/renkler';

interface EmptyStateProps {
  onAdd: () => void;
}

export const EmptyState = ({ onAdd }: EmptyStateProps) => (
  <View style={styles.kapsayici}>
    <View style={styles.ikonKutusu}>
      <Text style={styles.ikon}>CM</Text>
    </View>
    <Text style={styles.baslik}>Ilk aracini ekleyerek basla</Text>
    <Text style={styles.aciklama}>
      CareMind, muayene, sigorta, kasko ve bakim tarihlerini tek panoda toplar.
    </Text>
    <Pressable onPress={onAdd} style={styles.buton}>
      <Text style={styles.butonMetni}>Arac ekle</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  kapsayici: {
    backgroundColor: renkler.kart,
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderWidth: 1,
    borderColor: renkler.cizgi,
    alignItems: 'center',
    gap: 14,
  },
  ikonKutusu: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: renkler.arkaPlanKoyu,
  },
  ikon: {
    color: renkler.beyaz,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
  },
  baslik: {
    color: renkler.metin,
    fontSize: 26,
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: 'Georgia',
  },
  aciklama: {
    color: renkler.metinIkincil,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
  buton: {
    marginTop: 8,
    backgroundColor: renkler.vurgu,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  butonMetni: {
    color: renkler.beyaz,
    fontWeight: '700',
    fontSize: 15,
  },
});
