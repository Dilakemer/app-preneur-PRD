import AsyncStorage from '@react-native-async-storage/async-storage';
import type { BildirimIzinDurumu } from '../types/Api';
import type { Arac, AracInput } from '../types/Arac';
import { VARSAYILAN_BILDIRIMLER } from '../types/Arac';

const UYGULAMA_PREFIX = '@caremind';
const DEPOLAMA_ANAHTARI = `${UYGULAMA_PREFIX}:araclar`;
const ONBOARDING_ANAHTARI = `${UYGULAMA_PREFIX}:onboarding`;
const BILDIRIM_SAATI_ANAHTARI = `${UYGULAMA_PREFIX}:bildirim_saat`;
const BILDIRIM_IZIN_ANAHTARI = `${UYGULAMA_PREFIX}:bildirim_izni`;
const BILDIRIM_KEY_PREFIX = `${UYGULAMA_PREFIX}:bildirimler:`;

const bildirimKey = (aracId: string) => `${BILDIRIM_KEY_PREFIX}${aracId}`;

const yeniIdOlustur = () =>
  typeof globalThis.crypto?.randomUUID === 'function'
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const getAraclar = async (): Promise<Arac[]> => {
  try {
    const json = await AsyncStorage.getItem(DEPOLAMA_ANAHTARI);
    return json ? (JSON.parse(json) as Arac[]) : [];
  } catch {
    return [];
  }
};

export const saveAraclar = async (araclar: Arac[]) => {
  await AsyncStorage.setItem(DEPOLAMA_ANAHTARI, JSON.stringify(araclar));
};

export const addArac = async (data: AracInput) => {
  const mevcut = await getAraclar();
  const zaman = new Date().toISOString();
  const yeniArac: Arac = {
    ...data,
    id: yeniIdOlustur(),
    bildirimler: {
      ...VARSAYILAN_BILDIRIMLER,
      ...data.bildirimler,
    },
    olusturmaTarihi: zaman,
    guncellemeTarihi: zaman,
  };

  const guncel = [yeniArac, ...mevcut];
  await saveAraclar(guncel);
  return yeniArac;
};

export const updateArac = async (arac: Arac) => {
  const mevcut = await getAraclar();
  const guncel = mevcut.map((kalem) =>
    kalem.id === arac.id
      ? {
          ...arac,
          guncellemeTarihi: new Date().toISOString(),
        }
      : kalem,
  );

  await saveAraclar(guncel);
};

export const deleteArac = async (id: string) => {
  const mevcut = await getAraclar();
  await saveAraclar(mevcut.filter((arac) => arac.id !== id));
  await AsyncStorage.removeItem(bildirimKey(id));
};

export const getOnboardingTamamlandi = async () =>
  (await AsyncStorage.getItem(ONBOARDING_ANAHTARI)) === 'true';

export const setOnboardingTamamlandi = async () => {
  await AsyncStorage.setItem(ONBOARDING_ANAHTARI, 'true');
};

export const getVarsayilanBildirimSaati = async () =>
  (await AsyncStorage.getItem(BILDIRIM_SAATI_ANAHTARI)) ?? VARSAYILAN_BILDIRIMLER.saat;

export const setVarsayilanBildirimSaati = async (saat: string) => {
  await AsyncStorage.setItem(BILDIRIM_SAATI_ANAHTARI, saat);
};

export const getCachedBildirimIzni = async (): Promise<BildirimIzinDurumu> =>
  ((await AsyncStorage.getItem(BILDIRIM_IZIN_ANAHTARI)) as BildirimIzinDurumu | null) ??
  'undetermined';

export const setCachedBildirimIzni = async (durum: BildirimIzinDurumu) => {
  await AsyncStorage.setItem(BILDIRIM_IZIN_ANAHTARI, durum);
};

export const getAracBildirimIdleri = async (aracId: string) => {
  const json = await AsyncStorage.getItem(bildirimKey(aracId));
  return json ? (JSON.parse(json) as string[]) : [];
};

export const setAracBildirimIdleri = async (aracId: string, idler: string[]) => {
  await AsyncStorage.setItem(bildirimKey(aracId), JSON.stringify(idler));
};

export const clearAracBildirimIdleri = async (aracId: string) => {
  await AsyncStorage.removeItem(bildirimKey(aracId));
};

export const clearTumBildirimKayitlari = async () => {
  const anahtarlar = await AsyncStorage.getAllKeys();
  const silinecekler = anahtarlar.filter((anahtar) => anahtar.startsWith(BILDIRIM_KEY_PREFIX));

  if (silinecekler.length) {
    await AsyncStorage.multiRemove(silinecekler);
  }
};

export const clearTumVeriler = async () => {
  const anahtarlar = await AsyncStorage.getAllKeys();
  const silinecekler = anahtarlar.filter((anahtar) => anahtar.startsWith(UYGULAMA_PREFIX));

  if (silinecekler.length) {
    await AsyncStorage.multiRemove(silinecekler);
  }
};
