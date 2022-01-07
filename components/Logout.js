import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { auth } from '../firebase'

const Logout = (props) => {
    const navigation = useNavigation()

    const logout = () => {
        auth
        .signOut()
        .then(() => {
            navigation.navigate("Login")
            console.log("Logged Out")
        })
        .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity style={{marginBottom: 50}} onPress ={logout} >
                <DrawerItem
                    label="Sign Out" 
                    icon={({color, size}) => (
                        <Icon
                            type='material-community'
                            name='logout-variant'
                            color ={color}
                            size ={size}
                        />
                    )}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
