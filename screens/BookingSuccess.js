import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import client from '../api/client';
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';

const BookingSuccess = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Icon 
                name='check-circle'
                type='material-community'
                color={'#0782F9'}
                size={80}
            />
            <Text style={styles.headerText}>CAR BOOKED SUCCESSFULLY</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('BottomNav')
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Return to Homepage</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default BookingSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText:{
        fontWeight: '800',
        fontSize: 25,
        color: '#0782F9',
        textAlign: 'center',
    },
    header: {
        marginBottom: 50,
        justifyContent: 'center',
    },
    body: {
        flexDirection: 'column'
    },
    bodyText: {
        fontSize: 18
    },
    button: {
        backgroundColor: '#0782F9',
        width: 300,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
})