import React from 'react';
import { StyleSheet, View } from "react-native";

import LottieView from 'lottie-react-native';

export default function AppLoading ( ) {
    return (
        <View style={styles.container}>
            <LottieView source={require('../assets/adaptive-icon.png')} autoPlay loop />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    }
})
