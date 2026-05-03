import { View } from 'react-native';
import { renkler } from '../constants/renkler';

interface RenkGostergesiProps {
  durum: 'green' | 'yellow' | 'red' | 'neutral';
}

const renkHaritasi = {
  green: renkler.yesil,
  yellow: renkler.sari,
  red: renkler.kirmizi,
  neutral: renkler.cizgi,
} as const;

export const RenkGostergesi = ({ durum }: RenkGostergesiProps) => (
  <View
    style={{
      width: 6,
      alignSelf: 'stretch',
      borderRadius: 999,
      backgroundColor: renkHaritasi[durum],
    }}
  />
);
