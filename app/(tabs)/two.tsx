import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { PieChart } from 'react-native-chart-kit';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import RoundButton from '@/components/RoundButton';
import { getWateringCostTotal } from '../database/wateringTable';
import { getFertilizationCostTotal } from '../database/fertilizationTable';
import { getSprayingCostTotal } from '../database/sprayingTable';
import { getHarvestCostTotal } from '../database/harvestTable';
import { getTotal } from '../database/grindingTable';
import { router, useFocusEffect } from 'expo-router';
import { getSales, getTotalIncome } from '../database/saleTable';
import Sale from '@/components/Sale';
import { getOtherCostTotal } from '../database/otherTable';
import { getStoredYears, addYear} from '../utilities/storage';
import DropDownPicker from 'react-native-dropdown-picker';

export default function TabTwoScreen() {

  const [watering, setWatering] = useState(0);
  const [fertilization, setFertilization] = useState(0);
  const [spraying, setSpraying] = useState(0);
  const [harvest, setHarvest] = useState(0);
  const [other, setOther] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const [income, setIncome] = useState(0);
  const [oil, setOil] = useState(0);
  const [costPerKg, setCostPerKg] = useState('-');
  const [profit, setProfit] = useState(0);

  const [sales, setSales] = useState<any>([]);
  
  const [years, setYears] = useState<any>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [openYear, setOpenYear] = useState(false);

  const fetchCosts = async () => {
    const wateringCost: any = await getWateringCostTotal();
    const fertilizationCost: any = await getFertilizationCostTotal();
    const sprayingCost: any = await getSprayingCostTotal();
    const harvestCost: any = await getHarvestCostTotal();
    const otherCost: any = await getOtherCostTotal();
    setWatering(wateringCost[0].totalCost);
    setFertilization(fertilizationCost[0].totalCost);
    setSpraying(sprayingCost[0].totalCost);
    setHarvest(harvestCost[0].totalCost);
    setOther(otherCost[0].totalCost);
    const total = wateringCost[0].totalCost + fertilizationCost[0].totalCost + sprayingCost[0].totalCost + harvestCost[0].totalCost + otherCost[0].totalCost;
    setTotalCost(total);
  }

  const fetchProduction = async () => {
    const totalIncome: any = await getTotalIncome();
    setIncome(totalIncome[0].totalIncome);
    const oil: any = await getTotal();
    setOil(oil[0].totalOil);
    const sales:any = await getSales();
    setSales(sales);
    const profit = totalIncome[0].totalIncome - totalCost;
    if(profit > 0) setProfit(profit);
    else setProfit(0);
    const costPerKg = totalCost / oil[0].totalOil;
    if(oil[0].totalOil > 0) setCostPerKg(costPerKg.toFixed(2) + ' €');
    else setCostPerKg('-');
  }

  const loadYears = async () => {
    addYear(new Date().getFullYear());
    const years = await getStoredYears();
    setYears(years);
  }

  useEffect(() => {
    fetchCosts();
    fetchProduction();
    loadYears();
  }, []);

  useFocusEffect(() => {
    fetchCosts();
    fetchProduction();
    loadYears();
  });


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
              ickIconStyle = {{tintColor: 'white'}}
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
              cost: watering,
              color: "rgba(131, 167, 234, 1)",
              legendFontColor: "white",
              legendFontSize: 15
            },
            {
              name: "€ Λίπασμα",
              cost: fertilization,
              color: "rgb(171, 190, 46)",
              legendFontColor: "white",
              legendFontSize: 15
            },
            {
              name: "€ Ψέκασμα",
              cost: spraying,
              color: "rgba(123, 31, 162, 1)",
              legendFontColor: "white",
              legendFontSize: 15
            },
            {
              name: "€ Συγκομιδή",
              cost: harvest,
              color: "rgba(58, 131, 121, 1)",
              legendFontColor: "white",
              legendFontSize: 15
            },
            {
              name: "€ Άλλo",
              cost: other,
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
          <Text style={[styles.title, {marginTop: 10, marginBottom: 10}]}>Παραγωγή</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.column, {width: '50%'}, {marginTop: 10}]}>
            <View style={styles.column}>
              <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>{income} €</Text>
              <Text style={[styles.title, {color: "#AFAFAF"}]}>'Εσοδα</Text>
            </View>
            <View style={[styles.column, {marginTop: 10}]}>
              <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>{oil} kg</Text>
              <Text style={[styles.title, {color: "#AFAFAF"}]}>Ελαιόλαδο</Text>
            </View>
          </View>
          <View style={[styles.column, {width: '50%'}, {marginTop: 10}]}>
            <View style={styles.column}>
              <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>{profit} €</Text>
              <Text style={[styles.title, {color: "#AFAFAF"}]}>Κέρδος</Text>
            </View>
            <View style={[styles.column, {marginTop: 10}]}>
              <Text style={[{fontSize: 20, fontWeight: 'bold', color: '#fff'}]}>{costPerKg}</Text>
              <Text style={[styles.title, {color: "#AFAFAF"}]}>Κόστος/Κιλό</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.row, {marginTop: 10,marginLeft: 10, alignItems: 'center'}, {backgroundColor: 'black'}]}>
        <Text style={[styles.title, {color: '#fff'}]}>
          <FontAwesome5 name="history" size={20} color="white"/>{"  "}
          Ιστορικό Πωλήσεων
        </Text>
      </View>
      
      <ScrollView>
        {sales.length === 0 ? (
          <Text style={[styles.title, {color: '#fff'}, {marginTop: "10%"}]}>Δεν υπάρχουν καταχωρημένες πωλήσεις</Text>
        ) : (
          sales.map((sale:any, index:any) => (
              <Sale key={index} sale={sale} />
          ))
        )}
      </ScrollView>

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
