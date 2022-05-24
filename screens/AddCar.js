import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, Alert, ScrollView, TextInput, TouchableOpacity, Modal, Pressable, Dimensions } from 'react-native'
import HomeHeader from '../components/HomeHeader'
import Constants from 'expo-constants'
import uuid from 'react-native-uuid'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase/compat/app';
import 'firebase/storage';
import { auth, uploadPhotoAsync} from '../firebase';
import client from '../api/client'
import * as Location from 'expo-location';

const AddCar = ({navigation}) => {
    const [carName, setCarName] = useState('')
    const [carModel, setCarModel] = useState('')
    const [modelYear, setModelYear] = useState('')
    const [transmissionType, setTransmissionType] = useState('')
    const [engineCapacity, setEngineCapacity] = useState('')
    const [seatingCapacity, setSeatingCapacity] = useState('')
    const [mileage, setMileage] = useState('')
    const [pickupCity, setPickupCity] = useState('')
    const [rentRate, setRentRate] = useState('')

    const [image, setImage] = useState('')

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status != "granted") {
            alert("We need permissions to access your camera roll")
        }
        else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.6,
                aspect: [4, 3]
            });
    
            if (!result.cancelled){
                setImage(result.uri);
            }
        }
    }

    const getCurrentLocation = async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location)
        return location;
    };

    const handleAddCar = async() => {
        if (carName === '' || carModel === '' || modelYear === '' || transmissionType === '' || engineCapacity === '' || seatingCapacity === '' || mileage === '' || pickupCity === '' || rentRate === '' || image === ''){
            alert('Please fill all the fields')
            return;
        }

        const location = await getCurrentLocation();
        const currentPosition = ({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
        console.log(currentPosition)

        navigation.navigate('Map', {
            data: {
                carName: carName,
                rentRate: rentRate,
                carModel: carModel,
                modelYear: modelYear,
                transmissionType: transmissionType,
                engineCapacity: engineCapacity,
                seatingCapacity: seatingCapacity,
                mileage: mileage,
                pickupCity: pickupCity,
                image: image,
                currentPosition: currentPosition,
            }
        })

        setCarName('');
        setCarModel('');
        setModelYear('');
        setTransmissionType('');
        setEngineCapacity('');
        setSeatingCapacity('');
        setMileage('');
        setPickupCity('');
        setRentRate('');
        setImage('');

    }

    return (
        <View style={{flex: 1}}>
            <HomeHeader navigation={navigation} />
            <ScrollView>
                <KeyboardAvoidingView style={styles.container} behavior='padding'>
                    <View style={{marginTop: 20}}>
                        <Text style={styles.headerText}>ADD A CAR</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter Car Name'
                            value={carName}
                            onChangeText={text => setCarName(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Enter Car Model'
                            value={carModel}
                            onChangeText={text => setCarModel(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Enter Model Year'
                            keyboardType='numeric'
                            value={modelYear}
                            onChangeText={text => setModelYear(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Enter Transmission Type'
                            value={transmissionType}
                            onChangeText={text => setTransmissionType(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Enter Engine Capacity'
                            keyboardType='numeric'
                            value={engineCapacity}
                            onChangeText={text => setEngineCapacity(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Enter Seating Capacity'
                            keyboardType='numeric'
                            value={seatingCapacity}
                            onChangeText={text => setSeatingCapacity(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Enter Mileage'
                            keyboardType='numeric'
                            value={mileage}
                            onChangeText={text => setMileage(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Enter Pickup City'
                            value={pickupCity}
                            onChangeText={text => setPickupCity(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Enter Rent Rate'
                            keyboardType='numeric'
                            value={rentRate}
                            onChangeText={text => setRentRate(text)}
                            style={styles.input}
                        />
                        <View style={styles.imageContainer}>
                            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                                <Text style={styles.imageButtonText}>Choose Picture</Text>
                            </TouchableOpacity>
                            <Image
                                source={{
                                    uri: image
                                }}
                                style={styles.image} 
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleAddCar}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default AddCar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerText:{
        fontWeight: '800',
        fontSize: 30,
        color: '#0782F9'
    },
    inputContainer: {
        width: '80%'
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
    imageButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#0782F9'
    },
    button: {
        backgroundColor: '#0782F9',
        width: 300,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15
    },
    imageButtonText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    imageContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        marginTop: 20
    },
    image: {
        width: 130, 
        height: 130, 
        borderWidth: 2, 
        borderColor: '#0782F9',
        borderRadius: 5,
        resizeMode: 'contain'
    },
})
