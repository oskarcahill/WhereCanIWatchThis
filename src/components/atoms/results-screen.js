import React from 'react';
import {Text, StyleSheet, Button, View, Image, Dimensions, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useSelector } from 'react-redux';

const ResultsScreen = () => {
    const streaming = useSelector(state => state.icon.stream);
    const renting = useSelector(state => state.icon.rent);
    const buying = useSelector(state => state.icon.buy);
    const poster = useSelector(state => state.poster.posterURL);

    return(
        <ScrollView style={styles.resultContainer}>
            <View style={styles.imageContainer}>
                <Image source={{uri: poster.posterURL}} style={styles.mediaImage}></Image>
            </View>

            <ScrollView contentContainerStyle={styles.headerContainer}>
                <Text style={{fontSize: 18, fontFamily: "Roboto-Bold", marginLeft: 20, color: "#E3EEFF"}}>Stream</Text>
            </ScrollView>

            <View style={styles.iconContainer}>
                <StreamIcons count={streaming.length} list={streaming}></StreamIcons>
            </View>


            <View style={styles.headerContainer}>
                <Text style={{fontSize: 18, fontFamily: "Roboto-Bold", marginLeft: 20, color: "#E3EEFF"}}>Rent</Text>
            </View>

            <View style={styles.iconContainer}>
                <StreamIcons count={renting.length} list={renting}></StreamIcons>
            </View>

            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Text style={{fontSize: 18, fontFamily: "Roboto-Bold", marginLeft: 20, color: "#E3EEFF"}}>Buy</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.iconContainer}>
                <StreamIcons count={buying.length} list={buying}></StreamIcons>
            </View>
        </ScrollView>
    )
};

const StreamIcons = (props) => {
    if(props.list.length == 0){
        return (null);
    }

    return(
       props.list.map((a,index) => {
                return (
                        <View key={index}>
                            <Image source={{uri: a}} style={styles.icon}></Image>
                        </View>
                )
            })
    )
};

const styles = StyleSheet.create({
    textStyle: {
        color: "#0E5257",
        fontWeight: "bold",
        textAlign: "center"
      },
      imageContainer: {
        justifyContent: "center",
        alignItems: "center"
      },
      mediaImage: {
        height: 180,
        width: 150,
        borderWidth: 2,
        borderColor: "gold",
        borderRadius: 10
      },
      resultContainer: {
          backgroundColor: "#051641"
      },
      iconContainer: {
          flexDirection: "row",
          flexWrap: "wrap"
      },
      headerContainer: {
          marginTop: 20,
          backgroundColor: "#051641",
          marginBottom: 20,
          borderRadius: 10,
          borderBottomColor: "#E3EEFF",
          borderBottomWidth: 2,
          justifyContent: "flex-end",
          paddingBottom: 10
      },
      icon: {
          height: 48, 
          width: 48,
          marginLeft: 20,
          borderRadius: 10,
          borderColor: "gold",
          borderWidth: 1.5,
          marginBottom: 10
      }
  });

export default ResultsScreen;

