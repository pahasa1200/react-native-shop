import React, {useContext} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Alert, Platform, KeyboardAvoidingView
} from "react-native";
import {Formik} from "formik";
import {AxiosContext} from "../api/index"
import * as Keychain from "react-native-keychain";
import {AuthContext} from "../api/authContext";

export default function LoginScreen() {
    const authContext = useContext(AuthContext);
    const {publicAxios} = useContext(AxiosContext);

    const onLogin = async (email, password) => {
        try {
            const response = await publicAxios.post('/login', {
                email,
                password,
            });

        const { accessToken, refreshToken } = response.data;
        const { firstName, lastName, id } = response.data.user;
        authContext.setAuthState({
            accessToken,
            refreshToken,
            authenticated: true,
            id,
            email: response.data.user.email,
            firstName,
            lastName
        });

        await Keychain.setGenericPassword(
            'token',
            JSON.stringify({
                accessToken,
                refreshToken,
            }),
        );
    }
catch
    (error)
    {
        Alert.alert('LoginScreen Failed', error.response.data.message);
    }
};

return (
    <View style={styles.body}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Formik
                initialValues={{login: '', password: ''}}
                onSubmit={async (values, action) => {
                    await onLogin(values.login, values.password);
                    action.resetForm();
                }}>
                {(props) => (
                    <View>
                        <Image style={styles.image} source={require('../assets/logo.png')}/>
                        <TextInput style={styles.inputField} multiline value={props.values.login}
                                   placeholder='LoginScreen' onChangeText={props.handleChange('login')}/>
                        <TextInput password={true} secureTextEntry textContentType={'password'}
                                   style={styles.inputField} value={props.values.password}
                                   placeholder='Password' onChangeText={props.handleChange('password')}/>
                        <TouchableOpacity style={styles.button} title='Sign in' onPress={props.handleSubmit}>
                            <Text style={styles.touchableText}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
    </View>
);
}

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 140,
        top: 0,
        left: '35%'
    },
    body: {
        flex: 1,
        backgroundColor: 'blue',
        display: "flex",
        justifyContent: 'center'
    },
    inputField: {
        borderColor: 'silver',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        margin: 20,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    button: {

        marginLeft: 20,
        marginRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    touchableText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 28,
        textAlign: 'center'
    }

})
