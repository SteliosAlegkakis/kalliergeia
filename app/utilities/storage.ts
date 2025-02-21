import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for AsyncStorage
const YEARS_STORAGE_KEY = 'storedYears';

// Fetch years from AsyncStorage
export const getStoredYears = async () => {
  try {
    const years = await AsyncStorage.getItem(YEARS_STORAGE_KEY);
    return years ? JSON.parse(years) : [];
  } catch (error) {
    console.error('Error fetching stored years:', error);
    return [];
  }
};

// Add a new year (if not already in the list)
export const addYear = async (year: any) => {
  try {
    let years = await getStoredYears();

    // Check if the year is already in the list (by value)
    const yearExists = years.some((item: any) => item.value === year);
    
    if (!yearExists) {
      // Create the year object with label and value
      const newYear = { label: `${year}`, value: year };
      years.push(newYear);

      // Sort the years in descending order (newest first)
      years.sort((a: any, b: any) => b.value - a.value);

      // Save the updated list to AsyncStorage
      await AsyncStorage.setItem(YEARS_STORAGE_KEY, JSON.stringify(years));
    }
  } catch (error) {
    console.error('Error adding year:', error);
  }
};

export const deleteYears = async () => {
    try {
        await AsyncStorage.removeItem(YEARS_STORAGE_KEY);
    } catch (error) {
        console.error('Error deleting years:', error);
    }
};

