import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { colors } from 'react-native-elements'

const CarCard = ({
    onPressCarCard,
    carName,
    rentRate,
    carModel,
    modelYear,
    transmissionType,
    engineCapacity,
    seatingCapacity,
    carType,
    renter,
    pickupCity,
    image,
    cardWidth
}) => {
    return (
        <TouchableOpacity>
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
        resizeMode: 'contain'
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
