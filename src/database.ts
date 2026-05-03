import { v4 as uuidv4 } from 'uuid';
import type { Arac, AracInput, Bildirimler } from './types';
import { VARSAYILAN_BILDIRIMLER } from './types';

// In-memory veritabanı
let araclarDb: Arac[] = [];
let varsayilanBildirimSaati: string = '09:00';

// Varsayılan bildirim saatini al
export const getVarsayilanBildirimSaati = (): string => {
  return varsayilanBildirimSaati;
};

// Varsayılan bildirim saatini güncelle
export const setVarsayilanBildirimSaati = (saat: string): void => {
  varsayilanBildirimSaati = saat;
};

// Tüm araçları getir
export const getAllAraclar = (): Arac[] => {
  return JSON.parse(JSON.stringify(araclarDb)); // Derin kopya
};

// ID ile araç getir
export const getAracById = (id: string): Arac | undefined => {
  return araclarDb.find(a => a.id === id);
};

// Yeni araç ekle
export const createArac = (input: AracInput): Arac => {
  const zaman = new Date().toISOString();
  const yeniArac: Arac = {
    ...input,
    id: uuidv4(),
    bildirimler: {
      ...VARSAYILAN_BILDIRIMLER,
      ...input.bildirimler,
      saat: input.bildirimler?.saat || varsayilanBildirimSaati,
    },
    olusturmaTarihi: zaman,
    guncellemeTarihi: zaman,
  };

  araclarDb.push(yeniArac);
  return yeniArac;
};

// Araç güncelle
export const updateArac = (id: string, input: Partial<AracInput>): Arac | null => {
  const index = araclarDb.findIndex(a => a.id === id);
  if (index === -1) return null;

  const guncelArac: Arac = {
    ...araclarDb[index],
    ...input,
    id: araclarDb[index].id,
    olusturmaTarihi: araclarDb[index].olusturmaTarihi,
    guncellemeTarihi: new Date().toISOString(),
  };

  araclarDb[index] = guncelArac;
  return guncelArac;
};

// Araç sil
export const deleteArac = (id: string): Arac | null => {
  const index = araclarDb.findIndex(a => a.id === id);
  if (index === -1) return null;

  const [silinmiş] = araclarDb.splice(index, 1);
  return silinmiş;
};

// Tüm araçları sil
export const deleteAllAraclar = (): void => {
  araclarDb = [];
};

// Plaka ile araç getir
export const getAracByPlaka = (plaka: string): Arac | undefined => {
  return araclarDb.find(a => a.plaka.toUpperCase() === plaka.toUpperCase());
};

// Kalan gün hesapla
export const kalanGunHesapla = (tarih: string | null): number | null => {
  if (!tarih) return null;

  const hedef = new Date(tarih);
  const bugun = new Date();
  bugun.setHours(0, 0, 0, 0);
  hedef.setHours(0, 0, 0, 0);

  const fark = hedef.getTime() - bugun.getTime();
  return Math.round(fark / (24 * 60 * 60 * 1000));
};

// Bildirim raporu oluştur
export const generateBildirimRaporu = () => {
  const rapor: any[] = [];

  for (const arac of araclarDb) {
    const tarihler = [
      { kategori: 'muayene', tarih: arac.muayeneTarihi, bildirim: arac.bildirimler },
      { kategori: 'sigorta', tarih: arac.sigortaTarihi, bildirim: arac.bildirimler },
      { kategori: 'kasko', tarih: arac.kaskoTarihi, bildirim: arac.bildirimler },
      { kategori: 'bakim', tarih: arac.bakimTarihi, bildirim: arac.bildirimler },
    ];

    for (const item of tarihler) {
      if (item.tarih) {
        const kalanGun = kalanGunHesapla(item.tarih);
        if (kalanGun !== null) {
          const bildirimKey = `gun${Math.max(Math.min(kalanGun, 60), 1)}` as keyof Bildirimler;
          rapor.push({
            aracId: arac.id,
            plaka: arac.plaka,
            marka: `${arac.marka} ${arac.model}`,
            kategori: item.kategori,
            tarih: item.tarih,
            kalanGun,
            bildirimAktif: item.bildirim[bildirimKey] ?? false,
          });
        }
      }
    }
  }

  return rapor.sort((a, b) => a.kalanGun - b.kalanGun);
};

// Örnek veri yükle
export const seedDatabase = () => {
  araclarDb = [
    {
      id: uuidv4(),
      plaka: '34ABC123',
      marka: 'Renault',
      model: 'Clio',
      yil: 2018,
      muayeneTarihi: '2026-09-01',
      sigortaTarihi: '2026-06-15',
      kaskoTarihi: '2026-07-10',
      bakimTarihi: '2026-05-20',
      bildirimler: { gun60: true, gun30: true, gun7: true, gun1: true, saat: '09:00' },
      olusturmaTarihi: new Date().toISOString(),
      guncellemeTarihi: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      plaka: '06XYZ789',
      marka: 'Toyota',
      model: 'Corolla',
      yil: 2020,
      muayeneTarihi: '2026-10-05',
      sigortaTarihi: '2026-08-20',
      kaskoTarihi: null,
      bakimTarihi: '2026-06-01',
      bildirimler: { gun60: true, gun30: true, gun7: true, gun1: true, saat: '10:00' },
      olusturmaTarihi: new Date().toISOString(),
      guncellemeTarihi: new Date().toISOString(),
    },
  ];
};
