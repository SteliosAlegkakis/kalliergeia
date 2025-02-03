import { StyleSheet, ScrollView, SafeAreaView , Text, Alert } from 'react-native';
import FieldPreview from '@/components/FieldPreview';
import RoundButton from '@/components/RoundButton';
import { useFocusEffect, useRouter } from 'expo-router';
import { setupDatabase } from '../database/db';
import { useEffect, useState } from 'react';
import { getFields } from '../database/fieldsTable';
import React from 'react';

export default function TabOneScreen() {

  const [fields, setFields] = useState<any[]>([]);

  const fetchFields = async () => {
    try {
      const fields = await getFields();
      setFields(fields);
    } catch (error) {
      Alert.alert('Σφάλμα', 'Πρόβλημα στην ανάκτηση των χωραφιών');
    }
  }

  useEffect(() => {
    setupDatabase();
    fetchFields();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchFields();
    }, [])
  );

  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {fields.length === 0 ? (
          <Text style={styles.title}>Δεν υπάρχουν χωράφια</Text>
        ) : (
          fields.map((field, index) => (
            <FieldPreview key={index} name={field.name} field_id={field.field_id} />
          ))
        )}
      </ScrollView>
      <RoundButton onPress={() => router.push("../fieldForm")} />
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
