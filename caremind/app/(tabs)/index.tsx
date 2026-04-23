import { View, Text, Button, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useAraclar } from '../../hooks/useAraclar';
import { AracKarti } from '../../components/AracKarti';
import { EmptyState } from '../../components/EmptyState';

export default function AnaEkran() {
  const router = useRouter();
  const { araclar, yukleniyor } = useAraclar();

  if (yukleniyor) return <Text>Yükleniyor...</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Araç Ekle" onPress={() => router.push('/arac/ekle')} />
      {araclar.length === 0 ? (
        <EmptyState text="Henüz araç eklemediniz." />
      ) : (
        <FlatList
          data={araclar}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AracKarti arac={item} onPress={() => router.push(`/arac/${item.id}`)} />
          )}
          contentContainerStyle={{ gap: 12, paddingVertical: 16 }}
        />
      )}
    </View>
  );
}
