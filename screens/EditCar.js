import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, Alert, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { TextInput } from 'react-native-paper'
import HomeHeader from '../components/HomeHeader'
import Constants from 'expo-constants'
import uuid from 'react-native-uuid'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase/compat/app';
import 'firebase/storage';
import {uploadPhotoAsync} from '../firebase';
import EditCarHeader from '../components/EditCarHeader'
import { useNavigation } from '@react-navigation/native'
import client from '../api/client'
import * as Location from 'expo-location';
import cars from '../consts/cars.json'
import CascadePicker from 'rn-cascade-picker'

const EditCar = ({route}) => {
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();
    const details = route.params.data;

    const [carMake, setCarMake] = useState(details.carMake)
    const [carModel, setCarModel] = useState(details.carModel)
    const [carVersion, setCarVersion] = useState(details.carVersion)
    const [modelYear, setModelYear] = useState(details.modelYear)
    const [carPrice, setCarPrice] = useState(details.carPrice)
    const [transmissionType, setTransmissionType] = useState(details.transmissionType)
    const [engineCapacity, setEngineCapacity] = useState(details.engineCapacity)
    const [engineType, setEngineType] = useState(details.engineType)
    const [mileage, setMileage] = useState(details.mileage)
    const [carType, setCarType] = useState(details.carType)
    const [pickupCity, setPickupCity] = useState(details.pickupCity)
    const [location, setLocation] = useState(details.location)
    const [rentRate, setRentRate] = useState(details.rentRate)

    const [image, setImage] = useState(details.image)

    // const [remoteUri, setRemoteUri] = useState(details.image)

    var count = 0;

    const carData = cars.map((make) => {
        count = count + 1;
        return {
            value: (count).toString(),
            label: make.key,
            children: make.values.map((model) => {
                count = count + 1;
                return {
                    value: (count).toString(),
                    label: model.key,
                    children: model.values.map((version) => {
                        count = count + 1;
                        return {
                            value: (count).toString(),
                            label: version.key,
                            children: version.values.map((year) => {
                                count = count + 1;
                                return {
                                    value: (count).toString(),
                                    label: year.key,
                                    children: year.values.map((car) => {
                                        return {
                                            Key: car.Key,
                                            Make: car.Make,
                                            Model: car.Model,
                                            Version: car.Version,
                                            Price: car.Price,
                                            Year: car.Year,
                                            EngineType: car.EngineType,
                                            EngineCapacity: car.EngineCapacity,
                                            Transmission: car.Transmission,
                                            BodyType: car.BodyType
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    const [pickerVisible, setPickerVisible] = useState(false)

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
                aspect: [16, 9]
            });
    
            if (!result.cancelled){
                setImage(result.uri);
            }
        }
    }

    // var tempImg = '';

    const getCarDetails = (val) => {
        carData.find(item => item.value === val[0]).children.find(item => item.value === val[1]).children.find(item => item.value === val[2]).children.find(item => item.value === val[3]).children.map(item => {
            setCarMake(item.Make)
            setCarModel(item.Model)
            setCarVersion(item.Version)
            setCarPrice(item.Price)
            setModelYear(item.Year)
            setEngineType(item.EngineType)
            setEngineCapacity(item.EngineCapacity)
            setTransmissionType(item.Transmission)
            setCarType(item.BodyType)
        })
        console.log(carMake, '', carModel, '', carVersion, '', modelYear, '', carPrice, '', engineType, '', engineCapacity, '', transmissionType, '', carType)
        setPickerVisible(false)
    }

    // const editCar = async () => {
    //     try {
    //             const imageId = uuid.v4();
    //             await uploadPhotoAsync(image, `cars/${imageId}`)
    //                 .then((downloadUrl) => {
    //                     tempImg = downloadUrl;
    //                 })

    //             const carId = details.carId;

    //             const car = {
    //                 name: carName,
    //                 model: carModel,
    //                 modelYear: modelYear,
    //                 transmissionType: transmissionType,
    //                 capacity: engineCapacity,
    //                 seats: seatingCapacity,
    //                 mileage: mileage,
    //                 pickupCity: pickupCity,
    //                 rate: rentRate,
    //                 image: tempImg,
    //             }

    //             await client.put(`/cars/${carId}`, {
    //                 ...car,
    //             });
    //             console.log(car.carName, ' Updated Successfully ');
    //     }catch(error){
    //         alert(error.message);
    //     }
    // }

    const handleEditCar = async() => {
        if (carMake === '' || carModel === '' || carVersion === '' || modelYear === 0 || engineType === '' || engineCapacity === '' || transmissionType === '' || carType === '' || mileage === '') {
            alert('Please fill all the fields')
            return;
        }

        navigation.navigate('EditMap', {
            data: {
                carId: details.carId,
                carMake: carMake,
                carModel: carModel,
                modelYear: modelYear,
                carVersion: carVersion,
                carPrice: carPrice,
                carType: carType,
                transmissionType: transmissionType,
                engineType: engineType,
                engineCapacity: engineCapacity,
                mileage: mileage,
                image: image,
                currentPosition: location,
                damages: details.damages,
                rentRate: details.rentRate,
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
                    <TouchableOpacity
                        onPress={() => setPickerVisible(true)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Select Car</Text>
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        <TextInput
                            label='Car Make'
                            value={carMake}
                            onChangeText={text => setCarMake(text)}
                            style={styles.input}
                            underlineColor='#0782F9'
                            activeUnderlineColor='#0461ba'
                            disabled={true}
                        />
                        <TextInput
                            label='Car Model'
                            value={carModel}
                            onChangeText={text => setCarModel(text)}
                            style={styles.input}
                            underlineColor='#0782F9'
                            activeUnderlineColor='#0461ba'
                            disabled={true}
                        />
                        <TextInput
                            label='Model Version'
                            value={carVersion.toString()}
                            onChangeText={text => setCarMake(text)}
                            style={styles.input}
                            underlineColor='#0782F9'
                            activeUnderlineColor='#0461ba'
                            disabled={true}
                        />
                        <TextInput
                            label='Model Year'
                            value={modelYear === 0 ? '' : modelYear.toString()}
                            onChangeText={text => setModelYear(text)}
                            style={styles.input}
                            underlineColor='#0782F9'
                            activeUnderlineColor='#0461ba'
                            disabled={true}
                        />
                        <TextInput
                            label='Engine Type'
                            value={engineType}
                            onChangeText={text => setEngineType(text)}
                            style={styles.input}
                            underlineColor='#0782F9'
                            activeUnderlineColor='#0461ba'
                            disabled={true}
                        />
                        <TextInput
                            label='Engine Capacity'
                            value={engineCapacity}
                            onChangeText={text => setEngineCapacity(text)}
                            style={styles.input}
                            underlineColor='#0782F9'
                            activeUnderlineColor='#0461ba'
                            disabled={true}
                        />
                        <TextInput
                            label='Transmission Type'
                            value={transmissionType}
                            onChangeText={text => setTransmissionType(text)}
                            style={styles.input}
                            underlineColor='#0782F9'
                            activeUnderlineColor='#0461ba'
                            disabled={true}
                        />
                        <TextInput
                            label='Body Type'
                            value={carType}
                            onChangeText={text => setCarType(text)}
                            style={styles.input}
                            underlineColor='#0782F9'
                            activeUnderlineColor='#0461ba'
                            disabled={true}
                        />
                        <TextInput
                            label='Enter Mileage (km)'
                            value={mileage.toString()}
                            onChangeText={text => setMileage(text)}
                            style={styles.input}
                            underlineColor='#0782F9'
                            activeUnderlineColor='#0461ba'
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
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <CascadePicker
                visible={pickerVisible}
                data={carData}
                cols={4}
                title="Select Car"
                cancelText="cancel"
                confirmText = "confirm"
                value={['1', '2', '3', '4']}
                onCancel={() => setPickerVisible(false)}
                onConfirm={(val) => {getCarDetails(val)}}
            />
        </View>
    )
}

export default EditCar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 30,
        backgroundColor: 'white'
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
        marginTop: 5,
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
