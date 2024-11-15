import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './src/screens/Register';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="Login" component={ Login } />
         <Stack.Screen name="Register" component={ Register } />
      </Stack.Navigator>
    </NavigationContainer>
 ) 
}

