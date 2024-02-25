import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HStack, VStack } from "react-native-flex-layout";
import Input from "../../Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@react-native-material/core";
export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const firestore = firebase.firestore();
  const [results, setResults] = useState([]);
  const { currentUser } = useAuth();
  // async function searchUser() {
  //     setLoading(true);
  //     try {

  //     } catch (error) {
  //         console.log(error);
  //         setLoading(false);
  //     }
  // }
  console.log("search");

  return (
    <>
    {/* // <View style={styles.mainContainer}> */}
      <View style={styles.topNav}>
        <HStack>
          <TouchableOpacity>
            <Ionicons
              name="arrow-back-outline"
              size={32}
              style={styles.iconLeft}
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          </TouchableOpacity>

          <Text style={styles.logoText}>RoadShare</Text>
        </HStack>
      </View>
       {/* <VStack>

                 </VStack> 
       <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="never"
        scrollEnabled={true}
      > */}
        <Input
          placeholder={"Search for a name..."}
          value={search}
          setValue={setSearch}
          // onSubmitEditing={async () => {
          //   console.log("submitted");
          //   firestore
          //     .collection("users")
          //     .where("email", ">=", search.toLowerCase())
          //     .where("email", "<=", search.toLowerCase() + "\uf8ff")
          //     .get()
          //     .then((querySnapshot) => {
          //       let results_ = [];
          //       querySnapshot.forEach((doc) => {
          //         results_.push(doc.data());
          //       });
          //       console.log(results_);
          //       setResults(results_);
          //     })
          //     .catch((error) => {
          //       console.log("Error getting documents: ", error);
          //     });
          // }}
        ></Input>
        <Button style={{color:"#212427",backgroundColor:"#212427",width:140,marginLeft:10}} title="search" onPress={async () => {
            console.log("submitted");
            firestore
              .collection("users")
              .where("email", ">=", search.toLowerCase())
              .where("email", "<=", search.toLowerCase() + "\uf8ff")
              .get()
              .then((querySnapshot) => {
                let results_ = [];
                querySnapshot.forEach((doc) => {
                  results_.push(doc.data());
                });
                console.log(results_);
                setResults(results_);
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          }}></Button>
         <View style={styles.userList}>
           {results &&
            results.map((e, i) => {
              return (
                <View
                  key={i}
                  style={{ marginLeft: 10, marginTop: 5, height: 40 }}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      console.log("touched.");
                      axios
                        .post(
                          "https://road-share-backend-dp-nothing.vercel.app/api/addFriend",
                          {
                            friend_email: e.email,
                            user_email: currentUser.email,
                          }
                        )
                        .then((res) => {
                          if (res && res.data) {
                            Alert.alert(e.email + " added!");
                          }
                        });
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>{e.email}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
     
    
   
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    borderBottomColor: "#2F6424",
  },
  backIcon: {
    color: "black",
    height: 30,
    width: 30,
    // marginRight: 1,
  },
  topNav: {
    marginTop: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#2F6424",
  },
  Logo: {
    width: 30,
    height: 30,
    flexDirection: "row",
    marginRight: 45,
    float: "left",
    marginTop: 8,
  },
  logoText: {
    marginTop:10,
    marginBottom:10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    // flexDirection: 'row',
    color: "#2F6424",
    fontWeight: "bold",
    // position: "absolute",
  },
  iconRight: {
    color: "#2F6424",
    justifyContent: "flex-end",
    width: 30,
    height: 30,
    position: "absolute",
    marginLeft: 78,
  },
  iconLeft: {
    color: "#2F6424",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 30,
    height: 30,
    marginLeft: -50,
    marginTop: 5,
  },
  userList: {},
  userBox: {
    backgroundColor: "green",
  },
});
