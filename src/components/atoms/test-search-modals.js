import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, FlatList, View, Image, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Alert, Modal, Pressable, UIManager} from 'react-native';
import { Avatar, Card, Button, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import {useSelector, useDispatch} from 'react-redux'
import setIcons from 'components/redux/actions';
import setPoster from 'components/redux/action-poster';
import SearchBar from "react-native-dynamic-search-bar"
var country = ""

const TestHelloWorld = (props) => {
    console.log("this is the locale - ", props.locale)
    const [isLoading, setLoading] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]); //movie title 
    const [image, setImage] = useState([]);
    const [description, setDescription] = useState([]);
    const [spinnerVisibility, setSpinnerVisibility] = useState(false)
    const navigation = useNavigation();
    const dispatch = useDispatch();

    if(props.locale.locale === "IE"){
        country = "ie"
    }
    else if(props.locale.locale === "GB"){
        country = "uk"

    }

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
    }


    const retrievePlatforms = async (mediaName, description) => {
        const stream = []
        const rent = []
        const buy = []
        let mediaType = ""
        if(description.length > 7){
            mediaType = "tv-series"
        }
        else{
            mediaType = "movie"
        }
        try{
            const response = await fetch(`https://where-can-i-watch-backend.herokuapp.com/api/platforms/${country}/${mediaType}/${mediaName}`);
            const json = await response.json()
            results = json["result"]
            console.log("results from api call: ",results)
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
            try{
                var movie = json.results[0]
                setData(movie.title)
                mediaName = movie.title
                setImage(movie.image)
                setDescription(movie.description)
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
                                try{
                                    mediaName = mediaName.replace(/\s+/g, '-').toLowerCase();
                                    mediaName = mediaName.replace(/'/g, '');
                                    retrievePlatforms(mediaName,description).then((icons) => {
                                        dispatch(setIcons([icons[0],icons[1],icons[2]]))
                                    }).then(dispatch(setPoster(image))).then(navigation.navigate(props.nextPage));
                                }
                                catch(error){
                                    alert("Please Enter a Movie or TV Show")
                                }
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
        backgroundColor: "#121212",
        justifyContent: "space-between",
        flex: 2
    },
    touchable: {
        marginLeft: 10
    },
    seachBarItem: {
        backgroundColor: '#272727',
        marginTop:10,
        borderColor: "#E3EEFF",
        borderWidth: 1
    },
    card: {
        backgroundColor: "#121212",
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
        backgroundColor: "#272727",
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E3EEFF",
        paddingTop: 10
        
    }
  });

export default TestHelloWorld;
