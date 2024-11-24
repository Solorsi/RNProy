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
            });
        });
     }

    render(){
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <Text>Feed</Text>
                <PostInput/>
                <PostList posts={this.state.posts}/>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#eaeaea'
    },
}) 