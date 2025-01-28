import { StyleSheet, ScrollView, SafeAreaView , Text, Alert } from 'react-native';
import FieldPreview from '@/components/FieldPreview';
import RoundButton from '@/components/RoundButton';

const fields: any[] = [
  { name: 'Χωράφι 1', fieldId: 0 },
  { name: 'Χωράφι 2', fieldId: 1 },
  { name: 'Χωράφι 3', fieldId: 2 },
  { name: 'Χωράφι 4', fieldId: 3 },
  { name: 'Χωράφι 5', fieldId: 4 },
  { name: 'Χωράφι 6', fieldId: 5 },
  { name: 'Χωράφι 7', fieldId: 6 },
  { name: 'Χωράφι 8', fieldId: 7 },
];

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {fields.length === 0 ? (
          <Text style={styles.title}>Δεν υπάρχουν χωράφια</Text>
        ) : (
          fields.map((field, index) => (
            <FieldPreview key={index} name={field.name} field_id={field.fieldId} />
          ))
        )}
      </ScrollView>
      <RoundButton onPress={() => Alert.alert('Button Pressed!')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    textAlign: 'center',
    marginTop: '50%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
});
