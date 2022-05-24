import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import client from '../api/client'
import CarCard from '../components/CarCard'
import HomeHeader from '../components/HomeHeader'
import cars from '../consts/cars'
import { readCarDocuments } from '../firebase'

const HomeScreen = ({navigation}) => {
    const width = Dimensions.get('window').width / 2 - 20;

    const [carsData, setCarsData] = useState([]);
    const [refreshing, setRefreshing] = useState(true);

    const loadCars = () => {
        client.get('/cars')
        .then((response) => {
            setCarsData(response.data);
            setRefreshing(false);
        })
    }
    
    useEffect(() => {
        loadCars();
    }, []);

    return (
        <View style={{flex: 1}}>
            <HomeHeader navigation = {navigation}/>
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>You Might Like</Text>
                </View>
                <View>
                    {refreshing ? <ActivityIndicator /> : null}
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
                                carId={item._id}
                                cardWidth={width}
                                image={item.picture}
                                carName={item.name}
                                rentRate={item.rate}
                                pickupCity={item.pickupCity}
                                carModel={item.model}
                                modelYear={item.modelYear}
                                transmissionType={item.transmissionType}
                                engineCapacity={item.capacity}
                                seatingCapacity={item.seats}
                                mileage={item.mileage}
                                renter={item.ownerName}
                                renterId={item.owner}
                            />
                        )}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={loadCars} />
                        }
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
