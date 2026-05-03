import { View, Text } from 'react-native';
import { AracForm } from '../../components/AracForm';

export default function AracEkleScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Araç Ekle</Text>
      <AracForm mode="create" />
    </View>
  );
}
