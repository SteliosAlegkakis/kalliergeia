import { View } from "@/components/Themed";
import { useRouter, useNavigation, useLocalSearchParams, Link, useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import RoundButton from "@/components/RoundButton";
import Task from "@/components/Task"
import { getWatering, getWateringCost } from "./database/wateringTable";
import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { getGrinding, getMedianOxide, getTotalOil } from "./database/grindingTable";
import { getHarvest, getHarvestCost, getTotalSacks } from "./database/harvestTable";
import { getFertilization, getFertilizationCost } from "./database/fertilizationTable";
import { getSpraying, getSprayingCost } from "./database/sprayingTable";
import { PieChart } from "react-native-chart-kit";
import { getOther, getOtherCost } from "./database/otherTable";
import { getTotalTrees } from "./database/fieldsTable";
import { getStoredYears, addYear} from './utilities/storage';


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
        { label : 'Άλλο', value: 'other'}
    ]);

    const [fertilCost, setFertilCost] = useState(0);
    const [waterCost, setWaterCost] = useState(0);
    const [harvestCost, setHarvestCost] = useState(0);
    const [sprayCost, setSprayCost] = useState(0);
    const [otherCost, setOtherCost] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    const [oil, setOil] = useState(0);
    const [oxide, setOxide] = useState("-");
    const [sacksPerTree, setSacksPerTree] = useState('0');
    const [costPerKg, setCostPerKg] = useState('-');

    const [years, setYears] = useState<any>([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [openYear, setOpenYear] = useState(false);

    const fetchTasks = async () => {
        try {
            let tasks: any;
            if(taskType === 'grinding') tasks = await getGrinding(fieldId, selectedYear);
            if(taskType === 'watering') tasks = await getWatering(fieldId, selectedYear);
            if(taskType === 'harvest') tasks = await getHarvest(fieldId, selectedYear);
            if(taskType === 'fertilization') tasks = await getFertilization(fieldId, selectedYear);
            if(taskType === 'spraying') tasks = await getSpraying(fieldId, selectedYear);
            if(taskType === 'other') tasks = await getOther(fieldId, selectedYear);
            setTasks(tasks);
        } catch (error) {
            alert("Error fetching tasks");
        }
    }

    const fetchData = async () => {
        const waterCost:any = await getWateringCost(fieldId, selectedYear);
        setWaterCost(waterCost[0].totalCost);
        const fertilCost:any = await getFertilizationCost(fieldId, selectedYear);
        setFertilCost(fertilCost[0].totalCost);
        const harvestCost:any = await getHarvestCost(fieldId, selectedYear);
        setHarvestCost(harvestCost[0].totalCost);
        const sprayCost:any = await getSprayingCost(fieldId, selectedYear);
        setSprayCost(sprayCost[0].totalCost);
        const otherCost:any = await getOtherCost(fieldId, selectedYear);
        setOtherCost(otherCost[0].totalCost);
        const totalCost = waterCost[0].totalCost + fertilCost[0].totalCost + harvestCost[0].totalCost + sprayCost[0].totalCost + otherCost[0].totalCost;
        setTotalCost(totalCost);

        const oxide:any = await getMedianOxide(fieldId, selectedYear);
        const roundOxide = parseFloat(oxide[0].medianOxide).toFixed(1);
        setOxide(roundOxide+" %");
        if(oxide[0].medianOxide === "-") setOxide("-");
        const oil:any = await getTotalOil(fieldId, selectedYear);
        setOil(oil[0].totalOil);
        const harvest:any = await getTotalSacks(fieldId, selectedYear);
        const sacks = harvest[0].totalSacks;
        const trees: any = await getTotalTrees(fieldId);
        const totalTrees = trees[0].total_trees;
        const sacksPerTree = sacks/totalTrees;
        setSacksPerTree(sacksPerTree.toFixed(1));

        const costPerKg = totalCost/oil[0].totalOil;
        if(oil[0].totalOil > 0) setCostPerKg(costPerKg.toFixed(2)+ " €");
        else setCostPerKg('-');

    }

    const loadYears = async () => {
        addYear(new Date().getFullYear());
        const years = await getStoredYears();
        setYears(years);
    }

    useEffect(() => {
        navigation.setOptions(
            {title: fieldName,}
        );
        fetchData();
        fetchTasks();
        loadYears();
    }, [taskType, selectedYear]);

    useFocusEffect(
        React.useCallback(() => {
          fetchData();
          fetchTasks();
          loadYears();
        }, [taskType, selectedYear])
    );

    return (
        <SafeAreaView style={{ flex: 1 ,alignItems: 'center'}}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={[styles.title, {marginRight: '58%'}]}>Έξοδα</Text>
                        <DropDownPicker style={[{maxWidth: '30%'}, {padding: 0}, {backgroundColor: 'black'}]}  
                            open={openYear}
                            value={selectedYear}
                            items={years}
                            setOpen={setOpenYear}
                            setValue={(value => {setSelectedYear(value);})}
                            setItems={setYears}
                            placeholderStyle={[{ color: '#fff' }, { fontWeight: 'bold' }]}
                            textStyle={[{ color: '#fff' }, { fontWeight: 'bold' }]}
                            dropDownContainerStyle={{backgroundColor: 'black'}}
                            arrowIconStyle = {{tintColor: 'white'}}
                            tickIconStyle = {{tintColor: 'white'}}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={[{fontSize: 20},{color: '#fff'}, {fontWeight: 'bold'}, {marginBottom: 5}]}>
                           - {totalCost} €
                        </Text>
                        <Text style={[styles.title, {color: '#AFAFAF'}]}>Συνολικά Έξοδα</Text>
                    </View>
                    <PieChart
                        data={[
                            {
                            name: "€ Πότισμα",
                            cost: waterCost,
                            color: "rgba(131, 167, 234, 1)",
                            legendFontColor: "white",
                            legendFontSize: 15
                            },
                            {
                            name: "€ Λίπασμα",
                            cost: fertilCost,
                            color: "rgb(171, 190, 46)",
                            legendFontColor: "white",
                            legendFontSize: 15
                            },
                            {
                            name: "€ Ψέκασμα",
                            cost: sprayCost,
                            color: "rgba(123, 31, 162, 1)",
                            legendFontColor: "white",
                            legendFontSize: 15
                            },
                            {
                            name: "€ Συγκομιδή",
                            cost:  harvestCost,
                            color: "rgba(58, 131, 121, 1)",
                            legendFontColor: "white",
                            legendFontSize: 15
                            },
                            {
                            name: "€ Άλλο",
                            cost: otherCost,
                            color: "rgb(205, 149, 61)",
                            legendFontColor: "white",
                            legendFontSize: 15
                            },
                        ]}
                        width={350}
                        height={150}
                        chartConfig={{
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        accessor="cost"
                        backgroundColor="transparent"
                        paddingLeft="0"
                        absolute
                    />
                    <View style={styles.row}>
                        <Text style={styles.title}>Παραγωγή</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.column, {width: '50%'}, {marginTop: 10}]}>
                            <View style={styles.column}>
                                <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>{oil} kg</Text>
                                <Text style={[styles.title, {color: "#AFAFAF"}]}>Ελαιόλαδο</Text>
                            </View>
                            <View style={[styles.column, {marginTop: 10}]}>
                                <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>{oxide}</Text>
                                <Text style={[styles.title, {color: "#AFAFAF"}]}>Μέση οξύτητα</Text>
                            </View>
                        </View>
                        <View style={[styles.column, {width: '50%'}, {marginTop: 10}]}>
                            <View style={styles.column}>
                                <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>{costPerKg}</Text>
                                <Text style={[styles.title, {color: "#AFAFAF"}]}>Κόστος/Κιλό</Text>
                            </View>
                            <View style={[styles.column, {marginTop: 10}]}>
                                <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>{sacksPerTree}</Text>
                                <Text style={[styles.title, {color: "#AFAFAF"}]}>Τσουβάλια/Δέντρο</Text>
                            </View>
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
                    <Text style={[styles.title, {marginTop: "10%"}]}>Δεν υπάρχουν καταχωρημένες εργασίες</Text>
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