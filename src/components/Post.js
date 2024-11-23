import { TouchableOpacity, StyleSheet, Text, View, TextInput, } from "react-native";
import {Component} from 'react'



export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

   

    render(){
        return (
            <View style={styles.container}>
              <Text style={styles.content}> {this.props.post.content}</Text>  
              <Text style={styles.author}> {this.props.post.author}</Text>  
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    content:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',

    },

    author:{
        fontSize: 14,
        fontStyle: 'italic',
        color: '#555',
        textAlign: 'right',

    },
   
}) 