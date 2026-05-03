import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function OnboardingIndex() {
  const [tamamlandi, setTamamlandi] = useState<boolean | null>(null);


  useEffect(() => {
    AsyncStorage.getItem('@caremind:onboarding').then((v) => {
      // Hem eski 'true' stringi hem de yeni '1' değeri için true kabul et
      setTamamlandi(v === '1' || v === 'true');
    });
  }, []);

  if (tamamlandi === null) return null;
  return <Redirect href={tamamlandi ? '/(tabs)' : '/onboarding/'} />;
}
