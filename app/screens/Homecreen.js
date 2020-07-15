import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, View, Alert, Image, Dimensions } from 'react-native';
import { Text, Item, Input, Button, Icon } from 'native-base';
import { useDispatch } from 'react-redux'
import { fetchBoard, refreshBoard } from '../store/actions/boardAction'
import HeaderApp from '../components/Header'
import AsyncStorage from '@react-native-community/async-storage';


export default function Homescreen({ navigation }) {
    const [username, setUsername] = useState('')
    const dispatch = useDispatch()

    // const storeData = async (value) => {
    //     try {
    //         await AsyncStorage.setItem('@storage_Key', value)
    //     } catch (e) {
    //         // saving error
    //     }
    // }

    function handleDifficulty(value) {

        if (username) {
            dispatch(fetchBoard(value))
            dispatch(refreshBoard())
            // storeData('key', JSON.stringify(username))
            navigation.navigate('Game', { name: username, grade: value })


        } else {
            Alert.alert(
                "Warning!",
                "Please Fill Your Alias/Name First!",
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }

    }

    return (
        <>
            <HeaderApp />
            <View style={styles.container}>
                <Text style={styles.textHead}>Fill Your Name Below</Text>
                <Item style={{ marginBottom: 30, backgroundColor: 'white', width: "50%" }}>
                    <Input placeholder="Input Your Name Here" onChangeText={(text) => setUsername(text)} />
                </Item>
                <Text style={styles.textHead}> Choose Difficulty</Text>
                <Button style={styles.button} block light onPress={() => handleDifficulty('easy')}>
                    <Icon name='beer' />
                    <Text>Easy</Text>
                </Button>
                <Button style={styles.button} block info onPress={() => handleDifficulty('medium')}>
                    <Icon name='ios-bonfire' />
                    <Text>Medium</Text>
                </Button>
                <Button style={styles.button} block onPress={() => handleDifficulty('hard')}>
                    <Icon name='ios-moon' />
                    <Text>Hard</Text>
                </Button>
                <Image style={styles.image} source={{ uri: 'https://cdn.dribbble.com/users/952682/screenshots/4489624/apigee_puzzle.gif' }} />
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ade498',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        width: "50%",
        marginLeft: "25%",
        marginTop: "10%"
    },

    textHead: {
        fontSize: 25
    },
    image: {
        marginTop: 10,
        height: 100,
        // marginTop: -200,
        width: Dimensions.get('screen').width - 200,
    }

});