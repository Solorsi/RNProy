import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Component } from 'react'
import User from "./User";

export default class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
    }
    handleTextChange = (search) => {
        this.setState({ search })
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="Buscar un usuario"
                    value={this.state.search}
                    onChangeText={this.handleTextChange}
                />
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            this.state.search.trim().length === 0 && styles.disabledButton,
                        ]}
                        onPress={() => this.props.filterUsers(this.state.search)}
                        disabled={this.state.search.trim().length === 0}
                    ><Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    input: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        textAlignVertical: 'top',
        minHeight: 80,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    button: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    disabledButton: {
        backgroundColor: '#AAB8C2',
    },
}) 