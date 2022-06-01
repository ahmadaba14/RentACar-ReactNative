import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { colors } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import DetailsHeader from '../components/DetailsHeader';
import { deleteBookingDocuments, deleteCarDocument } from '../firebase';
import client from '../api/client';

const CarDetailsOwner = ({route}) => {
    const details = route.params.data;
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    const handleDelete = async () => {
        try {
            const carId = details.carId;
            Alert.alert(
                'Confirmation',
                `Are you sure you want to delete this car?`,
                [
                    {
                        text: 'Yes',
                        onPress: async () => {
                            await client.delete(`/cars/${carId}`);
                            await client.delete(`/bookings/${carId}`);
                            await deleteCarDocument(carId);
                            await deleteBookingDocuments(carId);
                            navigation.navigate('BottomNav');
                            console.log("Document Deleted Successfully");
                        }
                    },
                    {
                        text: 'No',
                        style: 'cancel'
                    }
                ]
            );
        }catch(error){
            alert(error.message);
        }
    }

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
                    <Text style={styles.detailsHeaderText}>{details.modelYear} {details.carMake} {details.carModel}</Text>
                    <Text style={styles.detailsHeaderText}>Rs. {details.rentRate}/day</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Version</Text>
                        <Text style={styles.detailsBodyText}>{details.carVersion}</Text>
                    </View>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Body Type</Text>
                        <Text style={styles.detailsBodyText}>{details.carType}</Text>
                    </View>
                </View>
                <View style={styles.detailsGreyContainer}>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Transmission</Text>
                        <Text style={styles.detailsBodyText}>{details.transmissionType}</Text>
                    </View>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Mileage</Text>
                        <Text style={styles.detailsBodyText}>{details.mileage} km</Text>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Engine Capacity</Text>
                        <Text style={styles.detailsBodyText}>{details.engineCapacity}</Text>
                    </View>
                    <View style={styles.detailsBodyTextContainer}>
                        <Text style={[styles.detailsBodyText, {fontWeight: '700'}]}>Engine Type</Text>
                        <Text style={styles.detailsBodyText}>{details.engineType}</Text>
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
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TouchableOpacity style={styles.editButton} onPress={() => {
                    navigation.navigate('EditCar', {
                        data: details
                    })
                }}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={handleDelete}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CarDetailsOwner

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
    editButton: {
        position: 'relative',
        backgroundColor: '#0782F9',
        width: 200,
        padding: 15,
        alignItems: 'center',
        marginRight: 25,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {height: -2},
        zIndex: 999
    },
    deleteButton: {
        position: 'relative',
        backgroundColor: '#0782F9',
        width: 200,
        padding: 15,
        alignItems: 'center',
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
