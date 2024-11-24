import { StyleSheet, Text, View } from "react-native";
import { Component } from 'react';
import { db, auth } from "../firebase/config";
import UserList from "../components/UserList";
import SearchInput from "../components/SearchInput";

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
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
            });
        });
    }

    filterUsers = (search) => {
        db.collection('users').where("username", "==", search).onSnapshot(snapshot => {
            let users = [];
            snapshot.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            this.setState({
                users: users,
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Search users</Text>
                <SearchInput filterUsers={this.filterUsers} />
                <UserList users={this.state.users} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea'
    },
}) 