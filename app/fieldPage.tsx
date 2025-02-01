import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function fieldPage() {

    const navigation = useNavigation();
    const { fieldName, fieldId } = useLocalSearchParams(); // Get query params

    useEffect(() => {
        navigation.setOptions({ title: fieldName });
    }, []);

    return (
        <ScrollView>
        </ScrollView>
    );
}