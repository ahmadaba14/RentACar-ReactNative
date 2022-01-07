import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import AddCar from '../screens/AddCar';
import UserProfile from '../screens/UserProfile';

const BottomTabs = createBottomTabNavigator();

const BottomNav = () => {
    return (
        <BottomTabs.Navigator
                screenOptions = {{
                    "tabBarActiveTintColor": "#0782F9",
                    "tabBarStyle": [
                      {
                        "display": "flex"
                      },
                      null
                    ]
                }}
            >
            <BottomTabs.Screen
                name='Home'
                component={HomeScreen}
                options={
                    {
                        headerShown: false,
                        tabBarLabel: "Home",
                        tabBarIcon: ({color, size}) => (
                            <Icon
                                name = "home"
                                type='material'
                                color={color}
                                size={size} 
                            />
                        )
                    }
                }
            />
            <BottomTabs.Screen
                name='AddCar'
                component={AddCar}
                options={
                    {
                        headerShown: false,
                        tabBarLabel: "Add Car",
                        tabBarIcon: ({color, size}) => (
                            <Icon
                                name = "add"
                                type='material'
                                color={color}
                                size={size} 
                            />
                        )
                    }
                }
            />
            <BottomTabs.Screen
                name='UserProfile'
                component={UserProfile}
                options={
                    {
                        headerShown: false,
                        tabBarLabel: "Account",
                        tabBarIcon: ({color, size}) => (
                            <Icon
                                name = "person"
                                type='material'
                                color={color}
                                size={size} 
                            />
                        )
                    }
                }
            />
        </BottomTabs.Navigator>
    )
}

export default BottomNav

const styles = StyleSheet.create({})
