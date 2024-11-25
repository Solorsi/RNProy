import { TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";
import { Component } from 'react'
import { db, auth } from '../firebase/config'

export default class PostInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            loadingPost: false,
        };
    }

    handleTextChange = (content) => {
        this.setState({ content })
    }

    handleSubmit = () => {
        this.setState({ loadingPost: true })
        db.collection('posts').add({
            author: auth.currentUser.email,
            content: this.state.content,
            createdAt: Date.now(),
            likes: []
        })
            .then(() => this.setState({ content: "", loadingPost: false }))
            .catch(e => this.setState({ loadingPost: false }))
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    multiline
                    maxLength={280}
                    placeholder="Share your opinion!"
                    value={this.state.content}
                    onChangeText={this.handleTextChange} />
                <View style={styles.footer}>
                    <Text style={styles.charCount}>{280 - this.state.content.length}</Text>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            this.state.content.trim().length === 0 && styles.disabledButton,
                        ]}
                        onPress={this.handleSubmit}
                        disabled={this.state.content.trim().length === 0 || this.state.loadingPost === true}
                    ><Text style={styles.buttonText}>Create post</Text>
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
    },

    input: {
        fontSize: 16,
        lineHeight: 20,
        color: '#333',
        textAlignVertical: 'top',
        minHeight: 80,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    button: {
        backgroundColor: '#1E90FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },

    disabledButton: {
        backgroundColor: '#AAB8C2',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    charCount: {
        fontSize: 14,
        color: '#888',
    },
}) 