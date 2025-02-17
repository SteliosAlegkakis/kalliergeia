import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { PieChart } from 'react-native-chart-kit';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import RoundButton from '@/components/RoundButton';
import { getWateringCostTotal } from '../database/wateringTable';
import { getFertilizationCostTotal } from '../database/fertilizationTable';
import { getSprayingCostTotal } from '../database/sprayingTable';
import { getHarvestCostTotal } from '../database/harvestTable';
import { router, useFocusEffect } from 'expo-router';


export default function TabTwoScreen() {

  const [watering, setWatering] = useState(0);
  const [fertilization, setFertilization] = useState(0);
  const [spraying, setSpraying] = useState(0);
  const [harvest, setHarvest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const fetchCosts = async () => {
    const wateringCost: any = await getWateringCostTotal();
    const fertilizationCost: any = await getFertilizationCostTotal();
    const sprayingCost: any = await getSprayingCostTotal();
    const harvestCost: any = await getHarvestCostTotal();
    setWatering(wateringCost[0].totalCost);
    setFertilization(fertilizationCost[0].totalCost);
    setSpraying(sprayingCost[0].totalCost);
    setHarvest(harvestCost[0].totalCost);
    const total = wateringCost[0].totalCost + fertilizationCost[0].totalCost + sprayingCost[0].totalCost + harvestCost[0].totalCost;
    setTotalCost(total);
  }

  useEffect(() => {
    fetchCosts();
  }, []);

  useFocusEffect(() => {
    fetchCosts();
  });


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
        
        <PieChart
          data={[
            {
              name: "€ Πότισμα",
              cost: watering,
              color: "rgba(131, 167, 234, 1)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            {
              name: "€ Λίπασμα",
              cost: fertilization,
              color: "rgb(171, 190, 46)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            {
              name: "€ Ψέκασμα",
              cost: spraying,
              color: "rgba(123, 31, 162, 1)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            {
              name: "€ Συγκομιδή",
              cost: harvest,
              color: "rgba(58, 131, 121, 1)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
          ]}
          width={350}
          height={200}
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
        <Text style={[styles.title, {marginTop: 10, marginBottom: 10}]}>Παραγωγή</Text>
        </View>
        <View style={[styles.row, {width: '60%'}, {marginTop: 10}]}>
          <View style={styles.column}>
            <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>1000 €</Text>
            <Text style={[styles.title, {color: "#AFAFAF"}]}>'Εσοδα</Text>
          </View>
          <View style={styles.column}>
            <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>100 kg</Text>
            <Text style={[styles.title, {color: "#AFAFAF"}]}>Ελαιόλαδο</Text>
          </View>
        </View>
      </View>
      <View style={[styles.row, {marginTop: 10,marginLeft: 10, alignItems: 'center'}, {backgroundColor: 'black'}]}>
        <Text style={[styles.title, {color: '#fff'}]}>
          <FontAwesome5 name="history" size={20} color="white"/>{"  "}
          Ιστορικό Πωλήσεων
        </Text>
      </View>


      <RoundButton onPress={() => {router.push("../incomeForm")}} />
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
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
button: {
  flexDirection: 'row', 
  alignItems: 'center',
  backgroundColor: 'black',
  padding: 4, 
  borderRadius:10
},
});
