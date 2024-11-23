import { TouchableOpacity, StyleSheet, Text, View, TextInput, } from "react-native";
import { Component } from 'react'
import Post from "./Post";



export default class PostInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""

        };
    }

    handleTextChange = (text) => {
        this.setState({ text })


    }

    handleSubmit = () => {
        console.log(this.state.text)
    }



    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    multiline
                    maxLength={280}
                    placeholder="Comparte tu momento!"
                    placeholderTextColor="#aaa"
                    value={this.state.text}
                    onChangeText={this.handleTextChange} />
                <View style={styles.footer}>
                    <Text style={styles.charCount}>{280 - this.state.text.length}</Text>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            this.state.text.trim().length === 0 && styles.disabledButton,
                        ]}
                        onPress={this.handleSubmit}
                        disabled={this.state.text.trim().length === 0}
                    ><Text style={styles.buttonText}>Post</Text>
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

    charCount: {
        fontSize: 14,
        color: '#aaa',

    }




}) 