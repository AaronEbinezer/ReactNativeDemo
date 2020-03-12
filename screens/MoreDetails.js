import React from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


export default class MoreDetails extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],   
            userName : this.props.navigation.state.params.username,
            isVisible: false
        }

        console.log(this.state.userName);
    }

    static navigationOptions = ({ screenProps }) => ({
        title: 'Home',
        headerLeft: (
            <Button onPress={() => screenProps.openDraw()}
                title='Open' color='red' />
        ),
    })

    // static navigationOptions = {
    //     header: null
    // }

    
    changeAlert = (bool) => this.setState({ isVisible: bool})   
    
    finish = () => this.props.navigation.goBack(null)
    
    render()
    {
        
        return (
            <View style={styles.parentBg}>
                <View style={styles.childBg}>
                    <View style={styles.childOneBg}>
                 <Text style={styles.text}>About</Text></View>
                 <View style={styles.childOneBg}>
                 <Text style={styles.text}>Home</Text></View>
                 </View>

                 <View style={styles.childBg}>
                    <View style={styles.childOneBg}>
                 <Text style={styles.text} onPress = {()=>{this.finish()}}>Network</Text></View>
                 <View style={styles.childOneBg}>
                 <Text style={styles.text}>{this.state.userName}</Text></View>
                 </View>
                  <TouchableOpacity 
                            style={styles.buttonStyleAlert} 
                            onPress={()=>this.changeAlert(true) } 
                            activeOpacity={0.7} 
                            >
    
                            <Text style={styles.TextStyle}> CANCEL </Text>
                
                        </TouchableOpacity>
                 <Modal transparent={true} visible = {this.state.isVisible} 
 
 animationType={"slide"}  position = 'center'>
                <View style={styles.modalInnerView}>

                 <Text style={styles.headerTextAlert}>Brand:</Text>
                 <View style = {{flex:5}}>
                    <View style = {{flexDirection:'row'}}>
                        <Dropdown
                            label='Select Brand'
                            containerStyle={styles.dropDownChildAlert}
                            baseColor='transparent'
                            value='Select Brand'
                            textColor='black'
                            data={this.state.brandList}
                            onChangeText={this.getBrandBasedPatternList}
                        // onPress={this.getBrandBasedPatternList}
                        />

</View>
                    <View style = {{flexDirection:'row'}}>

                        <Dropdown
                            label='Select Pattern'
                            containerStyle={styles.dropDownChildAlert}
                            baseColor='transparent'
                            value='Select Pattern'
                            textColor='black'
                            data={this.state.patternList}
                            onChangeText={this.getPatternItems}
                        />
                        {/* <ModalDropdown style={styles.dropDownChild}
                            // options={['option 1', 'option 2']}

                            options={data}
                        /> */}

</View>
</View>
<View style = {{flex:1, flexDirection:'row'}}>
                 <TouchableOpacity 
                            style={styles.buttonStyleAlert} 
                            onPress = {()=>this.changeAlert(false)}
                            activeOpacity={0.7} 
                            >
    
                            <Text style={styles.TextStyle}> CANCEL </Text>
                
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.buttonStyleAlert} 
                            onPress={()=>this.changeAlert(false) } 
                            activeOpacity={0.7} 
                            >
    
                            <Text style={styles.TextStyle}> CANCEL </Text>
                
                        </TouchableOpacity>

                       
                 </View>
                 </View>
            </Modal>
            </View>
        )
    }

}


 const styles=StyleSheet.create({
    parentBg:{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    }, 
    text:{
        color: 'mediumseagreen',
        textAlign: 'center',
        width: '50%',
        fontSize : 16,
        fontFamily: 'bold'
    },
   
    childBg:{        
        flex: 0.2,
        flexDirection: 'row',  
        alignItems: 'center'  
    }, 
    childOneBg:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#cdcdcd',
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        height:'75%',
        justifyContent: 'center'
    },   
    modalInnerView:{
        width: '90%',
        height:'75%',
        backgroundColor: 'white', 
        alignSelf:'center',
        marginTop:'10%'
    },
    buttonStyleAlert: {
        flex:1,
        marginTop:'5%',
        color:'white',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor: 'yellow'
     
    },
    dropDownChildAlert: {
        color: '#000',
        backgroundColor: 'white',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 15,
        borderWidth:1,
        flex:1,
        marginTop:'5%'
    },
    headerTextAlert: {
        fontSize: 20,
        fontStyle: 'normal',
        color: 'green',
        alignSelf:'center',
        marginTop:'5%',
        marginBottom:'5%'

    },

})