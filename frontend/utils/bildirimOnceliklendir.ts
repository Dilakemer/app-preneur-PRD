import { BILDIRIM_GUNLERI } from '../constants/bildirimAraliklari';
import type { Arac } from '../types/Arac';
import { TARIH_KATEGORILERI } from '../types/Arac';
import { enYakinTarihBul, kalanGunHesapla } from './tarihHesapla';
import { durumRengiBelirle } from './renkBelirle';

export const MAX_BILDIRIM = 64;

const aktifGunler = (arac: Arac) =>
  BILDIRIM_GUNLERI.filter((gun) => {
    if (gun === 60) {
      return arac.bildirimler.gun60;
    }

    if (gun === 30) {
      return arac.bildirimler.gun30;
    }

    if (gun === 7) {
      return arac.bildirimler.gun7;
    }

    return arac.bildirimler.gun1;
  });

export const tahminiBildirimSayisi = (arac: Arac) =>
  TARIH_KATEGORILERI.reduce((toplam, kategori) => {
    const tarih = arac[`${kategori}Tarihi` as keyof Arac];

    if (!tarih || typeof tarih !== 'string') {
      return toplam;
    }

    const kalanGun = kalanGunHesapla(tarih);
    const uygunGunler = aktifGunler(arac).filter((gun) => kalanGun >= gun);
    return toplam + uygunGunler.length;
  }, 0);

const oncelikPuani = (arac: Arac) => {
  const enYakin = enYakinTarihBul(arac);

  if (!enYakin) {
    return 99;
  }

  const renk = durumRengiBelirle(enYakin.kalanGun);

  if (renk === 'red') {
    return 0;
  }

  if (renk === 'yellow') {
    return 1;
  }

  return 2;
};

export const bildirimIcinOnceliklendir = (araclar: Arac[]) => {
  const sirali = [...araclar].sort((ilk, ikinci) => {
    const puanFarki = oncelikPuani(ilk) - oncelikPuani(ikinci);

    if (puanFarki !== 0) {
      return puanFarki;
    }

    const ilkEnYakin = enYakinTarihBul(ilk);
    const ikinciEnYakin = enYakinTarihBul(ikinci);

    if (!ilkEnYakin && !ikinciEnYakin) {
      return ilk.plaka.localeCompare(ikinci.plaka, 'tr');
    }

    if (!ilkEnYakin) {
      return 1;
    }

    if (!ikinciEnYakin) {
      return -1;
    }

    return Math.abs(ilkEnYakin.kalanGun) - Math.abs(ikinciEnYakin.kalanGun);
  });

  const secilenler: Arac[] = [];
  let planlananToplam = 0;

  sirali.forEach((arac) => {
    const sayi = tahminiBildirimSayisi(arac);

    if (sayi === 0) {
      secilenler.push(arac);
      return;
    }

    if (planlananToplam + sayi <= MAX_BILDIRIM) {
      secilenler.push(arac);
      planlananToplam += sayi;
    }
  });

  return secilenler;
};
