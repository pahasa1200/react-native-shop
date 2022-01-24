import React, {useContext} from 'react';
import {StyleSheet, View, Alert} from "react-native";
import {AxiosContext} from "../api";
import Form from "../components/Form";
import {ProductsContext} from "../api/productsContext";


export default function AddNewProductScreen({ navigation }) {
    const productsContext = useContext(ProductsContext);
    const { authAxios } = useContext(AxiosContext);

    const handleSubmit = async (values, action) => {
        try {
            const response = await authAxios.post('/product', {
                name: values.name,
                cost: values.cost
            });

            navigation.navigate('Home')
            Alert.alert('Product is added')
            productsContext.reloadState();
        } catch (error) {
            Alert.alert('Error', error.response.data.message);
        }
    }

    const formConfig = {
        buttonTitle: 'Add',
        inputParams:{
            name: {
                multiline: true,
                placeholder: 'Name',
                name: 'Name',
            },
            cost: {
                keyboardType: 'number-pad',
                placeholder: 'Cost',
                name: 'Cost'
            }
        },
        initialData:{
            name: '',
            cost: '',
        }
    }

    return (
        <View style={styles.main}>
            <Form
                onSubmitCustom={ handleSubmit }
                buttonTitle={formConfig.buttonTitle}
                inputParams={{...formConfig.inputParams}}
                initialData={{...formConfig.initialData}}/>
        </View>
    );
}

const styles = StyleSheet.create({
})
