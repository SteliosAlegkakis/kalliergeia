import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';

export default function incomeForm() {

  const router = useRouter();
  const navigation = useNavigation();

  const [oil, setOil] = useState('');
  const [pricePerKilo, setPricePerKilo] = useState('');
  const [total, setTotal] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: 'Προσθήκη πώλησης' });
  }, []);

  const validateForm = () => {
    if (!oil || !pricePerKilo || !total) return false;
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) Alert.alert('Προσοχη!', 'Συμπληρώστε τα υποχρεωτικά πεδία');
    else {
    //   addField(name, location, parseInt(totalTrees), parseFloat(size), parseInt(indication), parseFloat(waterPrice), description);
      Alert.alert('Επιτυχής Προσθήκη', 'Η πώληση προστέθηκε επιτυχώς');
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.label}>Κιλά Ελαιολάδου *</Text>
      <TextInput
        style={styles.input}
        value={oil}
        onChangeText={(val) => setOil(val.replace(/[^0-9]/g, ''))}
        keyboardType='numeric'
       />

      <Text style={styles.label}>Τιμή ανά κιλό *</Text>
      <TextInput
        style={styles.input}
        value={pricePerKilo}
        onChangeText={(val) => setPricePerKilo(val.replace(/[^0-9.]/g, ''))}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Συνολικά έσοδα *</Text>
      <TextInput
        style={styles.input}
        value={total}
        onChangeText={(val) => setTotal(val.replace(/[^0-9.]/g, ''))}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Περιγραφή</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
       />
    
      <View style={styles.buttons}>
        <Pressable style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.text}>Προσθήκη</Text>
        </Pressable>
        <Pressable style={styles.cancel} onPress={() => router.back()}>
            <Text style={styles.underlineText}>Ακύρωση</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AFAFAF',
    marginTop: 10,
  },
  input: {
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#282828',
    color: '#fff',
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  submit: {
    width: '50%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#A7C957',
    color: 'white',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancel: { 
    width: '50%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
  },
  underlineText: {
    textDecorationLine: 'underline',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
