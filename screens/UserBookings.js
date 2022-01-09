import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import BookingCard from '../components/BookingCard';
import HomeHeader from '../components/HomeHeader';
import { auth, readBookingDocuments } from '../firebase';

const UserBookings = (navigation) => {
    const width = Dimensions.get('window').width -20;

    const [bookingsData, setBookingsData] = useState([]);

    auth.onAuthStateChanged(async user => {
        if (user) {
            const uid = user.uid;
            var tempList = [];
            await readBookingDocuments(uid)
                .then((bList) => {
                    tempList = bList
                })
            setBookingsData(tempList)
        }
    })

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
                            userId={item.userId}
                            carId={item.carId}
                            from={item.bookedTimeSlots.from}
                            to={item.bookedTimeSlots.to}
                            totalAmount={item.totalAmount}
                            totalDays={item.totalDays}
                            cardWidth={width}
                            carName={item.carName}
                            carImage={item.carImage}
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
