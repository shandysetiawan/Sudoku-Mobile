import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import HeaderApp from '../components/Header'
import AsyncStorage from '@react-native-community/async-storage';

export default function Finish({ route, navigation }) {

    useEffect(() => {

    }, [])

    const { name, level, puzzleDone } = route.params


    // const getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('@storage_Key')
    //         if (value !== null) {
    //             // value previously stored
    //         }
    //     } catch (e) {
    //         // error reading value
    //     }
    // }

    // console.log('finisshhh', AsyncStorage.getItem())
    return (
        <>
            <HeaderApp />
            <View style={styles.container}>
                <Text>Yay you just finished a game!</Text>
                <Text style={{ color: "#24a19c", fontWeight: "bold", fontSize: 50 }}>{name}</Text>
                <Image style={styles.image} source={{ uri: 'https://badgeos.org/wp-content/uploads/edd/2013/11/leaderboard.png' }} />

                <Button style={styles.button} block onPress={() => { navigation.navigate('Home') }}>
                    <Icon name='home' />
                    <Text>Play Again?</Text>
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ade498',
    },
    image: {
        height: 250,
        // marginTop: -200,
        width: Dimensions.get('screen').width - 100,
    },

    button: {
        marginTop: 25,
        alignItems: "center",
        backgroundColor: "#24a19c",
        padding: 10,
        width: "50%",
        marginLeft: "25%"

    }
})