import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'
import BottomNav from './BottomNav'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { colors } from 'react-native-elements'
import AddCar from '../screens/AddCar'
import Logout from '../components/Logout'
import UserBookings from '../screens/UserBookings'

const Drawer = createDrawerNavigator()

const DrawerNav = () => {
    return (
        <Drawer.Navigator
                drawerContent={props => <Logout {...props}/>}
            >
            <Drawer.Screen 
                name = "BottomNav"
                component = {BottomNav}

                options={{
                    title: 'Home',
                    headerShown: false,
                    drawerIcon: ({focused, size}) => (
                        <Icon
                            type='material'
                            name='home'
                            color={focused ? '#0782F9': colors.grey2}
                            size={size} 
                        />
                    )
                }}
            />
            <Drawer.Screen 
                name = "AddCar"
                component = {AddCar}

                options={{
                    title: 'Add Car',
                    headerShown: false,
                    drawerIcon: ({focused, size}) => (
                        <Icon
                            type='material'
                            name='add'
                            color={focused ? '#0782F9': colors.grey2}
                            size={size} 
                        />
                    )
                }}
            />
            <Drawer.Screen 
                name = "UserBookings"
                component = {UserBookings}

                options={{
                    title: 'My Bookings',
                    headerShown: false,
                    drawerIcon: ({focused, size}) => (
                        <Icon
                            name = "book-account"
                            type='material-community'
                            color={focused ? '#0782F9': colors.grey2}
                            size={size} 
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNav

const styles = StyleSheet.create({})
