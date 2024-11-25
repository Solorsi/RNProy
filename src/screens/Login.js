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

    login() {
        this.setState({ loading: true, errorPassword: '', errorEmail: '', errorLogin: '' });
        // uso .trim para evitar el error por espacios en blanco
        const email = this.state.email.trim()
        const password = this.state.password.trim()
        let hasInputError = false
        if (email === null || email === '' || !email.includes('@')) {
            this.setState({
                errorEmail: 'Correo electrónico invalido'
            });
            hasInputError = true
        }
        if (password === null || password === '' || password.length < 6) {
            this.setState({
                errorPassword: 'La contraseña debe tener más de 6 caracteres'
            });
            hasInputError = true
        }
        if (hasInputError === true) {
            return;
        };

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
                <Text style={styles.title}>Log In</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email adress"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />
                <Text style={styles.errorText}>{this.state.errorEmail}</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
                <Text style={styles.errorText}>{this.state.errorPassword}</Text>
                <Text style={styles.errorText}>{this.state.errorLogin}</Text>
                <TouchableOpacity
                    style={[
                        styles.button,
                        (this.state.email === '' || this.state.password === '') && styles.disabledButton,
                    ]}
                    onPress={() => this.login()}
                    disabled={this.state.email === '' || this.state.password === ''}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.linkText}>Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4169E1',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        height: 50,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#4169E1',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    disabledButton: {
        backgroundColor: '#AAB8C2', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 10,
        alignItems: 'center',
    },
    linkText: {
        color: '#4169E1',
        fontSize: 14,
    },
}) 