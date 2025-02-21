import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { SetStateAction, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Alert, ScrollView, TextInput, StyleSheet, Pressable, Linking } from "react-native";
import { deleteField, getField, updateField } from "./database/fieldsTable";
import { deleteGrindingByField } from "./database/grindingTable";
import { deleteFertilizationByField } from "./database/fertilizationTable";
import { deleteWateringByField } from "./database/wateringTable";
import { deleteHarvestByField } from "./database/harvestTable";
import { deleteSprayingByField } from "./database/sprayingTable";
import MapView, { Marker, Region } from 'react-native-maps';

export default function fieldDetails() {

    const navigation = useNavigation();
    const router = useRouter();
    const { fieldName, fieldId } = useLocalSearchParams(); // Get query params
    const [fieldDetails, setFieldDetails] = useState<any>({}); // Field details

    const [totalTrees, setTotalTrees] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');

    const [mapLocation, setMapLocation] = useState<{ latitude: number; longitude: number }>({ latitude: 35.308010695609205, longitude: 25.082387924194336 }); 
    const [region, setRegion] = useState<Region | undefined>(undefined);

    useEffect(() => {
        navigation.setOptions({title: fieldName,});
        fetchFieldDetails();
    }, []);

    const handleMarkerDragEnd = (event: any) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMapLocation({ latitude, longitude });
    };

    const fetchFieldDetails = async () => {
        try {
            const field = await getField(fieldId);
            setFieldDetails(field[0]);
            setTotalTrees(field[0].total_trees);
            setSize(field[0].size);
            setDescription(field[0].description);
            setMapLocation({ latitude: field[0].lat, longitude: field[0].lon });
            setRegion({
                latitude: field[0].lat,
                longitude: field[0].lon,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        } catch (error) {
            Alert.alert('Σφάλμα', 'Πρόβλημα στην ανάκτηση των λεπτομερειών του χωραφιού');
        }
    }

    const handleDelete = () => {
        Alert.alert(
            "Προσοχή!",
            "Σίγουρα θέλετε να διαγράψετε το χωράφι "+fieldName+" ;",
            [
                { text: "Επιβεβαίωση", onPress: () => executeDelete() },
                { text: "Ακύρωση", style: "cancel" }
            ],
            { cancelable: false }
        );
    };

    const executeDelete = async () => {
        try {
            await deleteGrindingByField(fieldId);
            await deleteFertilizationByField(fieldId);
            await deleteWateringByField(fieldId);
            await deleteHarvestByField(fieldId);
            await deleteSprayingByField(fieldId);
            await deleteField(fieldId);
            router.navigate('/(tabs)');
        } catch (error) {
            console.error("Error deleting field:", error);
            alert("Failed to delete the field.");
        }
    };

    const handleTotalTreesBlur = () => {
        if (totalTrees === '')
            setTotalTrees(fieldDetails.total_trees); // Revert to default if field is empty
    }

    const handleSizeBlur = () => {
        if (size === '')
            setSize(fieldDetails.size); // Revert to default if field is empty
    }

    const handleSubmit = () => {
        updateField(parseInt(fieldDetails.field_id), mapLocation.latitude, mapLocation.longitude, parseInt(totalTrees), size, description);
        Alert.alert('Επιτυχής Αλλαγή!','Οι αλλαγές αποθηκεύτηκαν επιτυχώς');
        router.back();
    }

    return (
        <ScrollView>
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
                <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${mapLocation.latitude},${mapLocation.longitude}`)}>
                    <Text style={styles.underlineText}>Προβολή στους χάρτες Google</Text>
                </TouchableOpacity>
            </View>   

            <Text style={styles.label}>Αριθμός Δέντρων</Text>
            <TextInput
                placeholderTextColor="white"
                style={styles.input}
                value={totalTrees}
                placeholder={fieldDetails.total_trees+''}
                onChangeText={(val) => setTotalTrees(val.replace(/[^0-9]/g, ''))}
                keyboardType='numeric'
                onBlur={handleTotalTreesBlur}
            />

            <Text style={styles.label}>Εμβαδόν (στρέμματα)</Text>
            <TextInput
                placeholderTextColor="white"
                style={styles.input}
                value={size}
                placeholder={fieldDetails.size+''}
                onChangeText={(val) => setSize(val.replace(/[^0-9.]/g, ''))}
                keyboardType='numeric'
                onBlur={handleSizeBlur}
            />

            <Text style={styles.label}>Περιγραφή</Text>
            <TextInput
                placeholderTextColor="white"
                style={styles.input}
                value={description}
                placeholder={fieldDetails.description}
                onChangeText={setDescription}
            />

            <View style={styles.buttons}>
                <Pressable style={styles.submit} onPress={handleSubmit}>
                    <Text style={styles.text}>Αποθήκευση Αλλαγών</Text>
                </Pressable>
                <Pressable style={styles.cancel} onPress={() => handleDelete()}>
                    <Text style={styles.underlineText}>Διαγραφή Χωραφιού</Text>
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
    marginVertical: 10, 
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