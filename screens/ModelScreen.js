import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import  Modal  from 'react-native-modalbox';



export default class ModelScreen extends React.Component{

    constructor(props) {
        super(props);
        console.log('modal class');
        
    }

    // static navigationOptions = {
    //     header: null
    // }
    
    showMyCustomAlert = () =>{
        console.log('custom alert');
        this.refs.customAlert.open();
    }
    
    render()
    {
        
        return (
            <Modal 
            ref = {"customAlert"}
            style={styles.bg} position = 'center'>
                 <Text style={styles.text}>Brand:</Text>
                 <Text style={styles.text}>Brand:</Text>
            </Modal>
        )
    }

  

} 
 const styles=StyleSheet.create({
    text:{
        color: '#cdcdcd',
        backgroundColor:'red',
        flex:1,
        marginLeft:'10%'
    },
    bg:{
        backgroundColor: 'white',
        shadowRadius:10,
        width: '90%',
        height : '60'
    }
})