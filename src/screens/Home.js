import { StyleSheet, Text, View } from "react-native";
import {Component} from 'react';
import PostList from "../components/PostList";
import PostInput from "../components/PostInput";
import { db, auth } from "../firebase/config";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading:true
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                this.props.navigation.navigate('Login')
            }
        });
        db.collection('posts').orderBy("createdAt","desc").onSnapshot(snapshot => {
            let posts = [];
            snapshot.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            this.setState({
                posts: posts,
                loading:false
            });
        });
     }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Welcome to SunBreeze</Text>
                </View>
                <View style={styles.postInputContainer}>
                    <PostInput />
                </View>
                <View style={styles.postListContainer}>
                    <Text style={styles.feedText}>Feed</Text>
                    <PostList posts={this.state.posts} loading={this.state.loading} />
                </View>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    postInputContainer: {
        marginBottom: 20,
    },
    postListContainer: {
        flex: 1,
    },
    feedText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
}) 