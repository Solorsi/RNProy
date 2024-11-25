import { TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";
import { Component } from 'react'
import { db, auth } from "../firebase/config";


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

    register() {
        this.setState({ loading: true, errorPassword: '', errorEmail: '', errorUsername: '', errorRegister: '' });
        const email = this.state.email.trim()
        const username = this.state.username.trim()
        const password = this.state.password.trim()
        let hasInputError = false
        if (email === null || email === '' || !email.includes('@')) {
            this.setState({
                errorEmail: 'Correo electrónico invalido'
            });
            hasInputError = true
        }
        if (username === null || username === '' || username.length < 6) {
            this.setState({
                errorUsername: 'El username debe tener más de 6 caracteres'
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

        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                this.setState({ registered: true });
                db.collection('users').add({
                    owner: this.state.email,
                    createdAt: Date.now(),
                    username: this.state.username.toLowerCase()
                })
                    .then(response => {
                        this.props.navigation.navigate('Login')
                    })
                    .catch(error => {
                        this.setState({ errorRegister: 'Fallo en la creacion de user' })
                    })
            })
            .catch(error => {
                this.setState({ errorRegister: 'Ya hay un usuario existente con esas credenciales' })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
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
                    placeholder="Username"
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                />
                <Text style={styles.errorText}>{this.state.errorUsername}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
                <Text style={styles.errorText}>{this.state.errorPassword}</Text>
                <Text style={styles.errorText}>{this.state.errorRegister}</Text>
                <TouchableOpacity
                    style={[
                        styles.button,
                        (this.state.email === '' || this.state.password === '' || this.state.username === '') && styles.disabledButton,
                    ]}
                    onPress={() => this.register()}
                    disabled={this.state.email === '' || this.state.password === '' || this.state.username === ''}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Log In</Text>
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