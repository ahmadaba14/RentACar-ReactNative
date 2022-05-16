import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Dimensions, StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import BookHeader from '../components/BookHeader'
import { auth, createBookingDocument, getCarImageByID, getCarNameByID } from '../firebase'

const BookCar = ({route}) => {
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();
    const details = route.params.data;

    const [pickupDate, setPickupDate] = useState(new Date());
    const [pickupShow, setPickupShow] = useState(false)
    const [pickupMode, setPickupMode] = useState('date')
    const [returnDate, setReturnDate] = useState(new Date());
    const [returnShow, setReturnShow] = useState(false)
    const [returnMode, setReturnMode] = useState('date')
    const [totalRent, setTotalRent] = useState(details.rentRate);
    const [totalDays, setTotalDays] = useState(0);
    const [userid, setUserid] = useState('');
    const [show, setShow] = useState(false)

    useEffect(() => {
        setTotalRent((totalDays + 1) * details.rentRate);
    }, [totalDays]);

    const showPickupDatePicker = () => {
        setPickupMode('date'); 
        setPickupShow(true)
    }

    const showReturnDatePicker = () => {
        setReturnMode('date'); 
        setReturnShow(true)
    }

    const onChangePickupDate = (event, selectedDate) => {
        const currentDate = selectedDate || pickupDate;
        setPickupShow(Platform.OS === 'ios');
        setPickupDate(currentDate);
    }

    const onChangeReturnDate = (event, selectedDate) => {
        setTotalRent(details.rentRate);
        const currentDate = selectedDate || returnDate;
        setReturnShow(Platform.OS === 'ios');
        setReturnDate(currentDate);

        setTotalDays(Math.ceil((currentDate - pickupDate) / (1000 * 60 * 60 * 24)));
    }

    const addBooking = async () => {
        try {
            auth.onAuthStateChanged(async user => {
                if (user) {
                    const uid = user.uid;
                    setUserid(uid);
                    const carId = details.carId;

                    var tempName = '';
                    await getCarNameByID(carId)
                        .then((cname) => {
                            tempName = cname;
                        })
                    console.log('Name:', tempName)

                    var tempImg = '';
                    await getCarImageByID(carId)
                        .then((cimg) => {
                            tempImg = cimg
                        })
                    console.log('IMG: ', tempImg);
                    console.log('ID', carId);

                    const booking = {
                        carId: carId,
                        userID: uid,
                        bookedTimeSlots: {
                            from: pickupDate.toDateString(),
                            to: returnDate.toDateString()
                        },
                        totalAmount: totalRent,
                        totalDays: totalDays,
                        carName: tempName,
                        carImage: tempImg
                    }
                    createBookingDocument(booking);

                    console.log('Car booked successfully from ', booking.bookedTimeSlots.from, ' to ', booking.bookedTimeSlots.to);
                }
            })
        }catch(error){
            alert(error.message);
        }
    }

    const handleBookNow = () => {
        addBooking();
        navigation.navigate("BottomNav", {
            screen: 'UserBookings'
        });
    }

    return (
        <View style={styles.container}>
            <BookHeader 
                navigation={navigation} 
                width={screenWidth} 
                route={details}
            />
            <ScrollView>
                <KeyboardAvoidingView style={styles.formContainer} behavior='padding'>
                    <View style={styles.inputContainer}>
                        {Platform.OS === 'ios' && (
                            <View>
                                <Text style={styles.headerText}>Pick Up Date</Text>
                                <DateTimePicker
                                    style={{marginBottom: 20}}
                                    value={pickupDate}
                                    onChange={onChangePickupDate}
                                    minimumDate={new Date()}
                                />
                                <Text style={styles.headerText}>Return Date</Text>
                                <DateTimePicker
                                    style={{marginBottom: 20}}
                                    value={returnDate}
                                    onChange={onChangeReturnDate}
                                    minimumDate={pickupDate}
                                />
                            </View>
                        )}
                        {Platform.OS === 'android' && (
                            <View>
                                <View style={styles.dobContainer}>
                                    <Text style={styles.dobText}>Pick Up Date</Text>
                                    <TouchableOpacity style={styles.dobButton} onPress={showPickupDatePicker}>
                                        <Text>{pickupDate.toDateString()}</Text>
                                        {pickupShow && (
                                            <DateTimePicker
                                                display='default'
                                                mode={pickupMode}
                                                value={pickupDate}
                                                onChange={onChangePickupDate}
                                                minimumDate={new Date()}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.dobContainer}>
                                    <Text style={styles.dobText}>Return Date</Text>
                                    <TouchableOpacity style={styles.dobButton} onPress={showReturnDatePicker}>
                                        <Text>{returnDate.toDateString()}</Text>
                                        {returnShow && (
                                            <DateTimePicker
                                                display='default'
                                                mode={returnMode}
                                                value={returnDate}
                                                onChange={onChangeReturnDate}
                                                minimumDate={pickupDate}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        <Text style={styles.totalRentText}>Total Rent: Rs. {totalRent}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleBookNow}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Book Car</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default BookCar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText:{
        fontWeight: '600',
        fontSize: 20,
        color: '#0782F9',
    },
    dobText: {
        marginTop: 15,
        marginRight: 30,
        fontWeight: '400',
        fontSize: 20,
        color: '#0782F9'
    },
    dobContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    dobButton: {
        borderWidth: 2, 
        borderColor: '#0782F9',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 15
    },
    totalRentText: {
        fontWeight: '800',
        fontSize: 25,
        color: '#0782F9',
        marginVertical: 20
    },
    inputContainer: {
        width: '80%',
        marginTop: 50,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#0782F9',
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
