import React from 'react';
import { Text, Touchable, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';

interface SettingProps {
    name: string;
    icon: any;
    action?: () => void;
}

const Setting: React.FC<SettingProps> = ({ name, icon, action }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={action}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <MaterialIcons name={icon} size={24} color="white" />
                <Text style={styles.title}>{name}</Text>
            </View>
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
        paddingLeft: 10,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Setting;