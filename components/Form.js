import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity, TextInput} from "react-native";
import {Formik} from "formik";

export default function Form({initialData, inputParams, onSubmitCustom, withButton, buttonTitle}) {
    return (
        <View>
            <Formik
                initialValues={{...initialData}}
                enableReinitialize
                onSubmit={(values, action) => {
                    onSubmitCustom(values, action);
                }}>
                {(props) => (
                    <View style={styles.container}>
                        {
                            Object.keys(initialData).map((x, index) => {
                                return <View key={index}>
                                    <Text style={styles.inputField__text}>{inputParams[x].name}</Text>
                                    <TextInput
                                        style={styles.inputField}
                                        value={props.values[x]}
                                        onChangeText={props.handleChange(x)}
                                        placeholder={inputParams[x].placeholder}
                                        multiline={inputParams[x].multiline}
                                        keyboardType={inputParams[x].keyboardType}
                                        autoCapitalize={inputParams[x].autoCapitalize}
                                    />
                                </View>
                            })

                        }
                        {withButton &&
                        <View>
                            <Button title={buttonTitle ? buttonTitle : 'Send'} onPress={props.handleSubmit}/>
                        </View>
                        }
                        {!withButton &&
                        <View>
                            <TouchableOpacity style={styles.touchableOpacity} onPress={props.handleSubmit}>
                                <Text style={styles.buttonText}>{buttonTitle}</Text>
                            </TouchableOpacity>
                        </View>
                        }
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    inputField__text: {
        fontSize: 18,
        marginLeft: 20,
        marginBottom: 5,
    },
    touchableOpacity: {
        backgroundColor: 'blue',
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 24,
        paddingTop: 10,
        paddingBottom: 10,
        color: 'white',
    },
    inputField: {
        borderColor: 'silver',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
})
