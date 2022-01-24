import React, {useContext, useEffect} from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {CartContext} from "../api/cartContext";
import {AxiosContext} from "../api";
import {ProductsContext} from "../api/productsContext";
import {AuthContext} from "../api/authContext";


export default function CartScreen({ navigation }) {
    const cartContext = useContext(CartContext);
    const productsContext = useContext(ProductsContext);
    const authContext = useContext(AuthContext);
    const { authAxios } = useContext(AxiosContext);

    useEffect(async () => {
        try {
            const response = await authAxios.get(`/cart/${authContext.authState.id}` );
            console.log(response.data)
            if (!cartContext.cartState.products || productsContext.productsState.newProduct === true ) {
                cartContext.setCartState({
                    products: [
                        ...response.data.data
                    ]
                })
                productsContext.reloadState()
            }

        } catch (error) {
            Alert.alert('Loading Failed', error.response.data.message);
        }
    }, [productsContext.productsState.products])

    return (
        <View style={styles.main}>
            <FlatList keyExtractor={(item) => item._id} data={cartContext.cartState.products} renderItem={({item}) => (
                <View>
                    <TouchableOpacity style={styles.product} onPress={() => navigation.navigate('ListItem', item)}>
                        <Image style={styles.productImg} source={ require('./../assets/logo.png') } />
                        <Text style={styles.productText}>{ item.product.name} { item.count }</Text>
                    </TouchableOpacity>
                </View>
            )}/>
        </View>
    );
}

const styles = StyleSheet.create({
})
