import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { colors } from 'react-native-elements'
import { auth } from '../firebase'

const CarCard = ({
    carId,
    carName,
    rentRate,
    carModel,
    modelYear,
    transmissionType,
    engineCapacity,
    seatingCapacity,
    carType,
    renter,
    renterId,
    pickupCity,
    image,
    cardWidth
}) => {
    const navigation = useNavigation();
    const [carsData, setcarsData] = useState({
        carId: carId,
        carName: carName,
        rentRate: rentRate,
        carModel: carModel,
        modelYear: modelYear,
        transmissionType: transmissionType,
        engineCapacity: engineCapacity,
        seatingCapacity: seatingCapacity,
        carType: carType,
        renter: renter,
        renterId: renterId,
        pickupCity: pickupCity,
        image: image,
    })

    const handlePress = async() => {
        try {
            auth.onAuthStateChanged(user => {
                if (user) {
                    const uid = user.uid;
                    if (uid==renterId){
                        navigation.navigate('CarDetailsOwner', {
                            data: carsData
                        })
                    } else {
                        navigation.navigate('CarDetailsRenter', {
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
                    <Text style={styles.carName}>{carName}</Text>
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
