import { TouchableOpacity, StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import {Component} from 'react'
import Post from "./Post";



export default class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [{
                id: 1,
                content: "mi primer post",
                author: "Brisa",
                createdAt: "21/11/2024"
            },
            {
                id: 2,
                content: "mi segundo post",
                author: "Brisa",
                createdAt: "22/11/2024"
            },
            {
                id: 3,
                content: "mi tercer post",
                author: "Brisa",
                createdAt: "23/11/2024"
            },]
        
            
        };
    }

   

    render(){
        return (
            <View style={styles.container}>
                
        <FlatList
            data= {this.state.posts}
            keyExtractor= { item => item.id.toString()}
            renderItem={({item}) => <Post post={item}/>}
            />    
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#eaeaea'
    },
   
}) 