import React, { memo } from 'react';
import LoginScreen from '../screens/login/LoginScreen';
import SplashScreen from '../splash/SplashScreen';
import HomeScreen from '../screens/home/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();


const TabBarIcon = React.memo(({ route }) => {
          let src;
          if (route.name === 'Shipments') {
            src = require('../assets/images/shipment.png');
          } else if (route.name === 'Scan') {
            src = require('../assets/images/scan.png');
          }
          else if (route.name === 'Wallet') {
            src = require('../assets/images/wallet.png');
          }
          else {
            src = require('../assets/images/profile.png');
          }
          // You can return any component that you like here!
          return <Image source={src}  style={styles.imageStyle} resizeMode={'contain'} />;
        })

const TabNavigator = () => {
    return (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
        tabBarIcon: () => <TabBarIcon  route={route}  />,
        tabBarActiveTintColor: '#5B4CCC',
        tabBarInactiveTintColor: '#A7A3B3',
        headerShown: false
      })}
        >
                <Tab.Screen name='Shipments' component={HomeScreen} />
                <Tab.Screen name='Scan' component={HomeScreen}/>
                <Tab.Screen name='Wallet' component={HomeScreen}/>
                <Tab.Screen name='Profile' component={HomeScreen}/>
            </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 24,
        height: 25
    }
})

export default TabNavigator;