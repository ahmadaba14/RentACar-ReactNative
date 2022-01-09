import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { colors } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import DetailsHeader from '../components/DetailsHeader';

const CarDetailsRenter = ({route}) => {
    const details = route.params.data;
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <DetailsHeader navigation={navigation} width={screenWidth}/>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image
                        style={[styles.image, {width: screenWidth}]}
                        source={{uri: details.image}}
                    />
                </View>
                <View style={styles.detailsGreyContainer}>
                    <Text style={styles.detailsHeaderText}>{details.carName}</Text>
                    <Text style={styles.detailsHeaderText}>Rs. {details.rentRate}/day</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Model</Text>
                        <Text style={styles.detailsBodyText}>{details.carModel}</Text>
                    </View>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Model Year</Text>
                        <Text style={styles.detailsBodyText}>{details.modelYear}</Text>
                    </View>
                </View>
                <View style={styles.detailsGreyContainer}>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Transmission</Text>
                        <Text style={styles.detailsBodyText}>{details.transmissionType}</Text>
                    </View>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Engine Capacity</Text>
                        <Text style={styles.detailsBodyText}>{details.engineCapacity}</Text>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Seating Capacity</Text>
                        <Text style={styles.detailsBodyText}>{details.seatingCapacity}</Text>
                    </View>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Car Type</Text>
                        <Text style={styles.detailsBodyText}>{details.carType}</Text>
                    </View>
                </View>
                <View style={styles.detailsGreyContainer}>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Renter Name</Text>
                        <Text style={styles.detailsBodyText}>{details.renter}</Text>
                    </View>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Pickup City</Text>
                        <Text style={styles.detailsBodyText}>{details.pickupCity}</Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate('BookCar', {
                    data: details
                })
            }}>
                <Text style={styles.buttonText}>Book Car</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CarDetailsRenter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    imageContainer: {
        height: 200
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
    detailsGreyContainer: {
        backgroundColor: colors.grey4,
        height: 80,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    detailsContainer: {
        height: 80,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    detailsHeaderText: {
        color: '#0782F9',
        fontWeight: '500',
        fontSize: 25,
        marginHorizontal: 30
    },
    detailsBodyTextContainer: {
        flexDirection: 'column', 
        alignItems: 'center', 
        width: 150
    },
    detailsBodyText: {
        color: colors.grey2,
        fontSize: 18,
    },
    button: {
        position: 'absolute',
        backgroundColor: '#0782F9',
        width: 150,
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        bottom: 60,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {height: -2},
        zIndex: 999
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20
    }
})
