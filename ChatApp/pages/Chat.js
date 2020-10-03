import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

const Chat = ({ route }) => {

    const { name } = route.params;

    const [chat, setChat] = useState('');

    const [chatList, setChatList] = useState([]);

    const onChangeChat = (text) => {
        setChat(text);
    }

    const onSubmitChat = () => {
        setChatList([
            ...chatList,
            chat
        ])
        setChat('');
    }

    const printChatList = chatList.map((chat, index) => {
        return <Text key={index}>{name} : {chat}</Text>;
    })

    return (
        <View style={styles.container}>
            <ScrollView style={styles.listContainer}>
                {printChatList}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput autoFocus={true} style={styles.input} value={chat} onChangeText={onChangeChat} onSubmitEditing={onSubmitChat} />
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
