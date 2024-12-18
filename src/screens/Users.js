import { StyleSheet, Text, View, TextInput } from "react-native";
import { Component } from 'react';
import { db, auth } from "../firebase/config";
import UserList from "../components/UserList";

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            search: ""
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                this.props.navigation.navigate('Login')
            }
        });
        db.collection('users').onSnapshot(snapshot => {
            let users = [];
            snapshot.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            this.setState({
                users: users,
                filteredUsers: users,
            });
        });
    }

    filterUsers(search) {
        const filteredUsers = this.state.users.filter(user =>
            user.data.username.toLowerCase().includes(search.toLowerCase())
        );
        this.setState({ filteredUsers, search });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Search users</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar un usuario"
                    value={this.state.search}
                    onChangeText={text => this.filterUsers(text)}
                />
                <UserList users={this.state.filteredUsers} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea',
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4169E1',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#4169E1',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
    }
}) 