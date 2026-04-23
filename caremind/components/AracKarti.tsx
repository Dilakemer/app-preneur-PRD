import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Arac } from '../types/Arac';
import { KATEGORI_BASLIKLARI } from '../types/Arac';
import { enYakinTarihBul, kalanGunMetni, tarihFormatla } from '../utils/tarihHesapla';
import { durumRengiBelirle } from '../utils/renkBelirle';
import { RenkGostergesi } from './RenkGostergesi';
import { renkler } from '../constants/renkler';

interface AracKartiProps {
  arac: Arac;
  onPress: () => void;
}

export const AracKarti = ({ arac, onPress }: AracKartiProps) => {
  const enYakin = enYakinTarihBul(arac);
  const durum = enYakin ? durumRengiBelirle(enYakin.kalanGun) : 'neutral';

  return (
    <Pressable onPress={onPress} style={styles.kapsayici}>
      <RenkGostergesi durum={durum} />

      <View style={styles.icerik}>
        <View style={styles.ustAlan}>
          <View style={styles.metinler}>
            <Text style={styles.baslik}>
              {[arac.marka, arac.model].filter(Boolean).join(' ')} ({arac.yil})
            </Text>
            <Text style={styles.altBaslik}>
              {enYakin
                ? `${KATEGORI_BASLIKLARI[enYakin.kategori]}: ${tarihFormatla(enYakin.tarih)}`
                : 'Takvim tarihi eklenmedi'}
            </Text>
          </View>

          <View style={styles.plakaRozeti}>
            <Text style={styles.plakaMetni}>{arac.plaka}</Text>
          </View>
        </View>

        <View style={styles.altAlan}>
          <Text style={styles.kalanGun}>
            {enYakin ? kalanGunMetni(enYakin.kalanGun) : 'Tarih ekleyerek takibi ac'}
          </Text>
          <Text style={styles.detay}>Detaylar</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  kapsayici: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: renkler.kart,
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    borderColor: renkler.cizgi,
  },
  icerik: {
    flex: 1,
    gap: 16,
  },
  ustAlan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  metinler: {
    flex: 1,
    gap: 6,
  },
  baslik: {
    color: renkler.metin,
    fontSize: 21,
    lineHeight: 25,
    fontFamily: 'Georgia',
  },
  altBaslik: {
    color: renkler.metinIkincil,
    fontSize: 14,
    lineHeight: 20,
  },
  plakaRozeti: {
    alignSelf: 'flex-start',
    backgroundColor: renkler.arkaPlanKoyu,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  plakaMetni: {
    color: renkler.beyaz,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  altAlan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  kalanGun: {
    color: renkler.metin,
    fontSize: 14,
    fontWeight: '700',
  },
  detay: {
    color: renkler.vurgu,
    fontSize: 13,
    fontWeight: '700',
  },
});
