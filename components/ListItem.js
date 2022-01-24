import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

export default function ListItem ({ route, navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.name
        });
    }, [navigation]);

    return (
        <TouchableOpacity>
            <Text style={styles.text}>{route.params.name}</Text>
            <Text style={styles.text}>{route.params.anons}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        padding: 20,
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: '#fafafa',
        borderWidth: 1,
        marginTop: 20,
        width: '60%',
        marginLeft: '20%'
    }
})
