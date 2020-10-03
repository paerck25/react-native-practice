import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const Login = ({ navigation }) => {
    const [nickName, setNickName] = useState('');

    const onChangeName = (text) => {
        setNickName(text);
    }

    const startChatting = () => {
        navigation.navigate('Chat',{
            name : nickName
          });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Who's Next?</Text>
            <Text style={styles.text}>닉네임을 입력해주세요.</Text>
            <TextInput
                style={styles.input}
                value={nickName}
                onChangeText={onChangeName}
            />
            <View style={styles.button}>
                <Button title="입장하기" color="white" onPress={startChatting} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        marginTop: 100,
        marginBottom: 100,
        fontSize: 40,
        fontWeight: "500",
    },
    text: {
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 20,
    },
    input: {
        paddingHorizontal: 40,
        paddingBottom: 5,
        fontSize: 20,
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    button: {
        marginTop: 60,
        width: '70%',
        borderRadius: 10,
        backgroundColor: 'skyblue',
    },
})

export default Login;
