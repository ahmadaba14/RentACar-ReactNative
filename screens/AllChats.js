import { Dimensions, StyleSheet, Text} from 'react-native'
import React from 'react'
import {StreamChat} from 'stream-chat';
import {
  ChannelList,
  Chat,
  OverlayProvider,
} from 'stream-chat-expo';

import { chatApiKey } from '../api/chat/chatconfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AllChatsHeader from '../components/AllChatsHeader';

let STORAGE_KEY = '@user_input';
const chatClient = StreamChat.getInstance(chatApiKey);

const filters = {};
const options = {limit: 20, messages_limit: 30};

const CustomPreviewTitle = ({channel}) => (
    <Text>
      {channel.data.name}
    </Text>
);

const AllChats = () => {
    const [channelsKey, setChannelsKey] = React.useState(1);

    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;

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

    React.useEffect(() => {
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
                    setChannelsKey(channelsKey + 1);
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(`An error occurred while connecting the user: ${error.message}`)
                    }
                }
            }
        }

        useChatClient();
    }, []);

    return (
        <OverlayProvider>
            <Chat client={chatClient}>
                <AllChatsHeader navigation={navigation} width={screenWidth}/>
                <ChannelList
                    key={channelsKey}
                    PreviewTitle={CustomPreviewTitle}
                    filters={filters}
                    options={options}
                    onSelect={channel => {
                        navigation.navigate('ChatScreen', {
                            channel: channel,
                            chatClient: chatClient,
                            name: channel.data.name,
                        });
                    }}
                />
            </Chat>
        </OverlayProvider>
    )
}

export default AllChats

const styles = StyleSheet.create({})