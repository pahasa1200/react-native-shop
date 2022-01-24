import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {AuthContext} from "../api/authContext";

export default function SettingsScreen({ navigation }) {
    const authContext = useContext(AuthContext);

    return (
        <View style={styles.main}>
            <TouchableOpacity>
                <Text style={styles.text} onPress={() => navigation.navigate('AddNewProduct')}>Add new product</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.text} onPress={() => navigation.navigate('RemoveProducts')}>Remove products</Text>
            </TouchableOpacity>
            <TouchableOpacity title={'Logout'} onPress={async () => {
                authContext.setAuthState({
                    accessToken: null,
                    refreshToken: null,
                    authenticated: false,
                })
            }
            }>
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logoutText: {
        fontSize: 24,
        textAlign: "center"
    },
    settingsButton: {
        marginLeft: 20
    },
    productImg: {
        marginTop: 20,
        marginBottom: 20,
    },
    product: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 5,
        borderStyle: "solid",
        backgroundColor: 'black',
        alignItems: "center",
        margin: 20
    },
    productText: {
        fontSize: 22,
        justifyContent: "center",
        display: "flex",
        textAlign: "center",
        color: "white",
        marginBottom: 20,
    },
    main: {
        paddingTop: 20,
    },
    text: {
        fontSize: 24,
        color: 'black',
        textAlign: "center"
    }

})
