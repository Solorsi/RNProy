import { TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";
import {Component} from 'react'
// import {db, auth} from "../firebase/config";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    handleSubmit(email,pass){
        console.log('login')
        // auth.signInWithEmailAndPassword(email, pass)
        // .then(response => this.setState({registered:true, errorMsg:''}))
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>Ingrese</Text>
                <TextInput style={styles.field}
                    keyboardType='email-adress'
                    placeholder='email'
                    onChangeText={text => this.setState({email: text})}
                    value= {this.state.email} />
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry= {true}
                    onChangeText={text => this.setState({password: text})}
                    value= {this.state.password} />
                <TouchableOpacity style={styles.button} onPress={()=> this.handleSubmit()}> 
                    <Text>Ingresar</Text>
                </TouchableOpacity>
            </View>
        );
    }
} 
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#eaeaea'
    },
    field: {
        backgroundColor: 'white',
        height: 40, 
        margin: 10,
        padding: 20,
        borderWidth: 2,     
        borderColor: '#000',   
        borderRadius: 10,   
        borderStyle: 'solid',
    },
    button: {
        backgroundColor: 'grey',
        borderRadius: 10, 
        margin: 10,
        height: 40, 
    }
}) 