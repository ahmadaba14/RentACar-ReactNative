import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import MapHeader from '../components/MapHeader';
import marker from '../assets/icons8-marker.png';
import { auth, uploadPhotoAsync} from '../firebase';
import uuid from 'react-native-uuid'
import client from '../api/client'
import { async } from '@firebase/util';


const Map = ({route}) => {
    const details = route.params.data;
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    const [position, setPosition] = useState(details.currentPosition);

    const [userId, setUserId] = useState('');
    const [remoteUri, setRemoteUri] = useState('');
    const [username, setUsername] = useState('')
    const [carId, setCarId] = useState('')

    // const addCar = async () => {
    //     try {
    //         auth.onAuthStateChanged(async user => {
    //             if (user) {
    //                 const uid = user.uid;
    //                 setUserId(uid);
    //                 const imageId = uuid.v4();
    //                 var tempImg = '';
    //                 const image = details.image;
    //                 await uploadPhotoAsync(image, `cars/${imageId}`)
    //                     .then((downloadUrl) => {
    //                         tempImg = downloadUrl;
    //                     })
    //                 setRemoteUri(tempImg);

    //                 const res = await client.get(`/users/${uid}`);
    //                 setUsername(res.data.name);

    //                 const tempCarId = uuid.v4();
    //                 setCarId(tempCarId);

    //                 const car = {
    //                     _id: carId,
    //                     owner: uid,
    //                     ownerName: username,
    //                     name: details.carName,
    //                     model: details.carModel,
    //                     modelYear: details.modelYear,
    //                     mileage: details.mileage,
    //                     transmissionType: details.transmissionType,
    //                     capacity: details.engineCapacity,
    //                     seats: details.seatingCapacity,
    //                     pickupCity: details.pickupCity,
    //                     location: position,
    //                     rate: details.rentRate,
    //                     picture: remoteUri,
    //                 }

    //                 await client.post('/cars', {
    //                     ...car,
    //                 });
    //                 console.log(car.name, ' Added Successfully ');
    //             }
    //         })
    //     }catch(error){
    //         alert(error.message);
    //     }
    // }

    const getCityName = async(location) => {
        let result = await Location.reverseGeocodeAsync(location)
        return result[0].city
    }

    const handleAddLocation = async () => {
        const pickupCity = await getCityName(position);
        console.log(pickupCity)

        navigation.navigate('DamageControlForm', {
            data: {
                carMake: details.carMake,
                carModel: details.carModel,
                modelYear: details.modelYear,
                carVersion: details.carVersion,
                carPrice: details.carPrice,
                carType: details.carType,
                transmissionType: details.transmissionType,
                engineType: details.engineType,
                engineCapacity: details.engineCapacity,
                mileage: details.mileage,
                image: details.image,
                currentPosition: position,
                pickupCity: pickupCity,
            }
        })
    }
    
  return (
    <View style={styles.container}>
        <MapHeader navigation={navigation} width={screenWidth} route={details}/>
        <MapView
            provider={PROVIDER_GOOGLE} 
            style={styles.map} 
            region={position}
            onRegionChangeComplete={(region) => {
                setPosition(region);
            }}
        >
            <MapView.Marker
                draggable
                title={'Your Pickup Location'}
                coordinate={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                }}
            />
        </MapView>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleAddLocation}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Add Location</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    marker: {
        height: 48,
        width: 48
    },
    buttonContainer: {
        position: 'absolute',
        top: '85%',
        left: '32%',
        alignSelf: 'flex-end',
    },
    button: {
        backgroundColor: '#0782F9',
        width: 150,
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