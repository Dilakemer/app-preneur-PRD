import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();


  const tamamla = async () => {
    // Eski 'true' kaydını sil
    await AsyncStorage.removeItem('@caremind:onboarding');
    // Her zaman '1' olarak kaydet
    await AsyncStorage.setItem('@caremind:onboarding', '1');
    router.replace('/(tabs)');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>CareMind'e Hoş Geldin!</Text>
      <Text style={{ marginBottom: 24 }}>Araçlarını ekleyip muayene ve sigorta takibini kolayca yapabilirsin.</Text>
      <Button title="Başla" onPress={tamamla} />
    </View>
  );
}
