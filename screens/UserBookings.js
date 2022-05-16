import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import client from '../api/client';
import BookingCard from '../components/BookingCard';
import HomeHeader from '../components/HomeHeader';
import { auth, readBookingDocuments } from '../firebase';

const UserBookings = (navigation) => {
    const width = Dimensions.get('window').width -20;

    const [bookingsData, setBookingsData] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if (user) {
                const uid = user.uid;
                var tempList = [];
                await client.get('/bookings/')
                    .then(response => {
                        response.data.forEach(booking => {
                            if (booking.renter === uid) {
                                tempList.push(booking);
                            }
                        });
                    });
                setBookingsData(tempList)
            }
        })
    }, []);

    return (
        <View style={{flex: 1}}>
            <HomeHeader navigation={navigation} />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>My Bookings</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator= {false}
                    contentContainerStyle={{
                        marginTop: 10,
                        paddingBottom: 50,
                    }}
                    data={bookingsData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <BookingCard
                            userId={item.renter}
                            carId={item.car}
                            from={item.from}
                            to={item.to}
                            totalAmount={item.totalAmount}
                            totalDays={item.totalHours}
                            cardWidth={width}
                            carName={item.carName}
                            carImage={item.carPicture}
                        />
                    )}
                />
            </View>
        </View>
    )
}

export default UserBookings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        marginLeft: 10,
        marginTop: 10,
    }, 
    headerText: {
        fontWeight: '500',
        fontSize: 25,
        color: '#0782F9'
    },
})
