import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { white } from 'ansi-colors';

export default class drawerContentComponents extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

    navigateToScreenMore = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction,{ username : 'More' });
    })
    navigateToMoreScreen = ( ) =>{
            this.props.navigation.navigate('More',{ username : 'More' })
    };

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <ImageBackground source={require('../assets/drawer.png')} style={{tintcolor:'white'}} >
                    <Text style={styles.headerText}>Header Portion</Text>
                    <Text style={styles.headerText}>You can display here logo or profile image</Text>
                </ImageBackground>
            </View>
            <View style={{width:'100%',height:1, backgroundColor:'grey'}}></View>
            <View style={styles.screenContainer}>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='HomeScreen') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenA') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Home')}>Home</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='MoreScreen') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenB') ? styles.selectedTextStyle : null]} onPress={this.navigateToMoreScreen}>More</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='DesignScreen') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenC') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Design')}>Design</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='DesignScreen') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenC') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Image')}>Image</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='ShowHideScreen') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenC') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('ShowHide')}>ShowHide</Text>
                </View>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: { 
        paddingTop: 20,
        width: '100%',
    },
    screenStyle: {
        height: 30,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20, 
        textAlign: 'center',
        color:'grey'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#00adff'
    },
    activeBackgroundColor: {
        backgroundColor: 'grey'
    }
});