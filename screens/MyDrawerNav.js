import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import MoreDetails from './MoreDetails';
import Home from './HomeScreen';

const MyDrawerNav = createDrawerNavigator({

    Homes: Home,
    AboutUs: MoreDetails

}, {
    initialRouteName: 'Homes',
    drawerWidth: 300,
    drawerPosition: 'left'
});

const AppContainer = createAppContainer(MyDrawerNav);

export default class drawernavigator extends React.Component {
    render() {
        return <AppContainer />
    }
}