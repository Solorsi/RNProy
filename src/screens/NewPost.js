import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Component } from 'react'
import { auth } from "../firebase/config";
import PostInput from "../components/PostInput";

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                this.props.navigation.navigate('Login')
            }
        });
    }
    render(){
        return ( 
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>New Post</Text>
                <View style={styles.postInputContainer}>
                    <PostInput />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea',
        padding: 20,
    },
    postInputContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4169E1',
        marginTop: 20,
        marginBottom: 10,
    }, 
}) 