import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { addField, getFields } from './database/fieldsTable';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

export default function FormScreen() {

  const router = useRouter();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [totalTrees, setTotalTrees] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');

  const [mapLocation, setMapLocation] = useState<{ latitude: number; longitude: number }>({ latitude: 35.308010695609205, longitude: 25.082387924194336 }); 
  const [region, setRegion] = useState<Region | undefined>(undefined);

  useEffect(() => {
    navigation.setOptions({ title: 'Νέο Χωράφι' });

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setMapLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

    })();
  }, []);

  const handleMarkerDragEnd = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMapLocation({ latitude, longitude });
  };

  const validateForm = () => {
    if (!name || !totalTrees) return false;
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) Alert.alert('Προσοχη!', 'Συμπληρώστε τα υποχρεωτικά πεδία');
    else {
      addField(name, mapLocation.latitude, mapLocation.longitude, parseInt(totalTrees), size, description);
      Alert.alert('Επιτυχής Προσθήκη', 'Το χωράφι προστέθηκε επιτυχώς');
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Όνομα Χωραφιού *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Αριθμός Δέντρων *</Text>
      <TextInput
        style={styles.input}
        value={totalTrees}
        onChangeText={(val) => setTotalTrees(val.replace(/[^0-9]/g, ''))}
        keyboardType='numeric'
       />

      <Text style={styles.label}>Εμβαδόν (στρέμματα)</Text>
      <TextInput
        style={styles.input}
        value={size}
        onChangeText={(val) => setSize(val.replace(/[^0-9.]/g, ''))}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Τοποθεσία</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
        {mapLocation && (
          <Marker coordinate={{ latitude: mapLocation.latitude, longitude: mapLocation.longitude }} draggable onDragEnd={handleMarkerDragEnd} />
        )}
        </MapView>
      </View>

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
  mapContainer: { 
    height: 250, 
    borderRadius: 10, 
    overflow: 'hidden', 
    marginVertical: 10 
  },
  map: { 
    flex: 1 
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
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#282828',
    color: '#fff',
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
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
