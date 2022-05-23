import { useState, useEffect } from 'react';
import { StreamChat, JWTUserToken} from 'stream-chat';
import { chatApiKey } from './chatconfig';

const chatClient = StreamChat.getInstance(chatApiKey);

class ChatClient {
    async useChatClient(userID, userName, userToken) {
        const user = {
            id: userID,
            name: userName
        }

        if (!chatClient.userID) {
            try {
                await chatClient.connectUser(user, userToken);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`An error occurred while connecting the user: ${error.message}`)
                }
            }
        }
    }
}

export default new ChatClient();