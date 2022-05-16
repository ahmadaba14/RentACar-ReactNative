import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, Alert, Dimensions } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import HomeHeader from '../components/HomeHeader'
import Constants from 'expo-constants'
import uuid from 'react-native-uuid'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase/compat/app';
import 'firebase/storage';
import { auth, createCarDocument, firestore, getCarSingleDocument, getUserNameByID, updateCarDocument, uploadPhotoAsync} from '../firebase';
import EditCarHeader from '../components/EditCarHeader'
import { useNavigation } from '@react-navigation/native'

const EditCar = ({route}) => {
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();
    const details = route.params.data;

    const [carName, setCarName] = useState(details.carName)
    const [carModel, setCarModel] = useState(details.carModel)
    const [modelYear, setModelYear] = useState(details.modelYear)
    const [transmissionType, setTransmissionType] = useState(details.transmissionType)
    const [engineCapacity, setEngineCapacity] = useState(details.engineCapacity)
    const [seatingCapacity, setSeatingCapacity] = useState(details.seatingCapacity)
    const [carType, setCarType] = useState(details.carType)
    const [pickupCity, setPickupCity] = useState(details.pickupCity)
    const [rentRate, setRentRate] = useState(details.rentRate)

    const [image, setImage] = useState(details.image)
    const [remoteUri, setRemoteUri] = useState(details.image)

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

    var tempImg = '';

    const editCar = async () => {
        try {
                const imageId = uuid.v4();
                await uploadPhotoAsync(image, `cars/${imageId}`)
                    .then((downloadUrl) => {
                        tempImg = downloadUrl;
                    })

                const carId = details.carId;

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
                    image: tempImg,
                }

                await updateCarDocument(carId, car);
                console.log(car.carName, ' Updated Successfully ');
        }catch(error){
            alert(error.message);
        }
    }

    const handleEditCar = async() => {
        setRemoteUri(tempImg)
        await editCar();
        await navigation.push("CarDetailsOwner", {
            data: {
                carId: details.carId,
                carName: carName,
                rentRate: rentRate,
                carModel: carModel,
                modelYear: modelYear,
                transmissionType: transmissionType,
                engineCapacity: engineCapacity,
                seatingCapacity: seatingCapacity,
                carType: carType,
                renter: details.renter,
                renterId: details.renterId,
                pickupCity: pickupCity,
                image: remoteUri
            }
        })
    }

    return (
        <View style={{flex: 1}}>
            <EditCarHeader 
                navigation={navigation}
                width={screenWidth}
                route={details} 
            />
            <ScrollView>
                <KeyboardAvoidingView style={styles.container} behavior='padding'>
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
                            onPress={handleEditCar}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Edit Car</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default EditCar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 30
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
