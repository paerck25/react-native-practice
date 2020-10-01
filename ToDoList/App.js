import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const TodoListItem = ({text, checked, id, removeTodo, completeTodo}) => {
  return (
    <View key={id} style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          completeTodo(id);
        }}>
        <View style={styles.checkBox}>
          {checked && <View style={styles.checked} />}
        </View>
      </TouchableOpacity>
      <Text style={[styles.text, checked && styles.completeText]}>{text}</Text>
      <TouchableOpacity
        onPress={() => {
          removeTodo(id);
        }}>
        <Text style={styles.deleteButton}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [todoItem, setTodoItem] = useState('');

  const [todos, setTodos] = useState([]);

  const onChangeTodo = (text) => {
    setTodoItem(text);
  };

  const inputTodos = (text) => {
    setTodos([
      ...todos,
      {id: Math.random().toString(), text: text, checked: false},
    ]);
  };

  const removeTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      }),
    );
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? {...todo, checked: !todo.checked} : todo;
      }),
    );
  };

  const submitHandler = () => {
    inputTodos(todoItem);
    setTodoItem('');
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>To Do List</Text>
        <View style={styles.card}>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTodo}
              value={todoItem}
              placeholder="Add ToDo"
            />
            <TouchableOpacity onPress={submitHandler}>
              <Text style={styles.addButton}>+</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}>
            {todos.map((todo) => {
              return (
                <TodoListItem
                  key={todo.id}
                  {...todo}
                  removeTodo={removeTodo}
                  completeTodo={completeTodo}
                />
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  title: {
    color: 'white',
    fontSize: 45,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '500',
  },
  list: {
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: 40,
    width: 320,
    fontSize: 20,
  },
  addButton: {
    color: 'blue',
    fontSize: 30,
    marginLeft: 10,
  },
  itemContainer: {
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 5,
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
    width: 100,
  },
  completeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  checkBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    borderColor: 'black',
    borderWidth: 2,
    marginRight: 10,
    marginLeft: 5,
  },
  checked: {
    width: 15,
    height: 15,
    backgroundColor: 'black',
  },
  deleteButton: {
    color: 'red',
    fontSize: 30,
  },
});

export default App;
