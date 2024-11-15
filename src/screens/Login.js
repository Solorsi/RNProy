import { TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";
import {Component} from 'react'
import {auth} from "../firebase/config";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '', 
            loggedIn: false,
            errorMsg: '',
        };
    }

    login(email, password){
        auth.signInWithEmailAndPassword(email, password)
         .then((response) => {
             this.setState({loggedIn: true});
             this.props.navigation.navigate('HomeMenu')
         })
         .catch(error => {
           this.setState({errorMsg: 'Credenciales inválidas.'})
         })
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
                <TouchableOpacity style={styles.button} onPress={()=> this.login(this.state.email, this.state.password)}> 
                    <Text>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ ()=> this.props.navigation.navigate('Register')}>
                    <Text>Ir a Register </Text>
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