import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, FlatList, TouchableOpacity, Modal, TextInput} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {gStyle} from "../styles/style";
import Form from './Form';

export default function Header ({ navigation }) {
    const loadScene = () => {
        navigation.navigate('ListItem')
    }

    const [news, setNews] = useState([
        {name: 'Google', anons: 'Google!!!', full: 'Google is cool!'},
        {name: 'Apple', anons: 'Apple!!!', full: 'Apple is cool!'},
        {name: 'Facebook', anons: 'Facebook!!!', full: 'Facebook is cool!'},
    ])

    const [modelWindow, setModelWindow] = useState(false);

    return (
        <View style={styles.main}>
            <Modal visible={modelWindow}>
                <View style={gStyle.main}>
                    <Ionicons style={{marginTop: 50}} name="add" size={24} color="red" onPress={() => setModelWindow(false)} />
                    <Text>Opened</Text>
                    <Form />
                </View>
            </Modal>
            <Ionicons name="add-circle" size={24} color="black" onPress={() => setModelWindow(true)}/>
            <Text style={styles.text}>Список дел</Text>
            <FlatList data={news} renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('ListItem', item)}>
                    <Text>{ item.name }</Text>
                    <Text>{ item.anons }</Text>
                </TouchableOpacity>
                )}/>
            <TextInput/>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        paddingTop: 60,
        height: 300,
        backgroundColor: 'silver'
    },
    text: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
        textAlign: "center"
    }

})
