import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function SigortaTeklifiScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Sigorta Teklifi Al</Text>
      <Text style={{ marginBottom: 24 }}>Sigortam.net affiliate linki ile teklif alabilirsiniz.</Text>
      <Button title="Teklif Al" onPress={() => router.push('https://www.sigortam.net/')} />
    </View>
  );
}
