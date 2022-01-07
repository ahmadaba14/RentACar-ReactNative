import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, Alert } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import HomeHeader from '../components/HomeHeader'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase/compat/app';
import 'firebase/storage';
import { auth, createCarDocument, firestore, uploadPhotoAsync} from '../firebase';

const AddCar = ({navigation}) => {
    const [carName, setCarName] = useState('')
    const [carModel, setCarModel] = useState('')
    const [modelYear, setModelYear] = useState('')
    const [transmissionType, setTransmissionType] = useState('')
    const [engineCapacity, setEngineCapacity] = useState('')
    const [seatingCapacity, setSeatingCapacity] = useState('')
    const [carType, setCarType] = useState('')
    const [pickupCity, setPickupCity] = useState('')
    const [rentRate, setRentRate] = useState('')

    const [image, setImage] = useState('')
    const [remoteUri, setRemoteUri] = useState('')

    const pickImage = async () => {
        if (Constants.platform.ios) {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status != "granted") {
                alert("We need permissions to access your camera roll")
            }
            else {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3]
                });
        
                if (!result.cancelled){
                    setImage(result.uri);
                }
            }
        }
    }

    const addCar = async () => {
        try {
            auth.onAuthStateChanged(user => {
                if (user) {
                    const uid = user.uid;
                    uploadPhotoAsync(image, `${uid}-${carName}`)
                        .then((downloadUrl) => {
                            console.log("Image Link available at ", downloadUrl)
                            setRemoteUri(downloadUrl);
                        })
                    const car = {
                        carName: carName,
                        carModel: carModel,
                        modelYear: modelYear,
                        transmissionType: transmissionType,
                        engineCapacity: engineCapacity,
                        seatingCapacity: seatingCapacity,
                        carType: carType,
                        pickupCity: pickupCity,
                        rentRate: rentRate,
                        image: remoteUri,
                        userRef: firestore.doc('users/' + uid)
                    }
                    createCarDocument(car);
                    console.log(car.carName, ' Added Successfully ');
                }
            })
        }catch(error){
            alert(error.message);
        }
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
                            placeholder='Enter Car Type'
                            value={carType}
                            onChangeText={text => setCarType(text)}
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
                            onPress={addCar}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Add Car</Text>
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
