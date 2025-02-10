import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import { deleteField } from "./database/fieldsTable";


export default function fieldDetails() {

    const navigation = useNavigation();
    const router = useRouter();
    const { fieldName, fieldId } = useLocalSearchParams(); // Get query params

    useEffect(() => {
        navigation.setOptions({title: fieldName,});
    }, []);

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
            alert("Διαγραφή: " + fieldId);
            router.navigate('/(tabs)');
        } catch (error) {
            console.error("Error deleting field:", error);
            alert("Failed to delete the field.");
        }
    };

    return (
        <View>
            <TouchableOpacity onPress = {() => {handleDelete()}}>
                <Text style={[{color:'white'},{fontWeight: 'bold'},{textDecorationLine: 'underline'}]}>Διαγραφή</Text>
            </TouchableOpacity>
        </View>
    );
}