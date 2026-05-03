import { AppState, type AppStateStatus } from 'react-native';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import type { BildirimIzinDurumu } from '../types/Api';
import { izinDurumunuKontrolEt, izinIste } from '../services/bildirimService';

interface NotificationContextDegeri {
  izinDurumu: BildirimIzinDurumu;
  yukleniyor: boolean;
  izinIstegiYap: () => Promise<BildirimIzinDurumu>;
  izinDurumunuYenile: () => Promise<BildirimIzinDurumu>;
}

const NotificationContext = createContext<NotificationContextDegeri | undefined>(undefined);

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [izinDurumu, setIzinDurumu] = useState<BildirimIzinDurumu>('undetermined');
  const [yukleniyor, setYukleniyor] = useState(true);

  const izinDurumunuYenile = useCallback(async () => {
    const durum = await izinDurumunuKontrolEt();
    setIzinDurumu(durum);
    setYukleniyor(false);
    return durum;
  }, []);

  const izinIstegiYap = useCallback(async () => {
    const durum = await izinIste();
    setIzinDurumu(durum);
    setYukleniyor(false);
    return durum;
  }, []);

  useEffect(() => {
    izinDurumunuYenile();
  }, [izinDurumunuYenile]);

  useEffect(() => {
    const abonelik = AppState.addEventListener('change', (durum: AppStateStatus) => {
      if (durum === 'active') {
        izinDurumunuYenile();
      }
    });

    return () => abonelik.remove();
  }, [izinDurumunuYenile]);

  const deger = useMemo(
    () => ({
      izinDurumu,
      yukleniyor,
      izinIstegiYap,
      izinDurumunuYenile,
    }),
    [izinDurumu, yukleniyor, izinIstegiYap, izinDurumunuYenile],
  );

  return <NotificationContext.Provider value={deger}>{children}</NotificationContext.Provider>;
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }

  return context;
};
