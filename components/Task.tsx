import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface TaskProps {
    type: string;
    task: any;
}

const Task: React.FC<TaskProps> = ({ type, task}) => {

    const router = useRouter();

    return (
        <TouchableOpacity style={styles.container} onPress={() => {router.push({pathname: '/taskDetails', params: {task: JSON.stringify(task), type: type}})}} >
            {(type === 'fertilization' || type === 'spraying') && <Text style={styles.title}>{task.name}</Text>}
            {type === 'grinding' && <Text style={styles.title}>{task.oil_kg+" kg"}</Text>}
            {type === 'harvest' && <Text style={styles.title}>{task.sacks+" τσουβάλια"}</Text>}
            {type === 'watering' && <Text style={styles.title}>{task.cubic_meter+" m³"}</Text>}
            <Text style={styles.title}>{task.date}</Text>
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


export default Task;