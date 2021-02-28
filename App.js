import { useState } from "react"
import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Button, ScrollView, TouchableOpacity } from 'react-native';
import firebase from "./firebase.js"

export default function App() {

  const [todo, setTodo] = useState("")
  const [AllTodo, setAllTodo] = useState([])
  
  // set Todo from Firebase
  let obj = {
    data:AllTodo,
  }
  firebase.database().ref("todoItem/").set(obj)

  const addTodoItem = () => {
    setAllTodo([...AllTodo, { key: Math.random().toString(), data: todo }])
    // if (setTodo==='') {
    //   alert('please write in it!')
    // }
  }



  const remove = (valkey)=>{
    let removeData=AllTodo.filter(val=>val.key != valkey)
    setAllTodo(removeData)
  firebase.database().ref("todoItem/"+ valkey.key).remove()
    
 }


  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.container}>

      <Text style={styles.appname}> Todo App</Text>

      <View style={styles.inputField}>

        <TextInput placeholder="Write Some Thing in it!" value={todo} onChangeText={(text) => setTodo(text)} placeholderTextColor="grey" style={styles.input} />

        {/* <Button onPress={addTodoItem} style={styles.addTodo} color="#841584" title="Add" /> */}
        <TouchableOpacity>
          <Text onPress={addTodoItem} style={styles.editBtn}> +</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.veiwSroller}>
        {AllTodo.map((val) =>

          <View style={styles.viewScrollerItem}>
            <Text style={styles.todoText}>{val.data}</Text>
            <View>
            </View>
            <TouchableOpacity style={styles.crossText}>
                         <Text onPress={()=>remove(val.key)}  key={val.key}  TouchableOpacity={0.7} style={styles.deleteBtn}> X</Text> 
                         </TouchableOpacity>

            {/* <TouchableOpacity >
              <Text  onPress={() => dalete(item.key)} key={item.key }TouchableOpacity={0.6} style={styles.deleteBtn}> x</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity>
              <Text onPress={() => edit(item.key)} style={styles.editBtn}> +</Text>
            </TouchableOpacity> */}

          </View>
        )}
      </ScrollView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  input: {
    borderTopWidth: 1,
    borderBottomColor: 'white',
    borderTopColor: "white",
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    color: 'white',
    width: "90%",



  },

  addTodo: {
    width: '20%',
    height: "100%",
    backgroundColor: 'white',
    borderRadius: 40,

  },

  appname: {
    fontSize: 20,
    // backgroundColor: "black",

    color: "white",
    textAlign: 'center',
    padding: 10,
    shadowColor: "#000",
    borderRadius: 10,
    width: '100%',

  },

  inputField: {
    marginTop: 25,
    width: "80%",
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "row",

  },

  veiwSroller: {
    width: "100%",
    marginTop: 30,

  },

  editBtn: {
    color: "green",
    // width:'5%'
    alignItems: 'center',
    justifyContent: 'center',
    // color: "red",
    // marginLeft: 19,
    paddingRight: 9,
    textAlignVertical: 'center',
    // padding:2,
    // paddingBottom:15,


    textAlign: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'white',

    borderRadius: 50,
    fontSize: 30,
    fontWeight: 'bold',
    // width:'5%'

  },

  viewScrollerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    padding: 10,
    borderBottomColor: 'yellow',
    borderBottomWidth: 2,

  },

  todoText: {
    color: "white",
    fontSize: 16,
    width: '70%'
  },

  deleteBtn: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // color: "red",
    // marginLeft: 19,
    // textAlign: 'center',
    // width: 20,
    // height: 20,
    // paddingRight: 4,
    // backgroundColor: 'pink',

    // borderRadius: 10,
    // // fontSize:19
    // fontWeight: 'bold',
    // // width:'5%'
    color: "red",
    // width:'5%'
    alignItems: 'center',
    justifyContent: 'center',
    // color: "red",
    // marginLeft: 19,
    paddingRight: 6,
    textAlignVertical: 'center',
    // padding:2,
    paddingBottom: 5,


    textAlign: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'white',

    borderRadius: 50,
    fontSize: 20,
    fontWeight: 'bold',
    // width:'5%'

  },




});
