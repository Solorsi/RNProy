import { StyleSheet, Text, View } from "react-native";
import {Component} from 'react'
import { auth } from "../firebase/config";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (!user) {
            this.props.navigation.navigate('Login')
          }
        });
     }

    render(){
        return (
            <View style={styles.container}>
                <Text>Profile</Text>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#eaeaea'
    },
}) 