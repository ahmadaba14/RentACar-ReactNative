import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, Alert, ScrollView, TouchableOpacity, Modal, Pressable, Dimensions } from 'react-native'
import { TextInput } from 'react-native-paper'
import HomeHeader from '../components/HomeHeader'
import Constants from 'expo-constants'
import uuid from 'react-native-uuid'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase/compat/app';
import 'firebase/storage';
import { auth, uploadPhotoAsync} from '../firebase';
import client from '../api/client'
import * as Location from 'expo-location';
import DropDownPicker from 'react-native-dropdown-picker'
import cars from '../consts/cars.json'
import CascadePicker from 'rn-cascade-picker'
import { Button } from 'react-native-elements'
import templateImage from '../images/camera-icon-21.png'

const AddCar = ({navigation}) => {
    const [carMake, setCarMake] = useState('')
    const [carModel, setCarModel] = useState('')
    const [carVersion, setCarVersion] = useState('')
    const [modelYear, setModelYear] = useState(0)
    const [carPrice, setCarPrice] = useState(0)
    const [transmissionType, setTransmissionType] = useState('')
    const [engineType, setEngineType] = useState('')
    const [engineCapacity, setEngineCapacity] = useState('')
    const [mileage, setMileage] = useState(0)
    const [carType, setCarType] = useState('')

    const [image, setImage] = useState('')

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
        if (carMake === '' || carModel === '' || carVersion === '' || modelYear === 0 || carPrice === 0 || engineType === '' || engineCapacity === '' || transmissionType === '' || carType === '' || mileage === '') {
            alert('Please fill all the fields')
            return;
        }

        const location = await getCurrentLocation();
        const currentPosition = ({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
        })
        console.log(currentPosition)

        navigation.navigate('Map', {
            data: {
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
                currentPosition: currentPosition,
            }
        })

        setCarMake('');
        setCarModel('');
        setModelYear(0);
        setCarVersion('');
        setCarType('');
        setCarPrice(0);
        setTransmissionType('');
        setEngineType('');
        setEngineCapacity('');
        setMileage('');
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
                                source={image === '' ? require('../images/camera-icon-21.png') : {uri: image}}
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

export default AddCar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 30,
        color: '#0782F9',
    },
    inputContainer: {
        width: '80%',
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
