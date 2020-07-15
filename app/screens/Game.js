import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux'
import { checkBoard, solveBoard } from '../store/actions/boardAction'
import CountDown from 'react-native-countdown-component';
import HeaderApp from '../components/Header'

export default function Game({ navigation, route }) {
    const dispatch = useDispatch()
    const { name, grade, puzzleDone } = route.params
    const [message, setMessage] = useState(".")

    const { board, status, solved } = useSelector(state => state.boardReducer)
    const boardAnswer = useSelector(state => state.boardReducer.boardAnswer)
    const displayNumber = solved.length > 0 ? solved : board

    useEffect(() => {

    }, [])

    function validateBoard() {
        dispatch(checkBoard(boardAnswer))

        if (status.status === "solved") {
            navigation.navigate('Finish', { name: route.params.name, puzzleDone: true })
        } else if (status.status === 'broken') {
            setMessage('Wrong answer')

            setTimeout(() => {
                setMessage(".");
            }, 4000);
        } else {
            setMessage('Please fill the other blank input')
            // console.log(message)
            setTimeout(() => {
                setMessage(".");
            }, 4000);
        }
    }

    function handleAnswer(answer, index, idx) {
        boardAnswer[index][idx] = Number(answer)
    }

    function solvingBoard() {
        dispatch(solveBoard(board))
    }

    return (
        <>
            <HeaderApp />
            <ScrollView style={styles.container}>
                <SafeAreaView>
                    {/* <Text>{JSON.stringify(board)}</Text> */}
                    {/* <Text>{JSON.stringify(solve)}</Text> */}
                    {/* <Text>{JSON.stringify(boardAnswer)}</Text> */}
                    {/* <Text>{JSON.stringify(answer)}</Text> */}
                    {/* <Text>{JSON.stringify(status)}</Text> */}
                    <Text>Difficulty: {grade}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", }}>
                        <View style={{}}>
                            {message &&
                                <Text style={{ color: "red" }}>{message}</Text>
                            }
                            <CountDown
                                until={15 * 60}
                                timeToShow={['M', 'S']}
                                timeLabels={{ m: 'MM', s: 'SS' }}
                                onFinish={() => alert('Time is Up!')}
                                size={17}
                            />
                        </View>
                    </View>
                    {displayNumber.map((item, index) => {
                        return (
                            <View key={index} style={styles.boxContainer}>
                                {item.map((number, idx) => {
                                    if (number != 0) {
                                        return (
                                            <Text
                                                key={idx}
                                                style={[styles.box, { backgroundColor: "grey", alignItems: "center", fontWeight: 'bold' }]}
                                                onChangeText={(value) => handleAnswer(value, index, idx)}
                                            >
                                                {number}
                                            </Text>
                                        )
                                    } else {
                                        return (
                                            <TextInput
                                                key={idx}
                                                style={[styles.box, { color: 'green', backgroundColor: "white" }]}
                                                keyboardType='numeric'
                                                maxLength={1}
                                                onChangeText={(value) => handleAnswer(value, index, idx)}
                                            ></TextInput>
                                        )
                                    }
                                })}
                            </View>
                        )
                    })
                    }
                    <TouchableOpacity
                        style={styles.button}
                        onPress={validateBoard}
                    >
                        <Text>Validate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={solvingBoard}
                    >
                        <Text>Solve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigation.navigate('Finish', { name: route.params.name, puzzleDone: false }) }}
                    >
                        <Text>Finish Game</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={restartBoard}
                    >
                        <Text>Restart</Text>
                    </TouchableOpacity> */}

                </SafeAreaView>
            </ScrollView>
        </>)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ade498',
    },

    box: {
        width: (Dimensions.get('screen').width - 40) / 9,
        height: 37,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },

    boxContainer: {
        flexDirection: "row",
        justifyContent: 'center',

    },

    button: {
        marginTop: 15,
        alignItems: "center",
        backgroundColor: "#24a19c",
        padding: 10
    }


});