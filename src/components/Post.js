import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { AntDesign} from '@expo/vector-icons';
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

    deletePost = () => {
        db.collection("posts")
          .doc(this.props.post.id)
          .delete()
          .then(() => {
            console.log("Post eliminado");
          })
          .catch((error) => {
            console.log(error);
          });
      };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.author}>{this.props.post.author}</Text>
                </View>
                <Text style={styles.content}>{this.props.post.content}</Text>
                <View style={styles.footer}>
                    <View style={styles.likesContainer}>
                        <TouchableOpacity
                            style={[
                                styles.likeButton,
                            ]}
                            onPress={this.handleLike}
                        >
                            <Text style={styles.likeButtonText}>
                                {this.state.isLiked ? <AntDesign name="heart" /> : <AntDesign name="hearto" />}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.likes}>{this.state.likes.length} Likes</Text>
                    </View>
                    {this.props.post.author === auth.currentUser.email && (
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={this.deletePost}
                        >
                            <Text style={styles.deleteButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    author: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1DA1F2",
    },
    date: {
        fontSize: 12,
        color: "#aaa",
    },
    content: {
        fontSize: 16,
        color: "#333",
        marginBottom: 15,
        lineHeight: 22,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    likes: {
        fontSize: 14,
        color: "#333",
        marginRight: 10,
    },
    likeButton: {
        height: 30,
        width: 30,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1DA1F2",
        borderRadius: 50,
    },
    likeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#ff4d4d",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})


