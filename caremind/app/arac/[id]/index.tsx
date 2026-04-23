import { View, Text, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAraclar } from '../../../hooks/useAraclar';
import { AracKarti } from '../../../components/AracKarti';

export default function AracDetayScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { aracGetir } = useAraclar();
  const arac = id ? aracGetir(id) : undefined;

  if (!arac) return <Text>Araç bulunamadı.</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <AracKarti arac={arac} onPress={() => {}} />
      <Button title="Düzenle" onPress={() => router.push(`/arac/${arac.id}/duzenle`)} />
    </View>
  );
}
