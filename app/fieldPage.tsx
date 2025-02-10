import { View } from "@/components/Themed";
import { useRouter, useNavigation, useLocalSearchParams, Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import RoundButton from "@/components/RoundButton";
import Task from "@/components/Task"

export default function fieldPage() {

    const navigation = useNavigation();
    const router = useRouter();
    const { fieldName, fieldId } = useLocalSearchParams(); // Get query params

    useEffect(() => {
        navigation.setOptions(
            {title: fieldName,}
        );
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 ,alignItems: 'center'}}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.title}>Έξοδα</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {}}>
                            <Text style={styles.title}>2024</Text>
                            <AntDesign name="down" size={16} color='#fff' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.column}>
                        <Text style={[{fontSize: 20},{color: '#fff'}, {fontWeight: 'bold'}, {marginBottom: 5}]}>
                           - 200 €
                        </Text>
                        <Text style={[styles.title, {color: '#AFAFAF'}]}>Συνολικά Έξοδα</Text>
                    </View>
                    <View style={[styles.row, {marginBottom:10}]}>
                        <View style={[styles.costContainer]}>
                            <Text style={styles.title}>Πότισμα</Text>
                            <Text style={styles.cost}>- 40 €</Text>
                        </View>
                        <View style={[styles.costContainer]}>
                            <Text style={styles.title}>Ψέκασμα</Text>
                            <Text style={styles.cost}>- 40 €</Text>
                        </View>
                        <View style={[styles.costContainer]}>
                            <Text style={styles.title}>Λίπανση</Text>
                            <Text style={styles.cost}>- 40 €</Text>
                        </View>
                        <View style={[styles.costContainer]}>
                            <Text style={styles.title}>Μάζεμα</Text>
                            <Text style={styles.cost}>- 60 €</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>Παραγωγή</Text>
                    </View>
                    <View style={[styles.row, {width: '60%'}, {marginTop: 10}]}>
                        <View style={styles.column}>
                        <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>200 kg</Text>
                        <Text style={[styles.title, {color: "#AFAFAF"}]}>Ελαιόλαδο</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>0,6 %</Text>
                            <Text style={[styles.title, {color: "#AFAFAF"}]}>Οξύτητα</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.row, {marginTop: 10}, {backgroundColor: 'black'}, {justifyContent: 'flex-start'}]}>
                    <FontAwesome5 name="history" size={24} color="white"/>
                    <Text style={[styles.title, {color: '#fff'}, {marginLeft: 10}]}>Ιστορικό Εργασιών</Text>
                </View>

                <View style={[]}>
                    <Task type="Πότισμα" date="29/10/2024" task_id={1}/>
                    <Task type="Ψέκασμα" date="29/10/2024" task_id={2}/>
                    <Task type="Λίπανση" date="29/10/2024" task_id={3}/>
                    <Task type="Μάζεμα" date="29/10/2024" task_id={4}/>
                    <Task type="Πότισμα" date="29/10/2024" task_id={5}/>
                </View>

            </ScrollView>

            <RoundButton onPress={() => {router.push("/taskForm")}} />
            <TouchableOpacity style={{position: 'absolute', top: '80%', right: 20, elevation: 5}} onPress={()=>{router.push(`/fieldDetails?fieldName=${fieldName}&fieldId=${fieldId}`)}}>
                <Ionicons name="information-circle" size={50} color="white"/>
            </TouchableOpacity>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "99%",
        backgroundColor: '#282828',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#282828',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#282828',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    button: {
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 4, 
        borderRadius:10
    },
    costContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 15,
    },
    cost: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});