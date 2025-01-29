import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import Setting from '@/components/Setting';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Setting name="Ελληνικά" icon="language" />
      <Setting name="Εξαγωγη Δεδομένων" icon="picture-as-pdf" />
      <Setting name="Αποσύνδεση" icon="exit-to-app" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
