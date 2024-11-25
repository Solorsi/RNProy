import { SimpleLineIcons, AntDesign, FontAwesome6} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Users from '../screens/Users';
import NewPost from '../screens/NewPost'

const Tab = createBottomTabNavigator();

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
          name="Users" 
          component={Users} 
          options={{
            tabBarShowLabel: false, 
            headerShown: false, 
            tabBarIcon: () => (<AntDesign name='search1' size={24} color='black'/>), 
          }}
        />
        <Tab.Screen 
          name="NewPost" 
          component={NewPost} 
          options={{
            tabBarShowLabel: false, 
            headerShown: false, 
            tabBarIcon: () => (<FontAwesome6 name='add' size={24} color='black'/>), 
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

export default HomeMenu;