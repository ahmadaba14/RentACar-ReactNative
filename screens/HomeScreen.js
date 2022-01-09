import React, { useState } from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import CarCard from '../components/CarCard'
import HomeHeader from '../components/HomeHeader'
import cars from '../consts/cars'
import { readCarDocuments } from '../firebase'

const HomeScreen = ({navigation}) => {
    const width = Dimensions.get('window').width / 2 - 20;

    const [carsData, setCarsData] = useState([]);

    readCarDocuments()
        .then((carList) => {
            setCarsData(carList);
        })

    return (
        <View style={{flex: 1}}>
            <HomeHeader navigation = {navigation}/>
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>You Might Like</Text>
                </View>
                <View>
                    <FlatList
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        showsVerticalScrollIndicator= {false}
                        contentContainerStyle={{
                            marginTop: 10,
                            paddingBottom: 50,
                        }}
                        numColumns={2}
                        data={carsData}
                        renderItem={({item, index}) => (
                            <CarCard
                                carId={item.id}
                                cardWidth={width}
                                image={item.image}
                                carName={item.carName}
                                rentRate={item.rentRate}
                                pickupCity={item.pickupCity}
                                carModel={item.carModel}
                                modelYear={item.modelYear}
                                transmissionType={item.transmissionType}
                                engineCapacity={item.engineCapacity}
                                seatingCapacity={item.seatingCapacity}
                                carType={item.carType}
                                renter={item.userName}
                                renterId={item.userId}
                            />
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        marginLeft: 10,
        marginTop: 10,
    }, 
    headerText: {
        fontWeight: '500',
        fontSize: 25,
        color: '#0782F9'
    },
})
