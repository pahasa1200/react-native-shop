import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Image, Alert} from "react-native";
import {AuthContext} from "../api/authContext";
import {AxiosContext} from "../api";
import {ProductsContext} from "../api/productsContext";
import CommonButton from "../components/CommonButton";


export default function MainScreen ({ navigation }) {
    const authContext = useContext(AuthContext);
    const { authAxios } = useContext(AxiosContext);
    const productsContext = useContext(ProductsContext);

    useEffect(async () => {
        try {
            const response = await authAxios.get('/products', {});
            if (!productsContext.productsState.products || productsContext.productsState.newProduct === true) {
                productsContext.setProductsState({
                    products: [
                        ...response.data.data
                    ]
                })
                productsContext.productsState.products && productsContext.reloadState();
            }
        } catch (error) {
            Alert.alert('Loading Failed', error.response.data.message);
        }
    }, [productsContext.productsState])

    const addProductToCart = async ( product ) => {
        try {
            const response =  await authAxios.post('/cart', {
                product: product._id,
                count: 1,
                user: authContext.authState.id
            });

            productsContext.reloadState();
            Alert.alert('Product added to cart');

        } catch (error) {
            Alert.alert('Loading Failed', error.response.data.message);
        }
    }

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.text}>Stocks</Text>
            </View>
            <FlatList keyExtractor={(item) => item._id} data={productsContext.productsState.products} renderItem={({item}) => (
                <View>
                <TouchableOpacity style={styles.product} onPress={() => navigation.navigate('ListItem', item)}>
                    <Image style={styles.productImg} source={ require('./../assets/logo.png') } />
                    <Text style={styles.productText}>{ item.name} { item.cost }</Text>
                </TouchableOpacity>
                <CommonButton callback={addProductToCart} title={'Add to cart'} item={item} />
                </View>
            )}/>
            <TextInput/>
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
    header: {
        paddingBottom: 20,
    },
    logoutText: {
      fontSize: 24,
      textAlign: "center"
    },
    settingsButton: {
        right: 0,
        top: -35,
        position: "absolute",
    },
    productImg: {
      marginTop: 20,
      marginBottom: 20,
      height: 80,
      width: 80
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
        marginBottom: 80
    },
    text: {
        fontSize: 28,
        color: 'black',
        fontWeight: 'bold',
        textAlign: "center"
    }

})
