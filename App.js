/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Login from './screens/LoginScreen'
import Home from './screens/HomeScreen'
import More from './screens/MoreDetails'
import ImagePicker from './screens/ImagePicker'
import DrawerNav from './screens/MyDrawerNav';
import MyDrawerNav from './screens/NavigationDrawerStructure ';
import drawerScreen from './screens/drawerContentComponents ';
import designScreen from './screens/DesignScreen';
import showHideScreen from './screens/ShowHideScreen';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
  Image,
  TouchableOpacity
} from 'react-native';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, StackNavigator , createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons'

import NavigationDrawerStructure from './models/navigationdrawer';

export class App extends React.Component {
constructor(props){

  super(props);
  this.state = {
    isLogin: false
  }
}

componentDidMount() {
  // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    // SharedPreferences.setName("KBG");
    console.log('component mount');
    this._retrieveData();

}

  _retrieveData = async () => {
    try {

      const value = await AsyncStorage.getItem('isAreadyLogin');
      if (value !== null) {
        // We have data!!
        // if(value == 'Login Success')
        // {
        //   this.setState({isLogin:true})
        // }

        // this.props.navigation.navigate(value == 'Login Success'? 'MySwitchNavigator':'stackNavigators')
        this.props.navigation.navigate(value == 'Login'? 'Homes':'Main')
        console.log(value);
      }
      
    } catch (error) {
      // Error retrieving data
    }
  };
  render() {
    return (
      <AppNavigator />
    );
  }
};

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const isLogin = await AsyncStorage.getItem('isAreadyLogin');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log(isLogin);
    this.props.navigation.navigate(isLogin =='Login success' ? 'Auth' : 'App');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

class HamburgerIcon extends React.Component {

 

  toggleDrawer=()=>{

 

    // console.log(this.props.navigationProps);

   

    this.props.navigationProps.toggleDrawer();

 

  }

 

  render() {

 

    return (

 

      <View style={{flexDirection: 'row', height: 50, backgroundColor:'skyblue', elevation:10}}>

 

        <TouchableOpacity style ={{ justifyContent:'center'}} onPress={this.toggleDrawer.bind(this)} >
 

          <Image

            source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png'}}

            style={{ width: 25, height: 25, marginLeft:10, tintColor: 'white', alignItems: 'center',alignSelf:'center', alignContent:'center',justifyContent:'center'}}

          />

 

        </TouchableOpacity>

        <Text style ={{justifyContent:'center', alignItems:'center',  color :'white', flex:1, alignSelf:'center', textAlign: 'center', alignContent:'center',marginRight:50}}>KBG</Text>

 

      </View>   

    ); 

  }

}




const loginNavigators = createStackNavigator({
  Main: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Homes: {
    screen: Home,
  },
  Mores: {
    screen: More,
    navigationOptions: {
      title: "More Details"
    }
  },
},
  {
    initialRouteName: 'Main',
  }
)


const homeNavigators = createStackNavigator({
  Homes: {
   screen: Home,
   navigationOptions: ({navigation }) => ({
     header:  <HamburgerIcon navigationProps={ navigation } />
   })
 },
},
 {    
 initialRouteName:'Homes',
 },
 
)

const moreNavigators = createStackNavigator({
 Mores: {
   screen: More,
   navigationOptions: ({navigation }) => ({
     header:  <HamburgerIcon navigationProps={ navigation } />
   })
 }
},
 
 
)

const designNav = createStackNavigator({
  Design: { screen: designScreen,
    navigationOptions: ({navigation }) => ({
      header:  <HamburgerIcon navigationProps={ navigation } />
    })
  }
})

const imageNavigators = createStackNavigator({
  Image: {
    screen: ImagePicker,
    navigationOptions: ({navigation }) => ({
      header:  <HamburgerIcon navigationProps={ navigation } />
    })
  }
 }, 
  
 )

 const showHideNavigators = createStackNavigator({
  ShowHide: {
    screen: showHideScreen,
    navigationOptions: ({navigation }) => ({
      header:  <HamburgerIcon navigationProps={ navigation } />
    })
  }
 },
  
  
 )

const MyCustomDrawerNav = createDrawerNavigator({

  Home: {screen: homeNavigators,
    navigationOptions:{
      drawerLabel: 'HomeScreen',
    }
  
  }
  ,  
  More: {screen: moreNavigators,
    navigationOptions:{
      drawerLabel: 'MoreScreen',
    }
  },
  
  Design: {
    screen : designNav,
    navigationOptions:{
      drawerLabel: 'MoreScreen',
    }
  },
  Image: {
    screen : imageNavigators,
    navigationOptions:{
      drawerLabel: 'Image',
    }
  },

  ShowHide: {
    screen : showHideNavigators,
    navigationOptions:{
      drawerLabel: 'Image',
    }
  }

}, {
  initialRouteName: 'Home',
  drawerWidth: 250,
  drawerPosition: 'Left',
  contentComponent: drawerScreen
 
});

export const MySwitchNavigator = createSwitchNavigator({ 
 
    AuthLoading: AuthLoadingScreen,
    App: loginNavigators,
    // Auth: authNavigators,
    Auth: MyCustomDrawerNav,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


const AppNavigator = createAppContainer(MySwitchNavigator);


const AppDrawerNavigatior=createDrawerNavigator({
  Home:{
    screen:Home,
    navigationOptions:{
      drawer:{
        label:'Home'
      }
    }
  },
  Mores: {
    screen: More,
    navigationOptions: {
      // title: "More Details"
      drawer:{
        label:'Home'
      }
    }
  },
},{
  defaultNavigationOptions : ({navigation}) => {
    return {
      headerLeft: <Image source = {require('./assets/drawer.png')}></Image>
    }
  },
  
  // initialRouteName:'Home',
  // drawerWidth:250,
  // drawerPosition:'left',
  // drawerOpenRoute: 'DrawerOpen',
  // drawerCloseRoute: 'DrawerClose',
  // drawerToggleRoute: 'DrawerToggle',
})

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
