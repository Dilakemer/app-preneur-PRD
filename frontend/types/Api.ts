import type { TarihKategorisi } from './Arac';

export type BildirimIzinDurumu = 'granted' | 'denied' | 'undetermined';

export interface KonumBilgisi {
  lat: number;
  lng: number;
}

export interface YakinIstasyonSorgusu {
  merkez?: KonumBilgisi | null;
  kelime: string;
}

export interface SigortaTeklifBaglami {
  providerName: string;
  url: string;
}

export interface BildirimYonlendirmeVerisi {
  aracId?: string;
  kategori?: TarihKategorisi;
}
