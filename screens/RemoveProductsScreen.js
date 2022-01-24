import React, {useContext} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Alert} from "react-native";
import {AxiosContext} from "../api";
import {ProductsContext} from "../api/productsContext";


export default function RemoveProductsScreen({ navigation }) {
    const {authAxios} = useContext(AxiosContext);
    const productsContext = useContext(ProductsContext);

    const onRemove = async (id) => {
        try {
            const response = await authAxios.delete(`/product/${id}`);

            navigation.navigate('Home')
            Alert.alert('Product is removed')
            productsContext.reloadState();
        } catch (error) {
            Alert.alert('Error', error.response.data.message);
        }
    }

    return (
        <View style={styles.main}>
            <FlatList keyExtractor={(item) => item._id} data={productsContext.productsState.products} renderItem={({item}) => (
                <View>
                    <TouchableOpacity style={styles.product} onPress={() => onRemove(item._id)}>
                        <Text style={styles.productText}>{ item.name} { item.cost }</Text>
                    </TouchableOpacity>
                </View>
            )}/>
        </View>
    );
}

const styles = StyleSheet.create({
})
