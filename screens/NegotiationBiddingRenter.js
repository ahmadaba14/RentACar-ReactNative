import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import NegotiationRenterHeader from '../components/NegotiationRenterHeader';
import client from '../api/client';
import { auth } from '../firebase';
import uuid from 'react-native-uuid'

const NegotiationBiddingRenter = ({route}) => {
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();
    const details = route.params.data;

    const [bid, setBid] = useState(details.rentRate);

    const handleIncrement = () => {
        setBid(bid + 100);
    }

    const handleDecrement = () => {
        setBid(bid - 100);
    }

    const addNegotiation = async () => {
        try{
            auth.onAuthStateChanged(async user => {
                if(user){
                    const uid = user.uid;

                    const tempId = uuid.v4();
                    const negotiation = {
                        _id: tempId,
                        user: uid,
                        car: details.carId,
                        bid: bid,
                    }
                    await client.post('/negotiations/', {
                        ...negotiation,
                    });
                    console.log('Bid added successfully');
                }
            })
        }catch(error){
            alert(error.message);
        }
    }

    const handleSubmit = () => {
        addNegotiation();
        setTimeout(() => {
            navigation.push('NegotiationBiddingSuccess');
        }, 3000);
    }

    return (
        <View style={styles.container}>
            <NegotiationRenterHeader
                navigation={navigation}
                width={screenWidth}
                route={details}
            />
            <View style={styles.bodyContainer}>
                <TouchableOpacity 
                    style={styles.plusButton}
                    onPress={handleIncrement}
                    disabled={bid == details.rentRate}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.bidText}>Rs. {bid}</Text>
                <TouchableOpacity 
                    style={styles.minusButton}
                    onPress={handleDecrement}
                >
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                >
                    <Text style={styles.submitButtonText}>Submit Offer</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default NegotiationBiddingRenter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    bodyContainer: {
        marginVertical: 100,
        alignItems: 'center'
    },
    plusButton: {
        backgroundColor: '#20da0a',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    minusButton: {
        backgroundColor: '#d00d13',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold'
    },
    bidText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#0782F9',
        width: 300,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
})