import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

export default function FormScreen() {

  const router = useRouter();
  const navigation = useNavigation();

  const [description, setDescription] = useState('');
  const date = new Date();
  const formattedDate = date.toLocaleDateString('el-GR'); // (e.g. 20/2/2022)

  const [oilQuantity, setOilQuantity] = useState<any>();
  const [oliveQuantity, setOliveQuantity] = useState<any>();
  const [oxide, setOxide] = useState<any>();

  const [cost, setCost] = useState<any>();
  const [name, setName] = useState('');

  const [indication, setIndication] = useState<any>();

  const [sacks, setSacks] = useState<any>();

  const [open, setOpen] = useState(false);
  const [taskType, setTaskType] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: 'Άλεση', value: 'Άλεση' },
    { label: 'Λίπασμα', value: 'Λίπασμα' },
    { label: 'Πότισμα', value: 'Πότισμα' },
    { label: 'Συγκομιδή', value: 'Συγκομιδή' },
    { label: 'Ψέκασμα', value: 'Ψέκασμα' },
  ]);

  useEffect(() => {
    navigation.setOptions({ title: 'Προσθήκη Εργασίας' });
  }, []);

  const validateForm = () => {
    if (!taskType) return false;
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) Alert.alert('Προσοχη!', 'Συμπληρώστε τα υποχρεωτικά πεδία');
    else {
    //   addField(name, location, parseInt(totalTrees), parseFloat(size), description);
    //   Alert.alert('Επιτυχής Προσθήκη', 'Το χωράφι προστέθηκε επιτυχώς');
    //   router.back();
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

      { taskType === 'Άλεση' && (<>
        <Text style={styles.label}>Ποσότητα Άλεσης (κιλά) *</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric"
          value={oliveQuantity}
          onChangeText={text => setOliveQuantity(parseInt(text))}
        />

        <Text style={styles.label}>Ποσότητα Ελαιολάδου (κιλά) *</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric"
          value={oilQuantity}
          onChangeText={text => setOilQuantity(parseInt(text))}
        />

        <Text style={styles.label}>Οξύτητα (%) *</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric"
          value={oxide}
          onChangeText={text => setOxide(parseInt(text))}
        />
      </>)}

      { (taskType === 'Λίπασμα' || taskType === 'Ψέκασμα') && (<>
        <Text style={styles.label}>Κόστος (€) *</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric"
          value={cost}
          onChangeText={text => setCost(parseInt(text))}
        />

        <Text style={styles.label}>Όνομα Φαρμάκου *</Text>
        <TextInput 
          style={styles.input} 
          value={name}
          onChangeText={text => setName(text)}
        />
      </>)}

      { taskType === 'Πότισμα' && (<>
        <Text style={styles.label}>Ένδειξη μετρητή *</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric"
          value={indication}
          onChangeText={text => setIndication(parseInt(text))}
        />
        <Text style={styles.label}>Το κόστος του ποτίσματος υπολογίζεται με βάση την τιμη ανα κυβικό που έχει καταχωρηθεί για το εκάστοτε χωράφι. </Text>
      </>)}

      { taskType === 'Συγκομιδή' && (<>
        <Text style={styles.label}>Κόστος (€) *</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric"
          value={cost}
          onChangeText={text => setCost(parseInt(text))}
        />

        <Text style={styles.label}>Συνολικά Τσουβάλια *</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric"
          value={sacks}
          onChangeText={text => setSacks(parseInt(text))}
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