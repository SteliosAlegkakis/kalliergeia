import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { SetStateAction, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Alert, ScrollView, TextInput, StyleSheet, Pressable } from "react-native";
import { deleteField, getField, updateField } from "./database/fieldsTable";


export default function fieldDetails() {

    const navigation = useNavigation();
    const router = useRouter();
    const { fieldName, fieldId } = useLocalSearchParams(); // Get query params
    const [fieldDetails, setFieldDetails] = useState<any>({}); // Field details

    const [location, setLocation] = useState('');
    const [totalTrees, setTotalTrees] = useState('');
    const [size, setSize] = useState('');
    const [indication, setIndication] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        navigation.setOptions({title: fieldName,});
        fetchFieldDetails();
    }, []);

    const fetchFieldDetails = async () => {
        try {
            const field = await getField(fieldId);
            setFieldDetails(field[0]);
            setLocation(field[0].location);
            setTotalTrees(field[0].total_trees);
            setSize(field[0].size);
            setIndication(field[0].indication);
            setDescription(field[0].description);
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
            await deleteField(fieldId);
            router.navigate('/(tabs)');
        } catch (error) {
            console.error("Error deleting field:", error);
            alert("Failed to delete the field.");
        }
    };

    const handleLocationBlur = () => {
        if (location === '')
            setLocation(fieldDetails.location); // Revert to default if field is empty
    }

    const handleTotalTreesBlur = () => {
        if (totalTrees === '')
            setTotalTrees(fieldDetails.total_trees); // Revert to default if field is empty
    }

    const handleSizeBlur = () => {
        if (size === '')
            setSize(fieldDetails.size); // Revert to default if field is empty
    }

    const handleIndicationBlur = () => {
        if (indication === '')
            setIndication(fieldDetails.indication); // Revert to default if field is empty
    }

    const handleSubmit = () => {
        updateField(parseInt(fieldDetails.field_id), location, parseInt(totalTrees), parseFloat(size), parseInt(indication), description);
        Alert.alert('Επιτυχής Αλλαγή!','Οι αλλαγές αποθηκεύτηκαν επιτυχώς');
        router.back();
    }

    return (
        <ScrollView>
            <Text style={styles.label}>Περιοχή</Text>
            <TextInput
                placeholderTextColor="white"
                style={styles.input}
                value={location}
                placeholder={fieldDetails.location}
                onChangeText={setLocation}
                onBlur={handleLocationBlur}
            />

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

            <Text style={styles.label}>Ένδειξη Μετρητή Νερού</Text>
            <TextInput
                placeholderTextColor="white"
                style={styles.input}
                value={indication}
                placeholder={fieldDetails.indication+''}
                onChangeText={(val) => setIndication(val.replace(/[^0-9]/g, ''))}
                keyboardType='numeric'
                onBlur={handleIndicationBlur}
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