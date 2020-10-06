import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import io from 'socket.io-client';

const Chat = ({ route }) => {

    const socketRef = useRef();

    const scrollRef = useRef();

    const { name } = route.params;

    const [message, setMessage] = useState('');

    const [chatList, setChatList] = useState([]);

    const onChangeChat = (text) => {
        setMessage(text);
    }

    useEffect(() => {
        socketRef.current = io('http://localhost:4000');

        socketRef.current.on('chat message', (msg) => {
            setChatList((chatList) => [...chatList, msg])
        })

        return () => {
            socketRef.current.disconnect();
        }
    }, [])

    useEffect(() => {
        scrollRef.current.scrollToEnd({ animated: false });
    }, [chatList])

    const onSubmitChat = () => {
        socketRef.current.emit('chat message', { name, message });
        setMessage('');
    }

    const printChatList = chatList.map((chat, index) => {
        if (chat.name === 'systemMessage') {
            return (
                <View key={index} style={styles.systemMessage}>
                    <Text>{chat.message}</Text>
                </View>
            )
        }
        if (name === chat.name) {
            return (
                <View key={index} style={styles.myChatContainer}>
                    <Text style={styles.myChatItem}>{chat.message}</Text>
                </View>
            )
        }
        if (name !== chat.name) {
            return (
                <View key={index} style={styles.otherChatContainer}>
                    <Text>{chat.name}</Text>
                    <View key={index} style={styles.inlineBlock}>
                        <Text style={styles.otherChatItem}>{chat.message}</Text>
                    </View>
                </View>
            )
        }
    })


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView ref={scrollRef} style={styles.listContainer}>
                {printChatList}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput autoFocus={true} style={styles.input} value={message} onChangeText={onChangeChat} onSubmitEditing={onSubmitChat} />
                <Button onPress={onSubmitChat} title="입력" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    listContainer: {
        marginTop:15,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    input: {
        marginRight: 10,
        width: '80%',
        padding: 5,
        fontSize: 15,
        height: 35,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
    },
    myChatContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        marginBottom: 15,
    },
    myChatItem: {
        fontWeight: '500',
        fontSize: 16,
        backgroundColor: 'yellow',
        padding: 9,
    },
    otherChatContainer: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 15,
    },
    otherChatItem: {
        fontWeight: '500',
        fontSize: 16,
        backgroundColor: 'white',
        padding: 9,
        marginTop: 5,
    },
    inlineBlock: {
        flex: 1,
        flexDirection: 'row',
    },
    systemMessage: {
        flex: 1,
        alignItems: 'center',
    },
})

export default Chat;
