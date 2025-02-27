import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addGrinding } from './database/grindingTable';
import { addHarvest } from './database/harvestTable';
import { addFertilization } from './database/fertilizationTable';
import { addSpraying } from './database/sprayingTable';
import { addWatering } from './database/wateringTable';
import { addOther } from './database/otherTable';
import { addYear } from './utilities/storage';

export default function FormScreen() {

  const router = useRouter();
  const navigation = useNavigation();
  const fieldId = useLocalSearchParams().fieldId;

  const [description, setDescription] = useState('');

  const [oilQuantity, setOilQuantity] = useState<any>();
  const [oliveQuantity, setOliveQuantity] = useState<any>();
  const [oxide, setOxide] = useState<any>();

  const [cost, setCost] = useState<any>();
  const [name, setName] = useState('');

  const [cubic, setCubic] = useState<any>();

  const [sacks, setSacks] = useState<any>();

  const [task_name, setTaskName] = useState('');

  const [open, setOpen] = useState(false);
  const [taskType, setTaskType] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: 'Άλεση', value: 'grinding' },
    { label: 'Λίπασμα', value: 'fertilization' },
    { label: 'Πότισμα', value: 'watering' },
    { label: 'Συγκομιδή', value: 'harvest' },
    { label: 'Ψέκασμα', value: 'spraying' },
    { label: 'Άλλο', value: 'other' },
  ]);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);
  const onChangeDate = (event: any, selectedDate: any) => {
    if(event.type === 'dismissed') {
      toggleDatePicker();
      return;
    };
    const currentDate = selectedDate || date;
    setDate(currentDate);
    toggleDatePicker();
  }

  useEffect(() => {
    navigation.setOptions({ title: 'Προσθήκη Εργασίας' });
  }, []);

  const validateForm = () => {
    if (!taskType) return false;
    if(taskType === 'grinding') {
      if (!oliveQuantity || !oilQuantity || !oxide) return false;
    } else if (taskType === 'fertilization' || taskType === 'spraying') {
      if (!cost || !name) return false;
    } else if (taskType === 'watering') {
      if (!cubic || !cost) return false;
    } else if (taskType === 'harvest') {
      if (!cost || !sacks) return false
    } else if (taskType === 'other') {
      if (!cost || !task_name) return false;
    }
    return true;
  };

  const submitGrinding = () => {
    addGrinding(parseInt(fieldId.toString()), oliveQuantity, oilQuantity, oxide, date.toLocaleDateString("el-GR"), date.getFullYear(), description);
    Alert.alert('Επιτυχία', 'Η εργασία καταχωρήθηκε με επιτυχία');
    router.back();
  };

  const submitFertilization = () => {
    addFertilization(parseInt(fieldId.toString()), cost, name, date.toLocaleDateString("el-GR"), date.getFullYear(), description);
    router.back();
  };

  const submitSpraying = () => {
    addSpraying(parseInt(fieldId.toString()), cost, name, date.toLocaleDateString("el-GR"), date.getFullYear(), description);
    Alert.alert('Επιτυχία', 'Η εργασία καταχωρήθηκε με επιτυχία');
    router.back();
  };

  const submitWatering = async () => {
    addWatering(parseInt(fieldId.toString()), cost, cubic, date.toLocaleDateString("el-GR"), date.getFullYear(), description);
    Alert.alert('Επιτυχία', 'Η εργασία καταχωρήθηκε με επιτυχία');
    router.back();
  };

  const submitHarvest = () => {
    addHarvest(parseInt(fieldId.toString()), cost, sacks, date.toLocaleDateString("el-GR"), date.getFullYear(), description);
    Alert.alert('Επιτυχία', 'Η εργασία καταχωρήθηκε με επιτυχία');
    router.back();
  };

  const submitOther = () => {
    addOther(parseInt(fieldId.toString()), cost, task_name, date.toLocaleDateString("el-GR"), date.getFullYear(), description);
    Alert.alert('Επιτυχία', 'Η εργασία καταχωρήθηκε με επιτυχία');
    router.back();
  }

  const handleSubmit = () => {
    if (!validateForm()) Alert.alert('Προσοχη!', 'Συμπληρώστε σωστά τα υποχρεωτικά πεδία');
    else {
      addYear(date.getFullYear());
      if(taskType === 'grinding') submitGrinding();
      else if(taskType === 'fertilization') submitFertilization();
      else if(taskType === 'spraying') submitSpraying();
      else if(taskType === 'watering') submitWatering();
      else if(taskType === 'harvest') submitHarvest();
      else if(taskType === 'other') submitOther();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Είδος Εργασίας*</Text>
      <DropDownPicker style={styles.input}
        open={open}
        value={taskType}
        items={items}
        setOpen={setOpen}
        setValue={setTaskType}
        setItems={setItems}
        placeholder="Είδος Εργασίας"
        placeholderStyle={[{ color: '#fff' }, { fontWeight: 'bold' }]}
        textStyle={[{ color: '#fff' }, { fontWeight: 'bold' }]}
        dropDownContainerStyle={{backgroundColor: '#282828'}}
        arrowIconStyle = {{tintColor: 'white'}}
        tickIconStyle = {{tintColor: 'white'}}
      />
      <ScrollView>
        <Text style={styles.label}>Ημερομηνία *</Text>
        {
          showDatePicker && (
            <DateTimePicker
              mode='date'
              display='spinner'
              value={date}
              onChange={onChangeDate}
            />
          )
        }
        <Pressable onPress={toggleDatePicker}>
          <TextInput style={styles.input}
            value={date.toLocaleDateString('el-GR')}
            editable={false}
            onChangeText={text => setDate(new Date(text))}
          />
        </Pressable>
  
        { taskType === 'grinding' && (<>
          <Text style={styles.label}>Ποσότητα Άλεσης (κιλά) *</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={oliveQuantity}
            onChangeText={text => setOliveQuantity(parseFloat(text))}
          />

          <Text style={styles.label}>Ποσότητα Ελαιολάδου (κιλά) *</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={oilQuantity}
            onChangeText={text => setOilQuantity(parseFloat(text))}
          />

          <Text style={styles.label}>Οξύτητα (%) *</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={oxide}
            onChangeText={text => setOxide(parseFloat(text))}
          />
        </>)}

        { (taskType === 'fertilization' || taskType === 'spraying') && (<>
          <Text style={styles.label}>Κόστος (€) *</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={cost}
            onChangeText={text => setCost(parseFloat(text))}
          />

          <Text style={styles.label}>Όνομα Φαρμάκου *</Text>
          <TextInput 
            style={styles.input} 
            value={name}
            onChangeText={text => setName(text)}
          />
        </>)}

        { taskType === 'watering' && (<>
          <Text style={styles.label}>Κυβικά Νερού *</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={cubic}
            onChangeText={text => setCubic(parseFloat(text))}
          />

          <Text style={styles.label}>Κόστος (€) *</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={cost}
            onChangeText={text => setCost(parseFloat(text))}
          />
        </>)}

        { taskType === 'harvest' && (<>
          <Text style={styles.label}>Κόστος (€) *</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={cost}
            onChangeText={text => setCost(parseFloat(text))}
          />

          <Text style={styles.label}>Συνολικά Τσουβάλια *</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={sacks}
            onChangeText={text => setSacks(parseInt(text))}
          />
        </>)}

        { taskType === 'other' && (<>
          <Text style={styles.label}>Όνομα Εργασίας *</Text>
          <TextInput 
            style={styles.input} 
            value={task_name}
            onChangeText={text => setTaskName(text)}
          />

          <Text style={styles.label}>Κόστος (€) *</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            value={cost}
            onChangeText={text => setCost(parseFloat(text))}
          />
        </>)}

        <Text style={styles.label}>Σχόλια</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      
        <View style={styles.buttons}>
          <Pressable style={styles.submit} onPress={handleSubmit}>
              <Text style={styles.text}>Προσθήκη</Text>
          </Pressable>
          <Pressable style={styles.cancel} onPress={() => router.back()}>
              <Text style={styles.underlineText}>Ακύρωση</Text>
          </Pressable>
        </View>
      </ScrollView>
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