import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Dimensions, StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import { RadioButton } from 'react-native-paper'
import BookHeader from '../components/BookHeader'
import { auth, createBookingDocument, getCarImageByID, getCarNameByID } from '../firebase'
import client from '../api/client'
import uuid from 'react-native-uuid'
import { CardField, useConfirmPayment, StripeProvider } from '@stripe/stripe-react-native'

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
    
    const [checked, setChecked] = useState('first')
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment } = useConfirmPayment();
    const [paid, setPaid] = useState(false);
    const [completed, setCompleted] = useState(false);

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

    const fetchPaymentIntentClientSecret = async (email) => {
        let clientSecret = {};

        await client.post('/cards/', {
            amount: totalRent,
            email: email
        }).then(res => {
            clientSecret = res.data.clientSecret;
        })
        console.log(clientSecret);
        return clientSecret;
    }

    const addBooking = async () => {
        try {
            auth.onAuthStateChanged(async user => {
                if (user) {
                    const uid = user.uid;
                    const email = user.email;
                    setUserid(uid);
                    const carId = details.carId;

                    const bookingID = uuid.v4();

                    if (checked === 'second') {
                        if (!cardDetails?.complete || !email) {
                            alert('Please enter your card details');
                            setCompleted(false);
                            return;
                        }
                        const billingDetails = {
                            email: email
                        }
                        try {
                            const clientSecret= await fetchPaymentIntentClientSecret(email);
                            console.log(clientSecret)
                            const paymentIntent = await confirmPayment(clientSecret, {
                                type: 'Card',
                                billingDetails: billingDetails
                            });
                            if (paymentIntent) {
                                console.log('Payment Confirmed ', paymentIntent);
                            }
                            setPaid(true);
                        } catch (error) {
                            alert('Payment failed');
                            console.log(error);
                            return 'failed';
                        }
                    }

                    const booking = {
                        _id: bookingID,
                        car: carId,
                        carName: details.carName,
                        carPicture: details.image,
                        renter: uid,
                        from: pickupDate.toDateString(),
                        to: returnDate.toDateString(),
                        totalAmount: totalRent,
                        totalHours: totalDays,
                        isPaid: paid,
                    }
                    await client.post('/bookings/', {
                        ...booking,
                    });

                    console.log('Car booked successfully from ', booking.from, ' to ', booking.to);
                    setCompleted(true);
                    alert('Car booked successfully');
                }
            })
        }catch(error){
            alert(error.message);
        }
    }

    const handleBookNow = async () => {
        await addBooking();
        if (completed) {
            navigation.navigate("BottomNav", {
                screen: 'UserBookings'
            });
        }
    }

    return (
        <StripeProvider publishableKey='pk_test_51KBWcUEWNDui5E0sMhm5d80K32UAqOlxHehUHAY6A0X4nmjGejUL0iAAax8GrPchUyZz4WzLJvPzuclefYHJ1PdX00MyLPq8TJ'>
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
                        <View>
                            <View style={styles.radioContainer}>
                                <RadioButton
                                    value='first'
                                    status={checked === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('first')} 
                                />
                                <Text style={styles.radioText}>Pay Via Cash</Text>
                            </View>
                            <View style={styles.radioContainer}>
                                <RadioButton
                                    value='second'
                                    status={checked === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('second')} 
                                />
                                <Text style={styles.radioText}>Pay Via Card</Text>
                            </View>
                        </View>
                        {checked === 'second' && (
                            <CardField
                                postalCodeEnabled={false}
                                placeholder={{
                                    number: '4242 4242 4242 4242'
                                }}
                                cardStyle={styles.cardStyle}
                                style={styles.cardContainer}
                                onCardChange={card => {
                                    setCardDetails(card);
                                }}
                            />
                        )}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={handleBookNow}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Book Car</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('NegotiationBiddingRenter', {
                                        data: details
                                    });
                                }}
                                style={styles.negotiateButton}
                            >
                                <Text style={styles.buttonText}>Negotiate</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </StripeProvider>
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
    negotiateButton: {
        backgroundColor: '#20da0a',
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
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 15
    },
    radioText: {
        fontWeight: '400',
        fontSize: 20,
        color: '#0782F9',
    },
    card: {
        backgroundColor: '#0782F9',
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
        marginHorizontal: 20,
        width: '90%',
    }
})
