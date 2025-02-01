import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface FieldPreviewProps {
    name: string;
    field_id: number;
}

const FieldPreview: React.FC<FieldPreviewProps> = ({ name, field_id }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => router.push(`/fieldPage?fieldName=${name}&fieldId=${field_id}`)}>
            <Text style={styles.title}>{name}</Text>
            <AntDesign name="right" size={24} color='#fff' />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "95%",
        backgroundColor: '#282828',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default FieldPreview;