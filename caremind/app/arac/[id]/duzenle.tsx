import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AracForm } from '../../../components/AracForm';

export default function AracDuzenleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Araç Düzenle</Text>
      <AracForm mode="edit" aracId={id} />
    </View>
  );
}
