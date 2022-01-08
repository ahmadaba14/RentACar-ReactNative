import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CarDetails = ({route}) => {
    return (
        <View style={styles.container}>
            <Text>{route.params.data.carName}</Text>
        </View>
    )
}

export default CarDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
