import MainNav from './src/navigation/MainNav'
import { StyleSheet, View } from 'react-native';


export default function App() {
  return (
    <View
     style = {styles.contenedorMain}>
       <MainNav/>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorMain:{
    width: '100%'
  }
})

