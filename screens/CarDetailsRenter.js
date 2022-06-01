import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { colors } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import DetailsHeader from '../components/DetailsHeader';

import { StreamChat, Channel as ChannelType, Channel} from 'stream-chat'
import { chatApiKey } from '../api/chat/chatconfig'
import AsyncStorage from '@react-native-async-storage/async-storage';

let STORAGE_KEY = '@user_input';
const chatClient = StreamChat.getInstance(chatApiKey);

const CarDetailsRenter = ({route}) => {
    const details = route.params.data;
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    const getUserFromStorage = async() => {
        try {
            const value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value !== null) {
                const nuser = JSON.parse(value)
                const user = {
                    userID: nuser.user._id,
                    userName: nuser.user.name,
                    userToken: nuser.token
                }
                return user;
            }
        } catch (error) {
            alert(error);
        }
    }

    const useChatClient = async () => {
        const nuser = await getUserFromStorage();
        const userToken = nuser.userToken;

        const user = {
            id: nuser.userID,
            name: nuser.userName
        }

        if (!chatClient.userID) {
            try {
                await chatClient.connectUser(user, userToken);
                console.log('Chat Connected')
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`An error occurred while connecting the user: ${error.message}`)
                }
            }
        }
        return user;
    }

    const createChat = async() => {
        const user = await useChatClient();
        const channel = chatClient.channel('messaging', {
            members: [user.id, details.renterId],
            name: details.carName
        });

        try {
            await channel.watch();
        } catch (error) {
            if (error instanceof Error) {
                console.error(`An error occurred while watching the channel: ${error.message}`)
            }
        }

        navigation.navigate('ChatScreen', {
            channel: channel,
            chatClient: chatClient,
            name: channel.data.name
        })
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
                <TouchableOpacity style={styles.bookButton} onPress={() => {
                    navigation.navigate('BookCar', {
                        data: details
                    })
                }}>
                    <Text style={styles.buttonText}>Book Car</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.chatButton}
                    onPress={createChat}
                >
                    <Text style={styles.buttonText}>Chat with Owner</Text>
                </TouchableOpacity>
            </View>
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
    bookButton: {
        position: 'relative',
        backgroundColor: '#0782F9',
        width: 200,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 25,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {height: -2},
        zIndex: 999
    },
    chatButton: {
        position: 'relative',
        backgroundColor: '#0782F9',
        width: 200,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {height: -2},
        zIndex: 999
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center'
    }
})
