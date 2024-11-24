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
            <TextInput
                style={styles.input}
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
                >
                    <Text style={styles.buttonText}>Buscar</Text>
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
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#4169E1',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        flex: 1,
        height: '100%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#4169E1',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        height: '100%',
    },
    disabledButton: {
        backgroundColor: '#AAB8C2',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
}) 