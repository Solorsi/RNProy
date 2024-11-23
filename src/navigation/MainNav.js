import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Register from '../screens/Register'
import Login from '../screens/Login';
import HomeMenu from './HomeMenu'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default class MainNav extends Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={ Login } options={ { headerShown: false } } />
          <Stack.Screen name="Register" component={ Register } options={ { headerShown: false } } />
          <Stack.Screen name="HomeMenu" component={HomeMenu} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
   ) 
  }
}