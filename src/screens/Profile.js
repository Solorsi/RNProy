import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Component } from 'react'
import { db, auth } from "../firebase/config";
import PostList from "../components/PostList";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user: null,
            loadingUser: true,
            loadingPost: true,
            loadingLogout: false,
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                this.props.navigation.navigate('Login')
            }
        });
        db.collection('users').where("owner", "==", auth.currentUser.email).onSnapshot(snapshot => {
            let users = []
            snapshot.forEach(doc => {
                users.push(doc.data());
            });
            this.setState({
                user: users[0],
                loadingUser: false
            });
        })
        db.collection('posts').where("author", "==", auth.currentUser.email).onSnapshot(snapshot => {
            let posts = [];
            snapshot.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            posts.sort((a, b) => b.data.createdAt - a.data.createdAt);
            this.setState({
                posts: posts,
                loadingPost: false
            });
        });
    }

    logout() {
        auth.signOut()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Profile</Text>
                <Text>Username: {this.state.loadingUser === false ? '@' + this.state.user.username : 'Loading'}</Text>
                <Text>Email: {this.state.loadingUser === false ? this.state.user.owner : ''}</Text>
                <Text>Cantidad de posteos: {this.state.loadingPost === false ? this.state.posts.length : ''}</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.logout()}
                    disabled={this.state.loadingLogout === true}>
                    <Text>Log Out</Text>
                </TouchableOpacity>
                <Text>My posts</Text>
                <PostList posts={this.state.loadingPost === false ? this.state.posts : ''} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea'
    },
    button: {
        backgroundColor: 'grey',
        borderRadius: 10,
        margin: 10,
        height: 40,
    },
}) 