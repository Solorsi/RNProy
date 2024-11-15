import { TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";
import {Component} from 'react'
// import {db, auth} from "../firebase/config";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    handleSubmit(email,pass){
        console.log('register')
        // auth.signInWithEmailAndPassword(email, pass)
        // .then(response => this.setState({registered:true, errorMsg:''}))
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
                <TouchableOpacity onPress={()=> this.handleSubmit()}> 
                    <Text>Registro</Text>
                </TouchableOpacity>
            </View>
        );
    }
} 
const styles = StyleSheet.create({
    container:{

    },
}) 