import { View } from "@/components/Themed";
import { useRouter, useNavigation, useLocalSearchParams, Link, useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import RoundButton from "@/components/RoundButton";
import Task from "@/components/Task"
import { getWatering, getWateringCost } from "./database/wateringTable";
import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { getGrinding, getMedianOxide, getTotalOil } from "./database/grindingTable";
import { getHarvest, getHarvestCost } from "./database/harvestTable";
import { getFertilization, getFertilizationCost } from "./database/fertilizationTable";
import { getSpraying, getSprayingCost } from "./database/sprayingTable";

export default function fieldPage() {

    const navigation = useNavigation();
    const router = useRouter();
    const { fieldName, fieldId } = useLocalSearchParams(); // Get query params

    const [tasks, setTasks] = useState<any>([]);
    const [taskType, setTaskType] = useState('grinding');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Άλεση', value: 'grinding' },
        { label: 'Λίπασμα', value: 'fertilization' },
        { label: 'Πότισμα', value: 'watering' },
        { label: 'Συγκομιδή', value: 'harvest' },
        { label: 'Ψέκασμα', value: 'spraying' },
    ]);

    const [fertilCost, setFertilCost] = useState();
    const [waterCost, setWaterCost] = useState();
    const [harvestCost, setHarvestCost] = useState();
    const [sprayCost, setSprayCost] = useState();
    const [totalCost, setTotalCost] = useState();

    const [oil, setOil] = useState(0);
    const [oxide, setOxide] = useState("-");

    useEffect(() => {
        navigation.setOptions(
            {title: fieldName,}
        );
        fetchTasks();
        fetchCosts();
        fetchProduce();
    }, [taskType]);

    const fetchTasks = async () => {
        try {
            let tasks:any;
            if(taskType === 'grinding') tasks = await getGrinding(fieldId);
            if(taskType === 'watering') tasks = await getWatering(fieldId);
            if(taskType === 'harvest') tasks = await getHarvest(fieldId);
            if(taskType === 'fertilization') tasks = await getFertilization(fieldId);
            if(taskType === 'spraying') tasks = await getSpraying(fieldId);
            setTasks(tasks);
        } catch (error) {
            alert("Error fetching tasks");
        }
    }

    const fetchCosts = async () => {
        const waterCost:any = await getWateringCost(fieldId);
        setWaterCost(waterCost[0].totalCost);
        const fertilCost:any = await getFertilizationCost(fieldId);
        setFertilCost(fertilCost[0].totalCost);
        const harvestCost:any = await getHarvestCost(fieldId);
        setHarvestCost(harvestCost[0].totalCost);
        const sprayCost:any = await getSprayingCost(fieldId);
        setSprayCost(sprayCost[0].totalCost);
        setTotalCost(waterCost[0].totalCost + fertilCost[0].totalCost + harvestCost[0].totalCost + sprayCost[0].totalCost);
    }

    const fetchProduce = async () => {
        const oxide:any = await getMedianOxide(fieldId);
        const roundOxide = parseFloat(oxide[0].medianOxide).toFixed(1);
        setOxide(roundOxide+" %");
        if(oxide[0].medianOxide === "-") setOxide("-");
        const oil:any = await getTotalOil(fieldId);
        setOil(oil[0].totalOil);
    }

    useFocusEffect(
        React.useCallback(() => {
          setTaskType('grinding');
          fetchTasks();
          fetchCosts();
          fetchProduce();
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1 ,alignItems: 'center'}}>
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
                           - {totalCost} €
                        </Text>
                        <Text style={[styles.title, {color: '#AFAFAF'}]}>Συνολικά Έξοδα</Text>
                    </View>
                    <View style={[styles.row, {marginBottom:10}]}>
                        <View style={[styles.costContainer]}>
                            <Text style={styles.title}>Πότισμα</Text>
                            <Text style={styles.cost}>- {waterCost} €</Text>
                        </View>
                        <View style={[styles.costContainer]}>
                            <Text style={styles.title}>Ψέκασμα</Text>
                            <Text style={styles.cost}>- {sprayCost} €</Text>
                        </View>
                        <View style={[styles.costContainer]}>
                            <Text style={styles.title}>Λίπανση</Text>
                            <Text style={styles.cost}>- {fertilCost} €</Text>
                        </View>
                        <View style={[styles.costContainer]}>
                            <Text style={styles.title}>Μάζεμα</Text>
                            <Text style={styles.cost}>- {harvestCost} €</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>Παραγωγή</Text>
                    </View>
                    <View style={[styles.row, {width: '60%'}, {marginTop: 10}]}>
                        <View style={styles.column}>
                        <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>{oil} kg</Text>
                        <Text style={[styles.title, {color: "#AFAFAF"}]}>Ελαιόλαδο</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>{oxide}</Text>
                            <Text style={[styles.title, {color: "#AFAFAF"}]}>Μέση οξύτητα</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.row, {marginTop: 10}, {backgroundColor: 'black'}]}>
                    <FontAwesome5 name="history" size={24} color="white"/>
                    <Text style={[styles.title, {color: '#fff'}, {marginLeft: 10}, {marginRight: "33%"}]}>Ιστορικό</Text>
                    <DropDownPicker style={styles.input}
                        open={open}
                        value={taskType}
                        items={items}
                        setOpen={setOpen}
                        setValue={(value => {setTaskType(value);})}
                        setItems={setItems}
                        placeholderStyle={[{ color: '#fff' }, { fontWeight: 'bold' }]}
                        textStyle={[{ color: '#fff' }, { fontWeight: 'bold' }]}
                        dropDownContainerStyle={{backgroundColor: '#282828'}}
                        arrowIconStyle = {{tintColor: 'white'}}
                        tickIconStyle = {{tintColor: 'white'}}
                    />
                </View>

                <ScrollView style={[]}>
                {tasks.length === 0 ? (
                    <Text style={[styles.title, {marginTop: "40%"}]}>Δεν υπάρχουν καταχωρημένες εργασίες</Text>
                ) : (
                    tasks.map((task:any, index:any) => (
                        <Task key={index} type={taskType} task={task} />
                    ))
                )}
                </ScrollView>

            <RoundButton onPress={() => {router.push(`/taskForm?fieldId=${fieldId}`)}} />
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
        alignItems: 'center',
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
    input: {
        maxWidth: '40%',
        borderRadius: 10,
        backgroundColor: '#282828',
        color: '#fff',
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
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#fff',
    },
});