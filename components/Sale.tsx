import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SaleProps {
    sale: any;
}

const Sale: React.FC<SaleProps> = ({ sale }) => {

    const router = useRouter();

    return (
        <TouchableOpacity style={styles.container} onPress={() => {router.push({pathname: '/saleDetails', params: {sale: JSON.stringify(sale)}})}} >
            <Text style={styles.title}>{sale.total} €</Text>
            <Text style={styles.title}>{sale.oil_kg} kg</Text>
            <Text style={styles.title}>{sale.date}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "99%",
        backgroundColor: '#282828',
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        paddingLeft: 10,
        color: '#fff',
        fontWeight: 'bold',
    },
});


export default Sale;