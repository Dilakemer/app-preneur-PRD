import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { renkler } from '../constants/renkler';
import type { TarihKategorisi } from '../types/Arac';
import { KATEGORI_BASLIKLARI } from '../types/Arac';
import { kalanGunHesapla, kalanGunMetni, tarihFormatla } from '../utils/tarihHesapla';
import { durumRengiBelirle } from '../utils/renkBelirle';
import { RenkGostergesi } from './RenkGostergesi';

interface TarihSatiriProps {
  kategori: TarihKategorisi;
  tarih: string | null;
  aksiyonEtiketi?: string;
  onAction?: () => void;
}

const ikonMap: Record<TarihKategorisi, keyof typeof Feather.glyphMap> = {
  muayene: 'tool',
  sigorta: 'shield',
  kasko: 'umbrella',
  bakim: 'settings',
};

export const TarihSatiri = ({
  kategori,
  tarih,
  aksiyonEtiketi,
  onAction,
}: TarihSatiriProps) => {
  const kalanGun = tarih ? kalanGunHesapla(tarih) : null;
  const durum = kalanGun === null ? 'neutral' : durumRengiBelirle(kalanGun);

  return (
    <View style={styles.kapsayici}>
      <RenkGostergesi durum={durum} />

      <View style={styles.icerik}>
        <View style={styles.ustSatir}>
          <View style={styles.baslikAlani}>
            <View style={styles.ikonKutusu}>
              <Feather color={renkler.arkaPlanKoyu} name={ikonMap[kategori]} size={16} />
            </View>
            <Text style={styles.baslik}>{KATEGORI_BASLIKLARI[kategori]}</Text>
          </View>

          {aksiyonEtiketi && onAction ? (
            <Pressable onPress={onAction} style={styles.aksiyon}>
              <Text style={styles.aksiyonMetni}>{aksiyonEtiketi}</Text>
            </Pressable>
          ) : null}
        </View>

        <Text style={styles.tarih}>{tarihFormatla(tarih)}</Text>
        <Text style={styles.kalanGun}>
          {kalanGun === null ? 'Bu alan daha sonra doldurulabilir.' : kalanGunMetni(kalanGun)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  kapsayici: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: renkler.kart,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: renkler.cizgi,
    padding: 18,
  },
  icerik: {
    flex: 1,
    gap: 8,
  },
  ustSatir: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  baslikAlani: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ikonKutusu: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: renkler.vurguSoluk,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baslik: {
    color: renkler.metin,
    fontSize: 16,
    fontWeight: '700',
  },
  aksiyon: {
    backgroundColor: '#F6E2D3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  aksiyonMetni: {
    color: renkler.vurguKoyu,
    fontSize: 12,
    fontWeight: '700',
  },
  tarih: {
    color: renkler.metin,
    fontSize: 15,
  },
  kalanGun: {
    color: renkler.metinIkincil,
    fontSize: 13,
    lineHeight: 18,
  },
});
