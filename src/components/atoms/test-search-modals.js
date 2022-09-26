import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, FlatList, View, Image, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Alert, Modal, Pressable, UIManager} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const {width} = Dimensions.get('window');
import { Avatar, Card, Button, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import {useSelector, useDispatch} from 'react-redux'
import { connect } from 'react-redux';
import setIcons from 'components/redux/actions';
import setPoster from 'components/redux/action-poster';

import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import KeyEvent from 'react-native-keyevent';
import SearchBar from "react-native-dynamic-search-bar"
const countries = ["Egypt", "Canada", "Australia", "Ireland", "Colombia", "Brazil", "Paraguay", "Uruguay", "Argentina"];
const movies = [" "];
const country = ""
//var mediaName = " "
import {staticData} from "./staticData";

const TestHelloWorld = (props) => {
    const [isLoading, setLoading] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const myIcons = []
    const [data, setData] = useState([]); //movie title 
    const [image, setImage] = useState([]);
    const [description, setDescription] = useState([]);
    const [spinnerVisibility, setSpinnerVisibility] = useState(false)
    const navigation = useNavigation();
    const mediaType = "movie";
    //const mediaName = "belfast";
    const dispatch = useDispatch();

    if(props.locale == "IE"){
        country = "ie"
    }
    else if(props.locale == "GB"){
        country = "uk"
    }

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const retrievePlatforms = async (mediaName) => {
        console.log("This is the media name: ", mediaName);
        const stream = []
        const rent = []
        const buy = []
        try{
            const response = await fetch(`http://192.168.0.11:4000/api/platforms/${country}/${mediaType}/${mediaName}`);
            const json = await response.json()
            results = json["result"]
            console.log(json)
            for(let i=0; i <= 2; i++){
                category = results[i] //category = frst round [x,x,x] second [] third [x,x,x]
                for(let j=0; j < category.length; j++){
                    if(i == 0){
                        if(category[j] != 0){
                            stream.push(category[j])
                        }
                    }
                    else if(i == 1){
                        if(category[j] != 0){
                            rent.push(category[j])
                        }
                    }
                    else if(i == 2){
                        if(category[j] != 0){
                            buy.push(category[j])
                        }
                    }
                }
            }
            return [stream,rent,buy]
            
        }
        catch(error){
            console.log("Retrivev platform error", error)
        }
    }

    const getMovies = async (movieName) => {
        if(typeof movieName === 'undefined'){
            console.log("undefined")
            return;
        }
        try{
            const response = await fetch(`https://imdb-api.com/en/API/SearchTitle/k_8cti364b/`
                                        + new URLSearchParams({
                                            //apikey : 'k_8cti364b',
                                            t : movieName,
                                         })        
                                    );
            
            const json = await response.json();   
            console.log(`Letter inputted - ${movieName}`);
            //console.log(json)
            try{
                var movie = json.results[0]
                setData(movie.title)
                mediaName = movie.title
                setImage(movie.image)
                setDescription(movie.description)
                //console.log("movie image is the following ", {image})
                console.log("movie title is the following ", mediaName)
                //console.log("movie description is the following ", movie.description)
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

    return (
    <>
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <SearchBar
                    darkMode
                    style={styles.seachBarItem}
                    fontColor="#E3EEFF"
                    iconColor="#E3EEFF"
                    shadowColor="#E3EEFF"
                    spinnerVisibility={spinnerVisibility}
                    placeholder="Enter Movie Name Here"
                    onClearPress={() => alert("onClearPress")}
                    onChangeText={(text) => {
                        getMovies(text);
                        if(text.length === 0){
                            setSpinnerVisibility(spinnerVisibility);
                        }
                        else{
                            setSpinnerVisibility(!spinnerVisibility);
                        }
                        setModalVisible(true);
                        }
                    }
                />
            </View>
            <View style={styles.card}>
                    <Card style={styles.cardItem}>
                        <Card.Content>
                            <Title style={{color: "#E3EEFF"}}>{data}</Title>
                            <Paragraph style={{color: "white"}}>{description}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <TouchableOpacity style={styles.touchable}onPress={() => {
                                console.log("Hello")
                            }}><Text style={styles.button}>Cancel</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.touchable} onPress={() => {
                                console.log("media name before being sent", mediaName)
                                mediaName = mediaName.replace(/\s+/g, '-').toLowerCase();
                                mediaName = mediaName.replace(/'/g, '');
                                retrievePlatforms(mediaName).then((icons) => {
                                    console.log("These are the streaming icons, ", icons[0]);
                                    console.log("These are the renting icons, ", icons[1]);
                                    console.log("These are the buying icons, ", icons[2]);
                                    dispatch(setIcons([icons[0],icons[1],icons[2]]))
                                }).then(dispatch(setPoster(image))).then(navigation.navigate(props.nextPage));
                            }}><Text style={styles.button2}>Ok</Text></TouchableOpacity>
                        </Card.Actions>
                    </Card>

            </View>
        </View>

    </>
    )    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    searchBar: {
        backgroundColor: "#051641",
        justifyContent: "space-between",
        flex: 2
    },
    touchable: {
        marginLeft: 10
    },
    seachBarItem: {
        backgroundColor: '#092670',
        marginTop:10,
        borderColor: "#E3EEFF",
        borderWidth: 1
    },
    card: {
        backgroundColor: "#051641",
        flex: 10
    },
    button: {
        color: "#E3EEFF",
        fontFamily: "Roboto-Black",
        fontSize: 16
    },
    button2: {
        fontFamily: "Roboto-Black",
        color: "#E3EEFF",
        marginLeft: 15,
        fontSize: 16
    },
    cardItem: {
        borderWidth:1, 
        borderStyle:'solid', 
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        //backgroundColor: "#092670",
        backgroundColor: "#092670",
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E3EEFF",
        paddingTop: 10
        
    }
  });

export default TestHelloWorld;
//export default connect(mapStateToProps,mapDispatchToProps)(TestHelloWorld);
