import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Dimensions, StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import { RadioButton } from 'react-native-paper'
import BookHeader from '../components/BookHeader'
import { auth , uploadPhotoAsync} from '../firebase'
import client from '../api/client'
import uuid from 'react-native-uuid'
import { CardField, useConfirmPayment, StripeProvider } from '@stripe/stripe-react-native'
import * as Print from 'expo-print'

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
    
    const [checked, setChecked] = useState('first')
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment } = useConfirmPayment();
    const [paid, setPaid] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [agreementLink, setAgreementLink] = useState('');

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

    var username = '';

    var html = `
        <html>

            <head>
                <meta http-equiv=Content-Type content="text/html; charset=windows-1252">
                <meta name=Generator content="Microsoft Word 15 (filtered)">
                <style>
                    <!--
                    /* Font Definitions */
                    @font-face
                    {font-family:"Cambria Math";
                    panose-1:2 4 5 3 5 4 6 3 2 4;}
                    @font-face
                        {font-family:"Abadi MT Condensed";}
                    /* Style Definitions */
                    p.MsoNormal, li.MsoNormal, div.MsoNormal
                        {margin-top:0cm;
                        margin-right:0cm;
                        margin-bottom:8.0pt;
                        margin-left:0cm;
                        line-height:107%;
                        font-size:11.0pt;
                        font-family:"Calibri",sans-serif;}
                    .MsoChpDefault
                        {font-family:"Calibri",sans-serif;}
                    .MsoPapDefault
                        {margin-bottom:8.0pt;
                        line-height:107%;}
                    @page WordSection1
                        {size:612.0pt 792.0pt;
                        margin:86.4pt 72.0pt 72.0pt 108.0pt;}
                    div.WordSection1
                        {page:WordSection1;}
                -->
                </style>
            </head>

            <body lang=en-PK style='word-wrap:break-word'>

                <div class=WordSection1>

                    <div style='border:none;border-bottom:solid windowtext 1.0pt;padding:0cm 0cm 1.0pt 0cm; background:white'>

                        <p class=MsoNormal align=center style='margin-top:12.0pt;text-align:center;
                        line-height:normal;background:white;border:none;padding:0cm'><b><span
                        lang=EN-US style='font-size:18.0pt;font-family:"Abadi MT Condensed",sans-serif;
                        color:black'>Car Rental Agreement</span></b></p>

                    </div>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>This
                    car rental agreement is made between ${username} (hereafter referred to as
                    &quot;the renter&quot; and ${details.renter} (hereafter referred to as &quot;the
                    owner&quot;).</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>The
                    owner formally agrees to lease the following vehicle to the owner with the following
                    specification:</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>Car
                    Make: ${details.carMake}</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>Car
                    Model: ${details.carModel}</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>Year:
                    ${details.modelYear}</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>Car
                    Mileage: ${details.mileage}</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>The
                    renter will rent the car from ${pickupDate.toDateString()} to ${returnDate.toDateString()}. The renter agrees to pay a fee of
                    Rs. ${totalRent}</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>The
                    Renter agrees not to use the vehicle for any illegal purposes. They further
                    agree to abide by all stipulated federal and state regulations guiding the use
                    and operation of the hired vehicle.</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>The
                    Renter agrees to indemnify and release the Owner for any damages, injuries,
                    property loss, or death caused while the Renter operates this vehicle.&nbsp;</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>The
                    Renter is responsible for any damages that may be incurred during the rental
                    period. The Owner attests that the vehicle is in good working condition and has
                    no operational faults.&nbsp;</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>______________________________________</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>(Renter
                    Signature)</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>______________________________________</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>(Owner
                    Signature)</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>_________________________________________</span></p>

                    <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
                    0cm;margin-left:0cm;line-height:normal;background:white'><span lang=EN-US
                    style='font-size:13.0pt;font-family:"Abadi MT Condensed",sans-serif;color:#292B2C'>(Date)</span></p>

                </div>

            </body>

        </html>
        `;

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
                    const carId = details.carId;

                    const bookingID = uuid.v4();

                    await client.get('/users/' + uid).then(res => {
                        username = (res.data.user.name);
                    })
                    console.log(username);
                    
                    var uri = '';
                    // let finalHtml = html.replace(/{username}/g, username);
                    await Print.printToFileAsync({ html }).then(res => {
                        uri = res.uri;
                    })
                    const agreementId = uuid.v4();
                    var tempAgreement = ''
                    await uploadPhotoAsync(uri,`agreements/${agreementId}`)
                        .then((downloadUrl) => {
                            tempAgreement = downloadUrl;
                        })
                    console.log(tempAgreement);

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
                        carMake: details.carMake,
                        carModel: details.carModel,
                        carModelYear: details.modelYear,
                        carPicture: details.image,
                        renter: uid,
                        from: pickupDate.toDateString(),
                        to: returnDate.toDateString(),
                        totalAmount: totalRent,
                        totalHours: totalDays,
                        isPaid: paid,
                        agreement: tempAgreement,
                    }
                    await client.post('/bookings/', {
                        ...booking,
                    })
                    console.log('Booking Added');
                    navigation.navigate("BookingSuccess");
                }
            })
        }catch(error){
            alert(error.message);
        }
    }

    const handleBookNow = async () => {
        await addBooking();
        navigation.navigate("BookingSuccess");
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
                                onPress={addBooking}
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
