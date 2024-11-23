import { StyleSheet, View, FlatList } from "react-native";
import { Component } from 'react'
import Post from "./Post";
import { db } from '../firebase/config'

export default class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true

        };
    }


    componentDidMount() {
        db.collection('posts').orderBy("createdAt","desc").onSnapshot(snapshot => {
            let posts = [];
            snapshot.forEach(doc => {
                posts.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            this.setState({
                posts: posts,
                loading: false
            });
        });
    }

    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Post post={item} />}
                />
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