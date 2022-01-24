import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function CommonButton ({ callback, title, item }) {
    return (
        <View>
            <TouchableOpacity onPress={() => callback(item)} style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>{ title }</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    addToCartButton: {
        backgroundColor: 'blue',
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 5,
    },
    addToCartText: {
        textAlign: "center",
        fontSize: 24,
        paddingTop: 10,
        paddingBottom: 10,
        color: 'white',
    },
})
