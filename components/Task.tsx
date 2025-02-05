import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface TaskProps {
    type: string;
    date: string;
    task_id: number;
}

const Task: React.FC<TaskProps> = ({ type, date, task_id }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => {}}>
            <Text style={styles.title}>{type}</Text>
            <Text style={styles.title}>{date}</Text>
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