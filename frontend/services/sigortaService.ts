import type { Arac } from '../types/Arac';
import { SIGORTAM_AFFILIATE_URL } from '../constants/apiKeys';

export const sigortaTeklifURLiOlustur = (arac: Arac) => {
  const params = new URLSearchParams({
    utm_source: 'caremind',
    utm_medium: 'app',
    utm_campaign: 'sigorta_yenileme',
    lead_id: arac.id,
    plaka: arac.plaka,
    marka: arac.marka,
    model: arac.model,
    yil: String(arac.yil),
  });

  return `${SIGORTAM_AFFILIATE_URL}?${params.toString()}`;
};

export const internetBaglantisiVarMi = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch('https://clients3.google.com/generate_204', {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    clearTimeout(timeoutId);
    return false;
  }
};
