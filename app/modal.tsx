import { BackHandler, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import Setting from '@/components/Setting';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import db from '../app/database/db';

const exportData = async () => {
  try {
    const fetchTableData = async (tableName: string) => {
        const result: any = await db.getAllAsync(`SELECT * FROM ${tableName}`);
        return JSON.stringify(result);
    };

    // Fetch data from all tables
    const fields_ = await fetchTableData('fields');
    const fields = JSON.parse(fields_);
    const watering_ = await fetchTableData('watering');
    const watering = JSON.parse(watering_);
    const fertilization_ = await fetchTableData('fertilization');
    const fertilization = JSON.parse(fertilization_);
    const spraying_ = await fetchTableData('spraying');
    const spraying = JSON.parse(spraying_);
    const grinding_ = await fetchTableData('grinding');
    const grinding = JSON.parse(grinding_);
    const harvest_ = await fetchTableData('harvest');
    const harvest = JSON.parse(harvest_);
    const other_ = await fetchTableData('other');
    const other = JSON.parse(other_);
    const sale_ = await fetchTableData('sale');
    const sale = JSON.parse(sale_);

    // // Create a new workbook
    const wb = XLSX.utils.book_new();
    wb.SheetNames.push('Fields');
    wb.Sheets['Fields'] = XLSX.utils.json_to_sheet(fields);
    wb.SheetNames.push('Watering');
    wb.Sheets['Watering'] = XLSX.utils.json_to_sheet(watering);
    wb.SheetNames.push('Fertilization');
    wb.Sheets['Fertilization'] = XLSX.utils.json_to_sheet(fertilization);
    wb.SheetNames.push('Spraying');
    wb.Sheets['Spraying'] = XLSX.utils.json_to_sheet(spraying);
    wb.SheetNames.push('Grinding');
    wb.Sheets['Grinding'] = XLSX.utils.json_to_sheet(grinding);
    wb.SheetNames.push('Harvest');
    wb.Sheets['Harvest'] = XLSX.utils.json_to_sheet(harvest);
    wb.SheetNames.push('Other');
    wb.Sheets['Other'] = XLSX.utils.json_to_sheet(other);
    wb.SheetNames.push('Sale');
    wb.Sheets['Sale'] = XLSX.utils.json_to_sheet(sale);

    // // Convert to base64
    const excelData = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

    // // Define file path (Expo FileSystem directory)
    const path = `${FileSystem.documentDirectory}kalliergeiaExport.xlsx`;

    // // Write file
    await FileSystem.writeAsStringAsync(path, excelData, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Share the file (optional)
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(path);
    } else {
      alert('Sharing not available on this device');
    }

    return path;
  } catch (error) {
    alert('Error exporting to Excel: ' + error);
  }
};

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Setting name="Εξαγωγη Δεδομένων" icon="picture-as-pdf" action={exportData}/>
      <Setting name="Έξοδος" icon="exit-to-app" action={() => BackHandler.exitApp()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
