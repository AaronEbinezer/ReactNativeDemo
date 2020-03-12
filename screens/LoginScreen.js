import React from 'react';
import {View, Button, TextInput, StyleSheet, Image, Text, Alert} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {AsyncStorage} from 'react-native';
var SharedPreferences = require('react-native-shared-preferences');
export default class LoginScreen extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            userName:'',
            password:''
        }
     
    }

       componentDidMount() {
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        // SharedPreferences.setName("KBG");
        console.log('Login');
        SplashScreen.hide();
   
    }


    validateUser= async()=>{
        // console.log(this.state.userName,this.state.password);
        // const {name,pass}=this.state;
        // if(this.state.userName == 'Aaron' && this.state.password == 'pass')
        {
            // console.log(this.state.userName,this.state.password);
            if(this.state.userName=='Aaron' && this.state.password=='Pass')
            {
                SharedPreferences.setItem("isLogin",'true')
                try {
                    await AsyncStorage.setItem('isAreadyLogin', 'Login success');
                    await AsyncStorage.setItem('userToken', true);
                  } catch (error) {
                    // Error retrieving data
                    console.log(error.message);
                  }
                Alert.alert('Alert','Login Success',[
                {                     
                    text:'Okay', onPress:()=>{
                        this.navigateToHome();
                }
                }
             ])
            }
            else{
                Alert.alert('Alert','Login Failed',[
                    {
                        text:'Okay', onPress:()=>{
                            this.navigateToMore();
                        }
                    }
                ])
            }
            
        }
        // else
        // {
        //     Alert.alert('Alert','Login Failed, Please enter valid password',[
        //        { 
        //            text:'Okay', onPress:()=>{
        //             console.log('Okay');
        //        }
        //        }
        //     ])
        // }
    }


    onChangeUserName = userName => {this.setState({userName:userName});}
    onChangePassword = password => this.setState({password:password});


    navigateToHome=()=>{
        this.props.navigation.replace('Homes');
    }

    navigateToMore = () =>{        
        this.props.navigation.replace('Mores',{ username : this.state.userName });
    }


    render(){
        return(
            <View style={styles.parent}>
                <View style={styles.logoLayout}>
                                     
                    <View>
                    <Image style={styles.logo} source={require('../assets/react.png')}></Image>
                    </View>

                    <View>
                    <Text style={{color:'white',fontSize:25, fontStyle:'italic',alignSelf:'center'}}>React Native</Text>
                    </View>
                   
                </View>
                <View style={styles.main}>
                    <View style={styles.inputText} >
                    <TextInput placeholder='Enter User Name' onChangeText={this.onChangeUserName}></TextInput>
                    </View>
                    <View style={styles.inputText}>
                        <TextInput placeholder='Enter Password' onChangeText={this.onChangePassword}></TextInput>
                    </View>
                    <Button title='Sumbit' onPress={this.validateUser}></Button>
                </View>
            </View>
        );
    }
};

const styles=StyleSheet.create({

    parent:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'skyblue'
    },

    logoLayout:{
        flex:1,
        justifyContent:'center'
    },

    logo:{
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf:'center'
    },

    main:{
        flex:2,
        marginLeft:'5%',
        marginRight:'5%',
        marginTop:'15%'
    },

    inputText:{
        fontSize:18,
        borderRadius:10,
        color:'black',
        backgroundColor:'white',
        marginBottom:20,
        paddingLeft:20,

    }

})