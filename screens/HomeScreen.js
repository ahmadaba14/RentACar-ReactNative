import React from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import CarCard from '../components/CarCard'
import HomeHeader from '../components/HomeHeader'
import cars from '../consts/cars'

const HomeScreen = ({navigation}) => {
    const width = Dimensions.get('window').width / 2 - 20;

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
                        data={cars}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <CarCard
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
                                renter={item.renter}
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
    },
})
