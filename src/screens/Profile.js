import { StyleSheet, Text, View } from "react-native";
import {Component} from 'react'


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
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