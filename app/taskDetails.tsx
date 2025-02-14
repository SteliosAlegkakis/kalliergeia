import { router, useNavigation } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { deleteFertilization } from "./database/fertilizationTable";
import { deleteWatering } from "./database/wateringTable";
import { deleteSpraying } from "./database/sprayingTable";
import { deleteGrinding } from "./database/grindingTable";
import { deleteHarvest } from "./database/harvestTable";

const taskDetails = () => {

    const navigation = useNavigation();
    

    useEffect(() => {
        navigation.setOptions({ title: 'Λεπτομέριες Εργασίας' });
    }, []);

    const params = useSearchParams();
    const taskString:any = params.get('task');
    const task = JSON.parse(taskString);
    const type:any = params.get('type');

    function handleDelete(): void {
        Alert.alert(
            'Διαγραφή Εργασίας',
            'Είστε σίγουροι οτι θέλετε να διαγράψετε την εργασία;',
            [
                {
                    text: 'Διαγραφή',
                    onPress: () => {
                        if (type === 'watering') {
                            deleteWatering(task.task_id);
                        } else if (type === 'fertilization') {
                            deleteFertilization(task.task_id);
                        } else if (type === 'spraying') {
                            deleteSpraying(task.task_id);
                        } else if (type === 'grinding') {
                            deleteGrinding(task.task_id);
                        } else if (type === 'harvest') {
                            deleteHarvest(task.task_id);
                        }
                        router.back();
                    },
                },
                {
                    text: 'Ακύρωση',
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ημερομηνία</Text>
            <Text style={styles.value}>{task.date}</Text>
            {type === 'watering' && (
                <>
                    <Text style={styles.label}>Κόστος</Text>
                    <Text style={styles.value}>{task.cost} €</Text>
                    <Text style={styles.label}>Κυβικά Νερού</Text>
                    <Text style={styles.value}>{task.cubic_meter} m³</Text>
                    <Text style={styles.label}>Ένδειξη μετρητή νερού</Text>
                    <Text style={styles.value}>{task.indication}</Text>
                </>
            )}
            {type === 'fertilization' && (
                <>
                    <Text style={styles.label}>Κόστος</Text>
                    <Text style={styles.value}>{task.cost} €</Text>
                    <Text style={styles.label}>Όνομα Λιπάσματος</Text>
                    <Text style={styles.value}>{task.name}</Text>
                </>
            )}
            {type === 'spraying' && (
                <>
                    <Text style={styles.label}>Κόστος</Text>
                    <Text style={styles.value}>{task.cost} €</Text>
                    <Text style={styles.label}>Όνομα Φυτοφάρμακου</Text>
                    <Text style={styles.value}>{task.name}</Text>
                </>
            )}
            {type === 'grinding' && (
                <>
                    <Text style={styles.label}>Κιλά Ελιάς</Text>
                    <Text style={styles.value}>{task.olive_kg} kg</Text>
                    <Text style={styles.label}>Κιλά Ελαιόλαδου</Text>
                    <Text style={styles.value}>{task.oil_kg} kg</Text>
                    <Text style={styles.label}>Οξείδωση</Text>
                    <Text style={styles.value}>{task.oxide} %</Text>
                </>
            )}
            {type === 'harvest' && (
                <>
                    <Text style={styles.label}>Κόστος</Text>
                    <Text style={styles.value}>{task.cost} €</Text>
                    <Text style={styles.label}>Τσουβάλια</Text>
                    <Text style={styles.value}>{task.sacks} τσουβάλια</Text>
                </>
            )}

            <Text style={styles.label}>Σχόλια</Text>
            <Text style={styles.value}>{task.comment}</Text>

            <Pressable onPress={() => handleDelete()}>
                <Text style={styles.underlineText}>Διαγραφή Εργασίας</Text>
            </Pressable>
        </View>
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
  value: {
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#282828',
    color: '#fff',
    width: '100%',
    padding: 10,
  },
  underlineText: {
    textDecorationLine: 'underline',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
  },
});

export default taskDetails;