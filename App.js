import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'
import {CartScreenNavigator, MainScreenNavigator} from './navigate'
import * as Keychain from "react-native-keychain";
import {AuthContext, AuthProvider} from "./api/authContext";
import {AxiosProvider} from "./api/index";
import LoginScreen from "./screens/LoginScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ProductsProvider} from "./api/productsContext";
import {CartProvider} from "./api/cartContext";

const fonts = () => Font.loadAsync({
    'mt-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'mt-light': require('./assets/fonts/Montserrat-Light.ttf')
})

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <AuthProvider>
            <ProductsProvider>
                <CartProvider>
                    <AxiosProvider>
                        <AppScreen/>
                    </AxiosProvider>
                </CartProvider>
            </ProductsProvider>
        </AuthProvider>
    )
}

export function AppScreen() {
    const [font, setFont] = useState(false);
    const [tabVisibility, setTabVisibility] = useState(undefined)
    const authContext = useContext(AuthContext || null);
    const [status, setStatus] = useState('loading');

    const loadJWT = useCallback(async () => {
        try {
            const value = await Keychain.getGenericPassword();
            const jwt = JSON.parse(value.password);

            authContext.setAuthState({
                accessToken: jwt.accessToken || null,
                refreshToken: jwt.refreshToken || null,
                authenticated: jwt.accessToken !== null,
            });
            setStatus('success');
        } catch (error) {
            setStatus('error');
            console.log(`Keychain Error: ${error.message}`);
            authContext.setAuthState({
                accessToken: null,
                refreshToken: null,
                authenticated: false,
            });
        }
    }, []);

    useEffect(() => {
        loadJWT();
    }, [loadJWT]);

    if (status === 'loading') {
        return (
            <View style={styles.spinerContainer}>
                <ActivityIndicator size="large" color="#00ff00"/>
            </View>
        )
    }


    if (font) {
        if (authContext?.authState?.authenticated === false) {
            return <LoginScreen/>
        } else {
            return (
                <View style={styles.container}>
                    <NavigationContainer>
                        <Tab.Navigator>
                            <Tab.Screen options={({route}) => ({
                                tabBarStyle: {display: tabVisibility},
                                headerShown: false,
                                tabBarLabel: 'Home'
                            })}
                                        name="MainScreen"
                                        children={(props) =>
                                            <MainScreenNavigator setTabVisibility={setTabVisibility} {...props} />}
                            />
                            <Tab.Screen options={{headerShown: false, title: 'Cart'}} name="CartScreen"
                                        component={CartScreenNavigator}/>
                        </Tab.Navigator>
                    </NavigationContainer>
                </View>
            )
        }
    } else {
        return (
            <AppLoading
                onError={console.warn}
                startAsync={fonts}
                onFinish={() => setFont(true)}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    spinerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
