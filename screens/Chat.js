import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Channel, Chat, MessageInput, MessageList, OverlayProvider, ChannelList} from 'stream-chat-expo'
import ChatHeader from '../components/ChatHeader'
import { useNavigation } from '@react-navigation/native'

const ChatScreen = ({route}) => {
    const channel = route.params.channel || {};
    const chatClient = route.params.chatClient || {};
    const name = route.params.name;
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();
    const {bottom} = useSafeAreaInsets();

    return (
        <SafeAreaView>
            <OverlayProvider bottomInset={bottom} topInset={0}>
                <Chat client={chatClient}>
                    <Channel channel={channel} keyboardVerticalOffset={0}>
                        <ChatHeader navigation={navigation} width={screenWidth} route={name} />
                            <View style={StyleSheet.absoluteFill}>
                                <MessageList />
                                <MessageInput />
                            </View>
                    </Channel>
                </Chat>
            </OverlayProvider>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})