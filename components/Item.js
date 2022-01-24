import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button} from "react-native";

export default function Item({ route }) {

    return (
        <View>
            <TouchableOpacity>
                <Text style={styles.text}>{route.name}</Text>
                <Text style={styles.text}>{route.anons}</Text>
            </TouchableOpacity>
        </View>
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
