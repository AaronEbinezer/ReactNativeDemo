import React from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, FlatList, ScrollView , Image} from 'react-native';
import CardView from 'react-native-cardview' ;
export default class DesignScreen extends React.Component{

    constructor(props)
    {
        super(props);
        this.state ={
            dataSource :[]
        }
    }

    componentDidMount(){
        
        console.log('Design');
        const url = `http://kbg.brainmagicllc.com/api/Product/getallinfo`;
        fetch(url)
        .then(response => response.json())
        .then(responseData => {
            this.setState ({
                dataSource:responseData.data
            })
            
            console.log(this.state.dataSource)
        })
        .catch(error => console.log(error))
        
    }

    listView = ({item})=>{
        return (
            <CardView
            cardElevation ={5}
            cardMaxElevation ={5}
            cornerRadius = {5}
            style={styles.cardViewStyle}
            >
            <Text style={styles.cardViewText}> {item.Brand} </Text>
            </CardView>
        )
    }

    render (){
        return (

            <View style ={styles.mainContainer}>

                <FlatList
                    data = {this.state.dataSource}
                    renderItem ={this.listView}
                    keyExtractor ={item => item.id}
                ></FlatList>

                {/* <View style ={styles.subContainer}>
                    <Image style ={styles.image} source={require('../assets/drawer.png')}></Image>
                </View>
                <View style ={styles.subContainer}>
                <Text style ={styles.text}>Christ my Saviour</Text>
                </View> */}
            </View>
        );
    }

}

const styles = StyleSheet.create({

    cardViewStyle:{
        marginTop:5
    },
    cardViewText:{
        color:'black',
        fontSize:20
    },
    mainContainer:{
        flex : 1,
        backgroundColor:'lightgreen',
        flexDirection:'column',
        justifyContent:'center',
    },
    subContainer:{
        backgroundColor:'lightpink',
        justifyContent:'center',
        alignContent:'center',
    },
    image:{     
        alignSelf:'center',
    },
    text:{
        textAlign:'center',
    }

})