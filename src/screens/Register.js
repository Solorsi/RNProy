import { TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";
import {Component} from 'react'
import {db, auth} from "../firebase/config";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            registered: false,
            errorMsg: '',
        };
    }

    register(email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
            this.setState({registered: true});
            console.log('sucess')
            this.props.navigation.navigate('Login')
        })     
        .catch( error => {
            this.setState({errorMsg: 'Fallo en el registro.'})
            console.log('fail')
        })
    }
     
    render(){
        return (
            <View style={styles.container}>
                <Text>Registro</Text>
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
                <TouchableOpacity style={styles.button} onPress={()=> this.register(this.state.email, this.state.password)}> 
                    <Text>Registro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ ()=> this.props.navigation.navigate('Login')}>
                <Text>Ir a Login </Text>
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