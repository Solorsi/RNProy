import { TouchableOpacity, StyleSheet, Text, View, TextInput, } from "react-native";
import { Component } from 'react'
import { auth, db } from "../firebase/config"
import firebase from "firebase"





export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.post.likes,
            isLiked: this.props.post.likes.includes(auth.currentUser.email)


        };
    }

    handleLike = () => {
        if (!this.state.isLiked) {
            db.collection("posts").doc(this.props.post.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
                .then(() => {
                    this.setState((prevState) => ({
                        likes: [...prevState.likes, auth.currentUser.email],
                        isLiked: true
                    }))

                })
                .catch((error) => console.log("Error:", error));

        } else {
            db.collection("posts").doc(this.props.post.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
                .then(() => {
                    this.setState((prevState) => ({
                        likes: prevState.likes.filter(email => email !== auth.currentUser.email),
                        isLiked: false
                    }))

                })
                .catch((error) => console.log("Error:", error));
        }


    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.content}> {this.props.post.content}</Text>
                <Text style={styles.author}> {this.props.post.author}</Text>
                <View style={styles.footer}>
                    <Text style={styles.likes}>Likes: {this.state.likes.length}</Text>
                    <TouchableOpacity
                        style={styles.likeButton}
                        onPress={this.handleLike}
                    >
                        <Text style={styles.likeButtonText}>
                            {this.state.isLiked ? "Dislike" : "Like"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    content: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',

    },

    author: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#555',
        textAlign: 'right',

    },


    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    likes: {
        fontSize: 14,
        color: "#333",
    },
    likeButton: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: "#1DA1F2",
        borderRadius: 5,
    },
    likeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})


