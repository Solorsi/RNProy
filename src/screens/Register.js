import { TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";
import {Component} from 'react'
import {db, auth} from "../firebase/config";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            registered: false,
            errorPassword: '',
            errorEmail: '',
            errorUsername: '',
            errorRegister: '',
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.props.navigation.navigate('HomeMenu')
          }
        });
     }
     
    register(){
        const email = this.state.email.trim()
        const username = this.state.username.trim()
        const password = this.state.password.trim()
        if (email === null || email === '' || !email.includes('@')) {
            this.setState({
                    errorEmail: 'Correo electrónico invalido'
            });
            return;
        }
        else if (username === null || username === '' || username.length < 6) {
            this.setState({
                    errorUsername: 'El username debe tener más de 6 caracteres'
            });
            return;
        }
        else if (password === null || password === '' || password.length < 6) {
            this.setState({
                    errorPassword: 'La contraseña debe tener más de 6 caracteres'
            });
            return;
        }

        this.setState({ loading: true, errorPassword: '', errorEmail: '', errorUsername: '', errorRegister: ''});

        auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
            this.setState({registered: true});
            db.collection('users').add({
                owner: this.state.email,
                createdAt: Date.now(),
                username: this.state.username})
                .then( response => {
                    this.props.navigation.navigate('Login')
                })
                .catch( error => {
                    this.setState({errorRegister: 'Fallo en la creacion de user.'})
                })
        })     
        .catch( error => {
            this.setState({errorRegister: 'Fallo en el registro.'})
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
                <Text style={styles.errorText}>{this.state.errorEmail}</Text>
                <TextInput style={styles.field}
                    placeholder='username'
                    onChangeText={text => this.setState({username: text})}
                    value= {this.state.username} />
                <Text style={styles.errorText}>{this.state.errorUsername}</Text>
                <TextInput style={styles.field}
                    placeholder='password'
                    secureTextEntry= {true}
                    onChangeText={text => this.setState({password: text})}
                    value= {this.state.password} />
                <Text style={styles.errorText}>{this.state.errorPassword}</Text>
                <TouchableOpacity style={styles.button} onPress={()=> this.register()}> 
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
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginTop: 5,
        marginBottom: 5,
        fontWeight: "bold",
        textAlign: "left",
    },
}) 