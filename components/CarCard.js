import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { colors } from 'react-native-elements'
import { auth } from '../firebase'

const CarCard = ({
    carId,
    cardWidth,
    image,
    carMake,
    rentRate,
    pickupCity,
    location,
    carModel,
    carVersion,
    modelYear,
    carType,
    damages,
    transmissionType,
    engineCapacity,
    engineType,
    mileage,
    carPrice,
    renter,
    renterId
}) => {
    const navigation = useNavigation();
    const [carsData, setcarsData] = useState({
        carId: carId,
        image: image,
        carMake: carMake,
        rentRate: rentRate,
        pickupCity: pickupCity,
        location: location,
        carModel: carModel,
        carVersion: carVersion,
        modelYear: modelYear,
        carType: carType,
        damages: damages,
        transmissionType: transmissionType,
        engineCapacity: engineCapacity,
        engineType: engineType,
        mileage: mileage,
        carPrice: carPrice,
        renter: renter,
        renterId: renterId
    })

    const handlePress = async() => {
        try {
            auth.onAuthStateChanged(user => {
                if (user) {
                    const uid = user.uid;
                    if (uid==renterId){
                        navigation.push('CarDetailsOwner', {
                            data: carsData
                        })
                    } else {
                        navigation.push('CarDetailsRenter', {
                            data: carsData
                        })
                    }
                }
            })
        }catch(error){
            alert(error.message);
        }
    }
    
    return (
        <TouchableOpacity 
            onPress={handlePress}
        >
            <View style={[styles.cardView, {width: cardWidth}]}>
                <Image
                    style={styles.image}
                    source={{uri: image}} 
                />
                <View>
                    <Text style={styles.carName}>{modelYear} {carMake} {carModel}</Text>
                    <Text style={styles.rentRate}>Rs. {rentRate}/day</Text>
                    <Text style={styles.pickupCity}>{pickupCity}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CarCard;

const styles = StyleSheet.create({
    cardView: {
        height: 225,
        backgroundColor: '#F1F1F1',
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 20,
        padding: 5,
        borderWidth: 1,
        borderColor: colors.grey4
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
    carName: {
        fontSize: 19,
        fontWeight: '600',
        marginTop: 10
    },
    rentRate: {
        fontSize: 19,
        fontWeight: '600',
        marginTop: 5
    },
    pickupCity: {
        fontSize: 15,
        fontWeight: '300',
        marginTop: 15,
        color: colors.grey1,
        textAlign: 'right'
    }
})
