import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'

const EditCarHeader = ({navigation, width, route}) => {

    return (
        <View style={[styles.header, {width: width}]}>
            <View style={styles.icon}>
                <Icon
                    type='material-community'
                    name='arrow-left'
                    color={'white'}
                    size={32}
                    onPress={() => {
                        navigation.navigate('CarDetailsOwner', {
                            data: route
                        })
                    }} 
                />
            </View>
            <View style={styles.headerItems}>
                <Text style={styles.homeText}>EDIT CAR</Text>
            </View>
            <View>
                
            </View>
        </View>
    )
}

export default EditCarHeader

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#0782F9',
        height: 120,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {height: 10},
        zIndex: 999
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
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
        marginRight: 50,
    }
})
