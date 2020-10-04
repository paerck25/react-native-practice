import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import io from 'socket.io-client';

const Chat = ({ route }) => {

    const socketRef = useRef();

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

    const onSubmitChat = () => {
        socketRef.current.emit('chat message', { name, message });
        setMessage('');
    }

    const printChatList = chatList.map((chat, index) => {
        return <Text key={index}>{chat.name} : {chat.message}</Text>;
    })


    return (
        <View style={styles.container}>
            <ScrollView style={styles.listContainer}>
                {printChatList}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput autoFocus={true} style={styles.input} value={message} onChangeText={onChangeChat} onSubmitEditing={onSubmitChat} />
                <Button onPress={onSubmitChat} title="입력" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
        justifyContent: 'flex-end',
    },
    listContainer: {
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
})

export default Chat;
