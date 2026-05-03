import { Linking, View, Text, Pressable, StyleSheet } from 'react-native';

export default function SigortaTeklifiScreen() {
  const open = async () => {
    const url = 'https://www.sigortam.net/';
    try {
      await Linking.openURL(url);
    } catch (e) {
      console.warn('Unable to open URL', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sigorta Teklifi Al</Text>
      <Text style={styles.desc}>Sigortam.net aracılığıyla hızlıca teklif alabilirsiniz.</Text>
      <Pressable style={styles.button} onPress={open}>
        <Text style={styles.buttonText}>Teklif Al</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 8, fontWeight: '700' },
  desc: { marginBottom: 20, textAlign: 'center' },
  button: { backgroundColor: '#0A84FF', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
  buttonText: { color: '#FFF', fontWeight: '700' },
});
