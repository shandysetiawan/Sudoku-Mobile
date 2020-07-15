import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import store from './store'
import HomeScreen from './screens/Homecreen'
import Game from './screens/Game'
import Finish from './screens/Finish'

export default function App() {
  const Stack = createStackNavigator();

  useEffect(() => {

    Font.loadAsync({
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf')
    })

  }, [])


  return (
    <Provider store={store}>
      {/* <Container>
        <Content> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode={false}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </Content>
      </Container> */}
    </Provider>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});