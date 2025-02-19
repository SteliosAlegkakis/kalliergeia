import { router, useNavigation } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { deleteSale } from "./database/saleTable";

const saleDetails = () => {

    const navigation = useNavigation();
    

    useEffect(() => {
        navigation.setOptions({ title: 'Λεπτομέριες Πώλησης' });
    }, []);

    const params = useSearchParams();
    const saleString:any = params.get('sale');
    const sale = JSON.parse(saleString);

    function handleDelete(): void {
        Alert.alert(
            'Διαγραφή Πώλησης',
            'Είστε σίγουροι οτι θέλετε να διαγράψετε την πώληση;',
            [
                {
                    text: 'Διαγραφή',
                    onPress: () => {
                        deleteSale(sale.sale_id);
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
            <Text style={styles.value}>{sale.date}</Text>
            
            <Text style={styles.label}>Ποσότητα Ελαιόλαδου</Text>
            <Text style={styles.value}>{sale.oil_kg} kg</Text>

            <Text style={styles.label}>Τιμή ανά κιλό</Text>
            <Text style={styles.value}>{sale.price_per_kilo} €</Text>

            <Text style={styles.label}>Συνολικό Ποσό</Text>
            <Text style={styles.value}>{sale.total} €</Text>

            <Text style={styles.label}>Σχόλια</Text>
            <Text style={styles.value}>{sale.comment}</Text>

            <Pressable onPress={() => handleDelete()}>
                <Text style={styles.underlineText}>Διαγραφή Πώλησης</Text>
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
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
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

export default saleDetails;