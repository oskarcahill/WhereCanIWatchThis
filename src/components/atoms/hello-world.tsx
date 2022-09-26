import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Button, View, Dimensions, SafeAreaView, StatusBar, ScrollView, Alert, Modal, Pressable, UIManager} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const {width} = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native'


import SelectDropdown from 'react-native-select-dropdown';
import App from '../../../backend/backend'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import KeyEvent from 'react-native-keyevent';
import SearchBar from "react-native-dynamic-search-bar"
const countries = ["Egypt", "Canada", "Australia", "Ireland", "Colombia", "Brazil", "Paraguay", "Uruguay", "Argentina"];
const movies = [" "];

const Header = (props) => {
    return (
        <View style={{borderStyle:'solid', borderWidth:1}}>
            <Text>Where Can I Watch This Fam</Text>
        </View>
    )
}

const HelloWorld = (props) => {
    const [isLoading, setLoading] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const getMovies = async (movieName) => {
        //console.log(movieName + " getMovies");
        var title = movieName;
        try{
            //${encodeURIComponent(letter)}
            //apikey=703a638c
            // imdb api key = k_8cti364b
            // imdb call = https://imdb-api.com/en/API/SearchTitle/k_8cti364b/inception 2010
            //https://reactnative.dev/movies.json

            /* OMDB CALL
            `http://www.omdbapi.com/?`
                                        + new URLSearchParams({
                                            apikey : '703a638c',
                                            t : title,
                                            */
            const response = await fetch(`https://imdb-api.com/en/API/SearchTitle/k_8cti364b/`
                                        + new URLSearchParams({
                                            //apikey : 'k_8cti364b',
                                            t : movieName,
                                        })        
                                    );
            
            const json = await response.json();   
            console.log(`Letter inputted - ${movieName}`);
            console.log(json)
            try{
                title = json.results[0]
                setData(title.title)
            }
            catch(error){
                console.log(error)
            }

        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
    <>
        <Header />
        <SafeAreaView style={styles.saveAreaViewContainer}>
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
            <View style={styles.viewContainer}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    contentContainerStyle={styles.scrollViewContainer}>
                <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        navigation.navigate(props.nextPage)
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />
                <SearchBar
                    styles={styles.searchBar}
                    fontColor="#c6c6c6"
                    iconColor="#c6c6c6"
                    shadowColor="#282828"
                    placeholder="Enter Movie Name Here"
                    onPress={(text) => {
                        alert(text)
                        //console.log(text);
                        //getMovies(text);
                        }
                    }
                    onClearPress={() => alert("onClearPress")}
                    onChangeText={(text) => {
                        //console.log(text)
                        const Title = getMovies(text);
                        console.log(`CHECK IF STATE VARIABLES WORK ${data}`)
                        setModalVisible(true);
                        }
                    }
                />
                <View style={styles.centeredView}>
                    <Modal 
                        animationType = "slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text>Hello World!</Text>
                                <Pressable
                                    style={[styles.button,styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        //navigation.navigate(props.nextPage)
                                        //then send the variable to the backend 
                                    }}
                                >
                                    <Text style={styles.textStyle}>{data}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    </>
    )
    
}

const styles = StyleSheet.create({
    searchBar: {
        flex: 1,
        position: 'absolute',
        right: 5,
        top: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
    header: {
      flexDirection: 'row',
      width,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F6F6F6',
    },
    headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
    saveAreaViewContainer: 
        {
            flex: 1, 
            backgroundColor: '#FFF',
        },
    viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: '10%',
      paddingBottom: '20%',
    },
  
    dropdown1BtnStyle: {
      width: '80%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  
    dropdown2BtnStyle: {
      width: '80%',
      height: 50,
      backgroundColor: '#444',
      borderRadius: 8,
    },
    background_page:{
        backgroundColor: '#444'
    },
    dropdown2BtnTxtStyle: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    dropdown2DropdownStyle: {
      backgroundColor: '#444',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
    dropdown2RowTxtStyle: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  
    dropdown3BtnStyle: {
      width: '80%',
      height: 50,
      backgroundColor: '#FFF',
      paddingHorizontal: 0,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#444',
    },
    dropdown3BtnChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
    dropdown3BtnTxt: {
      color: '#444',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      marginHorizontal: 12,
    },
    dropdown3DropdownStyle: {backgroundColor: 'slategray'},
    dropdown3RowStyle: {
      backgroundColor: 'slategray',
      borderBottomColor: '#444',
      height: 50,
    },
    dropdown3RowChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
    dropdown3RowTxt: {
      color: '#F1F1F1',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      marginHorizontal: 12,
    },
  
    dropdown4BtnStyle: {
      width: '50%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
    },
    dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
  });

export default HelloWorld;