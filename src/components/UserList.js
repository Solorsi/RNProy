import { StyleSheet, View, FlatList } from "react-native";
import { Component } from 'react'
import User from "./User";

export default class UserList extends Component {
    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    data={this.props.users}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <User user={{id: item.id, ...item.data}} />}
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