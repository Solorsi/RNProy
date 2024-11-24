import { StyleSheet, View, FlatList } from "react-native";
import { Component } from 'react'
import Post from "./Post";

export default class PostList extends Component {
    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    data={this.props.posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Post post={{id: item.id, ...item.data}} />}
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