import React, { memo } from 'react';
import LoginScreen from '../screens/login/LoginScreen';
import SplashScreen from '../splash/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import TabNavigator from './TabNavigator';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='splash' screenOptions={{ headerShown: false }}>
            {/* Your navigators and screens will go here */}
              <Stack.Screen
        name={'tabs'}
        component={TabNavigator}
      
      />
            <Stack.Screen name="splash" component={SplashScreen}  />
            <Stack.Screen name="login" component={LoginScreen}  />
            <Stack.Screen name="home" component={HomeScreen}  />
           
        </Stack.Navigator>
    );
}

export default AppNavigator;