import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors } from 'react-native-elements'

const BookingCard = ({
    userId,
    carId,
    from,
    to,
    totalAmount,
    totalDays,
    carName,
    carImage,
    cardWidth
}) => {
    
    return (
        <View style={[styles.cardView, {width: cardWidth}]}>
            <View style={[styles.imageContainer, {width: cardWidth /2 - 60}]}>
                <Image
                    style={styles.image}
                    source={{uri: carImage}} 
                />
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.carName}>{carName}</Text>
                <Text style={styles.amount}>Total Rent: Rs. {totalAmount}</Text>
                <Text style={styles.dates}>From {from} to</Text>
                <Text style={styles.dates}>{to}</Text>
            </View>
        </View>
    )
}

export default BookingCard;

const styles = StyleSheet.create({
    cardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 120,
        backgroundColor: '#F1F1F1',
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 20,
        padding: 5,
        borderWidth: 1,
        borderColor: colors.grey4
    },
    imageContainer: {
        
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    },
    dataContainer: {
        justifyContent: 'center',
        position: 'absolute',
        right: 40,
    },
    carName: {
        fontSize: 19,
        fontWeight: '600',
        marginTop: 10
    },
    amount: {
        fontSize: 17,
        fontWeight: '600',
        marginTop: 5
    },
    dates: {
        fontSize: 15,
        fontWeight: '300',
        color: colors.grey1,
        marginTop: 5,
    }
})
