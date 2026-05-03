import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

export const useNotificationObserver = () => {
  const router = useRouter();

  useEffect(() => {
    const sonYanitiKontrolEt = async () => {
      const sonYanit = await Notifications.getLastNotificationResponseAsync();
      const aracId = sonYanit?.notification.request.content.data?.aracId;

      if (typeof aracId === 'string') {
        router.push(`/arac/${aracId}`);
      }
    };

    sonYanitiKontrolEt();

    const abonelik = Notifications.addNotificationResponseReceivedListener((yanit) => {
      const aracId = yanit.notification.request.content.data?.aracId;

      if (typeof aracId === 'string') {
        router.push(`/arac/${aracId}`);
      }
    });

    return () => abonelik.remove();
  }, [router]);
};
