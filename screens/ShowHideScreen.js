import React from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableWithoutFeedback ,Button,Animated, TouchableOpacity, FlatList, ScrollView , Image} from 'react-native';
import CardView from 'react-native-cardview';
import GetLocation from 'react-native-get-location'
import DatabaseManagement from './DatabaseManagement';
const db = new DatabaseManagement();
export default class DesignScreen extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state ={
            isVisible:false,
            lat: null,
            lon: 12.234234,
            products: null,
            isLoading: false,
        }
    }

    componentDidMount()
    {
      this.getNetworkInfo();
    }

    getNetworkInfo ()  {
        console.log('getNetworkInfo');
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            this.setState ({
                lat: location.latitude,
                lon: location.longitude
            })
            console.log(location);
            console.log(this.state);
        })
        .catch(error => {
            const { code, message } = error;      
            console.warn(code,message);    
            if(message == 'Authorization denied')
            {
                console.warn(code);
                Alert.alert('Alert','You did not give permission to access your location. Do you want to exit ?',[
                    {                     
                        text:'Yes', onPress:()=>{
                            console.log('Dismissed');
                            this.props.navigation.goBack(null)
                            // this.props.navigation.goBack()
                    }
                    },
                    {text: 'No', onPress: () => this.getNetworkInfo()},  
                 ])
            }
        })
    }

    onPress = ()=>{
      
        this.setState ({
            isVisible: !this.state.isVisible
        })
        console.log('onPress '+this.state.isVisible);
    }

    saveProduct() {
        // this.setState({
        //   isLoading: true,
        // });
        let data = {
          prodId: '7',
          prodName: 'Christ the Saviour',
          prodDesc: 'He came to Save Us',
          prodImage: 'sfs.jpg',
          prodPrice: 'Worthless'
        }
        db.addProduct(data).then((result) => {
          console.log(result);
        //   this.setState({
        //     isLoading: false,
        //   });
          this.props.navigation.state.params.onNavigateBack;
          this.props.navigation.goBack();
        }).catch((err) => {
          console.log(err);
        //   this.setState({
        //     isLoading: false,
        //   });
        })
      }

    createDb = ()=>{
        let products = [];
  db.listProduct().then((data) => {
    console.log(data);
    this.setState({
      products: data,
    //   isLoading: false,
    });
  }).catch((err) => {
    console.log('Error after Saving'+err);
    this.setState = {
    //   isLoading: false
    }
  })
 
    }

    getProductList = () =>{
        db.listProduct().then((data) => {
            console.log(data);
            this.setState({
              products: data,
            //   isLoading: false,
            });
          }).catch((err) => {
            console.log('Error after Saving'+err);
            this.setState = {
            //   isLoading: false
            }
        }) 
    }

    textView =() =>{
        return (
        
            <Text style={styles.cardViewText}> Visible</Text>
          
        )
    }

    listView = ({ item }) => {
        
        console.log(item.prodId,'hi');
        return (

            <TouchableOpacity onPress = {() =>this.selectedItem(item.prodId)}>
            <CardView>
                <Text>{item.prodId}</Text>

            </CardView>
            </TouchableOpacity>
        );
    }

    selectedItem (data) {
        console.log(data);
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
        <View><Text>Christ the Jesus</Text></View>
        <View><Text>Latitude: {this.state.lat} Longitude: {this.state.lon} </Text></View>
        <TouchableOpacity> 
                <Text onPress = {this.getProductList}>Click Me</Text>
            </TouchableOpacity>

           <FlatList
            data = {this.state.products}
            renderItem = {this.listView}
            keyExtractor = {item => item.prodId}
           ></FlatList>
            
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