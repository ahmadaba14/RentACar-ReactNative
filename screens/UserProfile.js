import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const UserProfile = () => {
    return (
        <View style={styles.container}>
            <Text>User Profile</Text>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
