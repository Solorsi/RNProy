import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { Component } from 'react'
import Post from "./Post";

export default class PostList extends Component {

    render() {
        return (
            <View style={styles.container} >
                {this.props.loading ? (
                    <ActivityIndicator size="large" color="#1DA1F2" />
                ) : (
                    <FlatList
                        data={this.props.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Post post={item} />}
                    />
                )}
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