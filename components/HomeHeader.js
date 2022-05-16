import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'

const HomeHeader = ({navigation}) => {
    const nav = useNavigation();
    return (
        <View style={styles.header}>
            <View style={styles.icon}>
                <Icon
                    type='material-community'
                    name='menu'
                    color={'white'}
                    size={32}
                    onPress={() => {
                        navigation.toggleDrawer()
                    }} 
                />
            </View>
            <View style={styles.headerItems}>
                <TouchableOpacity onPress={() => nav.navigate("Home")}>
                    <Text style={styles.homeText}>RENT A CAR</Text>
                </TouchableOpacity>
            </View>
            <View>

            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#0782F9',
        height: 120,
        justifyContent: 'space-between',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginTop: 25
    },
    headerItems: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 40
    },
    homeText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 25,
    }
})
