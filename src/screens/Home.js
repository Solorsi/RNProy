import { StyleSheet, Text, View } from "react-native";
import {Component} from 'react'


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Home</Text>
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