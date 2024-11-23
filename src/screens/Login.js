import { TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";
import { Component } from 'react'
import { auth } from "../firebase/config";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            errorPassword: '',
            errorEmail: '',
            errorLogin: '',
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.props.navigation.navigate('HomeMenu')
          } 
        });
     }

    login(){
        // uso .trim para evitar el error por espacios en blanco
        const email = this.state.email.trim()
        const password = this.state.password.trim()
        if (email === null || email === '' || !email.includes('@')) {
            this.setState({
                errorEmail: 'Correo electrónico invalido'
            });
            return;
        }
        if (password === null || password === '' || password.length < 6) {
            this.setState({
                errorPassword: 'La contraseña no puede estar vacía y debe tener más de 6 caracteres'
            });
            return;
        }
        // if (this.state.errorEmail !== '' || this.state.errorPassword !== '') {
        //     return;
        // };

        this.setState({ loading: true, errorPassword: '', errorEmail: '', erorrLogin: '' });

        auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.setState({ loggedIn: true });
                this.props.navigation.navigate('HomeMenu')
            })
            .catch(error => {
                this.setState({ errorLogin: 'Credenciales inválidas.' })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Ingrese</Text>
                <TextInput style={styles.field}
                    keyboardType='email-adress'
                    placeholder='email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />
                <Text style={styles.errorText}>{this.state.errorEmail}</Text>
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />
                <Text style={styles.errorText}>{this.state.errorPassword}</Text>
                <Text style={styles.errorText}>{this.state.errorLogin}</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.login()}>
                    <Text>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text>Ir a Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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