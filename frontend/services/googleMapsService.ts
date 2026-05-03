import * as Location from 'expo-location';
import { Linking } from 'react-native';
import type { KonumBilgisi } from '../types/Api';

export const konumIzinliMi = async () => {
  const izin = await Location.requestForegroundPermissionsAsync();
  return izin.status === 'granted';
};

export const anlikKonumuAl = async (): Promise<KonumBilgisi | null> => {
  const izinVar = await konumIzinliMi();

  if (!izinVar) {
    return null;
  }

  const konum = await Location.getCurrentPositionAsync({});

  return {
    lat: konum.coords.latitude,
    lng: konum.coords.longitude,
  };
};

export const tuvturkIstasyonAc = async () => {
  const konum = await anlikKonumuAl();
  const query = konum
    ? `TUVTURK arac muayene istasyonu@${konum.lat},${konum.lng}`
    : 'TUVTURK arac muayene istasyonu';

  await Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(query)}`);
};
