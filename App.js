import { SimpleLineIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Home from './src/screens/Home'
import Profile from './src/screens/Profile'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeMenu() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarShowLabel: false, 
          headerShown: false, 
          tabBarIcon: () => (<SimpleLineIcons name='home' size={24} color='black'/>), 
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarShowLabel: false, 
          headerShown: false, 
          tabBarIcon: () => (<SimpleLineIcons name='user' size={24} color='black'/>), 
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
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

