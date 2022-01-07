import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { withBadge } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'

const HomeHeader = ({navigation}) => {
    const nav = useNavigation();
    const BadgeIcon = withBadge(0)(Icon);
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
            <View style={[styles.headerItems, {marginTop: 20, marginRight: 15}]}>
                <BadgeIcon
                    type="material-community"
                    name="bell"
                    size={30}
                    color={'white'} 
                />
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
        borderRadius: 20
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginTop: 25
    },
    headerItems: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    homeText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 25,
    }
})
