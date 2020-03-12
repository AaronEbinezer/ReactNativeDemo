import React from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, FlatList, ScrollView , Image} from 'react-native';
import CardView from 'react-native-cardview' ;
export default class DesignScreen extends React.Component{

    constructor(props)
    {
        super(props);
        this.state ={
            isVisible:false
        }
    }

    onPress = ()=>{
      
        this.setState ({
            isVisible: !this.state.isVisible
        })
        console.log('onPress '+this.state.isVisible);
    }

    textView =() =>{
        return (
        
            <Text style={styles.cardViewText}> Visible</Text>
          
        )
    }

    render (){
        return (

            <View style ={styles.mainContainer}>

<TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
       >
         <Text> Touch Here </Text>
 </TouchableOpacity>

        <View>{this.state.isVisible?this.textView():null}</View>
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
    },
    button:{
        backgroundColor:'pink'
    }

})