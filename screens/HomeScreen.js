import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Modal, FlatList, Button, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import SplashScreen from 'react-native-splash-screen'
import ModalDropdown from 'react-native-modal-dropdown';
import DropdownMenu from 'react-native-dropdown-menu';
import MyCustomAlert from './ModelScreen';
import CardView from 'react-native-cardview' ;
// import  Modal  from 'react-native-modalbox';
// import  Modal  from 'react-native-modalbox';
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            brandList: [],
            patternList: [],
            brandItem: '',
            patternItem:'',
            isVisible: false
        }
        console.log('Home class');
        // this.onPress = this.renderItems.bind(this);
        this._showCustomAlert = this._showCustomAlert.bind(this);
    }



    // static navigationOptions = {
    //     header: null
    // }

 

    getPatternItems = item =>{
        this.setState({patternItem:item})
    }

    _showCustomAlert = () => {
        console.log('alert');
        this.refs.MyCustomAlert.showMyCustomAlert();
    }

    loadListWithSearchedValues = () => {
        // console.log(item)
        
        const url = `http://kbg.brainmagicllc.com/api/Values/OverAllSearch`;
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Brand: this.state.brandItem,
                Pattern: this.state.patternItem
            })
        })
            .then((response) => {
                // console.log(response)
                return response.json()
            }
            )
            .then((responseData) => {
                // console.log(responseData.data)
                this.setState({
                    dataSource: responseData.data
                })
            
            })
            // .then((data)=>
            // {
            //     console.log(this.state.dataSource)
            // })
            .catch((error) => {
                console.log(error);
            })
    }

    getBrandBasedPatternList = (item) => {
        // console.log(item)
        this.setState({brandItem:item})
        const url = `http://kbg.brainmagicllc.com/api/Values/brandbasedpatternlist`;
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                BrandName: item
            })
        })
            .then((response) => {
                // console.log(response)
                return response.json()
            }
            )
            .then((responseData) => {
                console.log(responseData.data)
                let patternListItems = responseData.data.map(team => { return { value: team } })

                this.setState({ patternList: [{ value: 'Select Pattern', display: '(Select your Pattern)' }].concat(patternListItems) });
            
            })
            // .then((data)=>
            // {
            //     console.log(this.state.dataSource)
            // })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidMount() {
        console.log('home');
        SplashScreen.hide();
        const url = `http://kbg.brainmagicllc.com/api/Product/getallinfo`;
        fetch(url)
            .then((response) => {
                return response.json()
            }
            )
            .then((responseData) => {
                this.setState({
                    dataSource: responseData.data
                })
                console.log(this.state.dataSource)
            })
            // .then((data)=>
            // {
            //     console.log(this.state.dataSource)
            // })
            .catch((error) => {
                console.log(error);
            })

        const brandUrl = `http://kbg.brainmagicllc.com/api/Values/GetBrandList`;
        fetch(brandUrl)
            .then((response) => {
                return response.json()
            }
            )
            .then((responseData) => {

                // let brandListItems = responseData.data
                let brandListItems = responseData.data.map(team => { return { value: team } })

                this.setState({ brandList: [{ value: 'Select Brand', display: '(Select your Brand)' }].concat(brandListItems),
                
                });
                // this.setState({
                //        dataSource: responseData.data
                // })
                // console.log(this.state.dataSource)
            })
            // .then((data)=>
            // {
            //     console.log(this.state.dataSource)
            // })
            .catch((error) => {
                console.log(error);
            })

        const patternUrl = `http://kbg.brainmagicllc.com/api/Values/GetPatternList`;
        fetch(patternUrl)
            .then((response) => {
                return response.json()
            }
            )
            .then((responseData) => {

                // let brandListItems = responseData.data
                let patternListItems = responseData.data.map(team => { return { value: team } })

                this.setState({ patternList: [{ value: 'Select Pattern', display: '(Select your Pattern)' }].concat(patternListItems) });
                // this.setState({
                //        dataSource: responseData.data
                // })
                // console.log(this.state.dataSource)
            })
            // .then((data)=>
            // {
            //     console.log(this.state.dataSource)
            // })
            .catch((error) => {
                console.log(error);
            })
    }

    changeModel = (bool) =>
    {
        // console.log(this.state.isVisible);
        this.setState({isVisible : bool})
        
        console.log(this.state.isVisible);

    }

    isVisible (bool) {
        // if(true){
            console.log(bool);
        return (
                <Text style={styles.text}>Hot Sales</Text>
           
        )
        // }
        // else null

    }

    renderItem = ({ item }) => {
        console.log(item.Brand);
        return (            
            <CardView       
            cardElevation ={3}
            cardMaxElevation ={3}
            cornerRadius = {5}>
                <View style ={{flexDirection:'row'}} >
                <Image style={styles.image} source={{ uri: item.MainImageurl1 }} />
                <View style ={{flexDirection:'column'}}>
                <Text style={styles.text}>Brand: {item.Brand}</Text>
                <Text style={styles.text}>Segment: {item.Category}</Text>
                <View >{item.Hotsale == "Yes" ? this.isVisible(false) : null}</View>
                </View>
                </View>
            </CardView>
        )
    }
    render() {
        return (
            <View style={styles.parent}>
                {/* <View style={styles.toolBar}>
                    <Text style={styles.headerText}>KBG</Text>
                </View> */}
                {/* <ScrollView>
                    <View style={styles.body}>
                        <Image style={styles.image} source={require('../assets/drawer.png')}></Image>
                        <Image style={styles.image} source={require('../assets/drawer.png')}></Image>
                        <Image style={styles.image} source={require('../assets/drawer.png')}></Image>
                        <Image style={styles.image} source={require('../assets/drawer.png')}></Image>
                        <Image style={styles.image} source={require('../assets/drawer.png')}></Image>
                        <Image style={styles.image} source={require('../assets/drawer.png')}></Image>
                        <Text>Home Screens</Text>
                    </View>
                    </ScrollView> */}
                <View style={styles.body}>

                    <View style={styles.dropDownLayout}>
                        <Dropdown
                            label='Select Brand'
                            containerStyle={styles.dropDownChild}
                            baseColor='transparent'
                            value='Select Brand'
                            textColor='black'
                            paddingLeft='10%'
                            data={this.state.brandList}
                            onChangeText={this.getBrandBasedPatternList}
                        // onPress={this.getBrandBasedPatternList}
                        />
                        <Dropdown
                            label='Select Pattern'
                            containerStyle={styles.dropDownChild}
                            baseColor='transparent'
                            value='Select Pattern'
                            textColor='black'
                            paddingLeft='10%'
                            data={this.state.patternList}
                            onChangeText={this.getPatternItems}
                        />
                        {/* <ModalDropdown style={styles.dropDownChild}
                            // options={['option 1', 'option 2']}

                            options={data}
                        /> */}

                    </View>

                  <View>

                  <Button title='Sumbit' onPress={this.loadListWithSearchedValues}></Button>
                  </View>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    ></FlatList>
                </View>
            </View>
        )
       }

};




// class FlatListItems extends React.Component{

//     render(){
//         return (
//             <View>
//                 <View>
//                     <Text>
//                         {this.props.item.Brand}
//                     </Text>
//                 </View>
//             </View>
//         );
//     }

// }

const styles = StyleSheet.create({

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
        color:'white',justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor: 'green'
     
    },
    buttonStyle: {
    
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
     
    },

    TextStyle:{
        color:'#000',
        textAlign:'center',
        fontSize: 22,
        marginTop: -5
    },

    parent: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    image: {
        borderWidth: 1,
        borderColor: '#dddddd',
        backgroundColor: 'white',
        width: 100,
        height: 100,
        alignContent: 'center',
        resizeMode: 'cover'
    },

    body: {
        flex: 1,
        backgroundColor: '#cdcdcd',
        justifyContent: 'center',
        flexDirection:'column'
    },

    child: {
        flexDirection: 'row',
        margin: 5
    },

    dropDownLayout: {
        backgroundColor: '#fff',
        flexDirection: 'row',
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

    dropDownChild: {
        color: '#000',
        backgroundColor: 'transparent',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 15,
        flex: 1,
        borderWidth:1
    },

    text: {
        color: 'black',
        fontSize: 18,
    },

    headerTextAlert: {
        fontSize: 20,
        fontStyle: 'normal',
        color: 'green',
        alignSelf:'center',
        marginTop:'5%',
        marginBottom:'5%'

    },

    headerText: {
        fontSize: 20,
        fontStyle: 'normal',
        color: 'white',
        paddingLeft: '5%'

    },

    toolBar: {
        height: 50,
        width: null,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        elevation: 5
    },


});