import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';

export default function FormScreen() {

  const router = useRouter();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [totalTrees, setTotalTrees] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: 'Νέο Χωράφι' });
  }, []);

  const validateForm = () => {
    if (!name || !location || !totalTrees || !size) return false;
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) Alert.alert('Προσοχη!', 'Συμπληρώστε τα υποχρεωτικά πεδία');
    else {
      Alert.alert('Επιτυχής Προσθήκη', 'Το χωράφι προστέθηκε επιτυχώς');
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Όνομα Χωραφιού*</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Περιοχή*</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
       />

      <Text style={styles.label}>Αριθμός Δέντρων*</Text>
      <TextInput
        style={styles.input}
        value={totalTrees}
        onChangeText={(val) => setTotalTrees(val.replace(/[^0-9]/g, ''))}
        keyboardType='numeric'
       />

      <Text style={styles.label}>Εμβαδόν (στρέμματα)*</Text>
      <TextInput
        style={styles.input}
        value={size}
        onChangeText={(val) => setSize(val.replace(/[^0-9.]/g, ''))}
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
    // height: 100,
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
