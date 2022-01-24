import React, {useState} from 'react';
import Header from "./components/Header";
import ListItem from "./components/ListItem";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import MainScreen from "./screens/MainScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CartScreen from "./screens/CartScreen";
import AddNewProductScreen from "./screens/AddNewProductScreen";
import {Alert, Button} from "react-native";
import RemoveProductsScreen from "./screens/RemoveProductsScreen";


const Stack = createStackNavigator();

const getTabBarVisibility = (route, setTabVisibility) => {
    const routesWithoutTab = ['Settings', 'RemoveProducts', 'AddNewProduct']

    if (routesWithoutTab.includes(route)) {
        setTabVisibility('none')
    } else {
        setTabVisibility(undefined)
    }
};

const AsyncAlert = async () => new Promise((resolve) => {
    Alert.alert(
        'Do you really want to leave?',
        'Previous data will be reset',
        [
            {
                text: 'yes',
                onPress: () => {
                    resolve('YES');
                },
            },
            {
                text: 'cancel',
                onPress: () => {

                },
            },
        ],
        {cancelable: true},
    );
});

const MainScreenNavigator = ({navigation, setTabVisibility}) => {
    return <Stack.Navigator screenOptions={({route}) => {
        getTabBarVisibility(route.name, setTabVisibility)
    }}>
        <Stack.Screen
            name="Home"
            component={MainScreen}
            options={{
                gesturesEnabled: false,
                headerRight: () => (
                    <Button
                        onPress={() => navigation.navigate('Settings')}
                        title="..."
                        color="black"
                    />
                ),
            }}
        />
        <Stack.Screen
            name="ListItem"
            component={ListItem}
        />
        <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={({route}) => {
                getTabBarVisibility(route.name, setTabVisibility)
            }
            }
        />
        <Stack.Screen
            name="AddNewProduct"
            component={AddNewProductScreen}
            options={{
                title: 'Add new product', headerLeft: () => (
                    <Button title={'Cancel'} onPress={async () => {
                        await AsyncAlert();
                        navigation.goBack();
                    }}/>
                )
            }}
        />
        <Stack.Screen
            name="RemoveProducts"
            component={RemoveProductsScreen}
            options={{
                title: 'Remove products'
            }}
        />
    </Stack.Navigator>
}

const CartScreenNavigator = () => {
    return <Stack.Navigator>
        <Stack.Screen
            name="Cart"
            component={CartScreen}
        />
    </Stack.Navigator>
}

export {MainScreenNavigator, CartScreenNavigator}
