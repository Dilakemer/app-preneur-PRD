import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { DatePickerField } from '../../components/DatePickerField';
import { renkler } from '../../constants/renkler';
import { useAraclar } from '../../hooks/useAraclar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AyarlarScreen() {
  const { varsayilanBildirimSaati, varsayilanSaatiGuncelle, tumVerileriSil } = useAraclar();
  const [bildirimSaati, setBildirimSaati] = useState<Date | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    // parse varsayilanBildirimSaati (HH:MM)
    const [hh = '09', mm = '00'] = varsayilanBildirimSaati.split(':');
    const d = new Date();
    d.setHours(Number(hh), Number(mm), 0, 0);
    setBildirimSaati(d);

    AsyncStorage.getItem('@caremind:notificationsEnabled').then((v) => {
      setNotificationsEnabled(v === null ? true : v === '1' || v === 'true');
    });
  }, [varsayilanBildirimSaati]);

  const handleSaatChange = useCallback(
    (d: Date | null) => {
      setBildirimSaati(d);
      if (!d) return;
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      varsayilanSaatiGuncelle(`${hh}:${mm}`);
    },
    [varsayilanSaatiGuncelle],
  );

  const toggleNotifications = useCallback(
    (val: boolean) => {
      setNotificationsEnabled(val);
      AsyncStorage.setItem('@caremind:notificationsEnabled', val ? '1' : '0');
    },
    [],
  );

  const handleClear = useCallback(() => {
    Alert.alert('Tüm verileri sil', 'Tüm araç verileri silinecektir. Devam edilsin mi?', [
      { text: 'Vazgeç', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: async () => await tumVerileriSil() },
    ]);
  }, [tumVerileriSil]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Bildirimleri etkinleştir</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          thumbColor={renkler.beyaz}
          trackColor={{ false: '#CABEB1', true: renkler.vurgu }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Varsayılan bildirim saati</Text>
        <DatePickerField label="Bildirim saati" mode="time" value={bildirimSaati} onChange={handleSaatChange} clearable={false} />
      </View>

      <Pressable style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearText}>Tüm verileri sil</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  label: { fontSize: 16, color: renkler.metin },
  section: { marginTop: 12, marginBottom: 24 },
  clearButton: { padding: 14, borderRadius: 12, backgroundColor: '#FFF3F3', alignItems: 'center' },
  clearText: { color: '#C33', fontWeight: '700' },
});
