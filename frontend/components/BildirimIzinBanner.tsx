import { Pressable, StyleSheet, Text, View } from 'react-native';
import { renkler } from '../constants/renkler';

interface BildirimIzinBannerProps {
  onOpenSettings: () => void;
  onDismiss: () => void;
}

export const BildirimIzinBanner = ({
  onOpenSettings,
  onDismiss,
}: BildirimIzinBannerProps) => (
  <View style={styles.banner}>
    <View style={styles.metinselAlan}>
      <Text style={styles.baslik}>Bildirimler kapali</Text>
      <Text style={styles.aciklama}>
        Muayene ve sigorta tarihlerini kacirmamak icin cihaz ayarlarindan bildirim iznini ac.
      </Text>
    </View>

    <View style={styles.aksiyonlar}>
      <Pressable onPress={onOpenSettings} style={styles.buton}>
        <Text style={styles.butonMetni}>Ayarlar</Text>
      </Pressable>
      <Pressable onPress={onDismiss} hitSlop={10}>
        <Text style={styles.kapat}>Kapat</Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FFF1D8',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F4CD78',
    padding: 18,
    gap: 14,
  },
  metinselAlan: {
    gap: 6,
  },
  baslik: {
    color: renkler.arkaPlanKoyu,
    fontSize: 18,
    fontWeight: '700',
  },
  aciklama: {
    color: renkler.arkaPlanKoyu,
    fontSize: 14,
    lineHeight: 21,
  },
  aksiyonlar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buton: {
    backgroundColor: renkler.arkaPlanKoyu,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  butonMetni: {
    color: renkler.beyaz,
    fontWeight: '700',
  },
  kapat: {
    color: renkler.arkaPlanKoyu,
    fontWeight: '600',
  },
});
