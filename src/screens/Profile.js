import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
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
                <Image style={styles.image}
                    source={{uri:'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'}}
                    resizeMode='contain'
                />
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.userInfo}>Username: {this.state.loadingUser === false ? '@' + this.state.user.username : 'Loading'}</Text>
                <Text style={styles.userInfo}>Email: {this.state.loadingUser === false ? this.state.user.owner : ''}</Text>
                <Text style={styles.userInfo}>Post count: {this.state.loadingPost === false ? this.state.posts.length : ''}</Text>
                <TouchableOpacity
                    style={[
                        styles.button,
                        this.state.loadingLogout && styles.buttonDisabled,
                    ]}
                    onPress={() => this.logout()}
                    disabled={this.state.loadingLogout === true}
                >
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>My Posts</Text>
                <PostList posts={this.state.posts} />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4169E1',
        textAlign: 'center',
        marginBottom: 10, 
    },
    userInfo: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8, 
    },
    button: {
        backgroundColor: '#4169E1',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10, 
    },
    sectionTitle: {
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#4169E1',
        marginTop: 15, 
        marginBottom: 5, 
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 15, 
        borderWidth: 2,
        borderColor: '#ccc',
    },
});
