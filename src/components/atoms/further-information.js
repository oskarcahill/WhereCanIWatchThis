import React from 'react';
import {Text, StyleSheet, Button, View, Image} from 'react-native';

const FurtherInformation = () => {

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={require('_assets/images/logo-dark-grey.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.header}>
                <Text style={{color: "#FFFFFF", borderBottomColor: "#FFFFFF", borderBottomWidth: 2, marginRight: 35, fontSize: 15, fontFamily: "Roboto-Bold"}}>What We Do</Text>
                <Text style={{color: "#FFFFFF", marginRight: 35, paddingTop: 5, fontSize: 13, fontFamily: "Roboto"}}>We show you where you can legally watch your favorite movies and tv shows. We also have an accompanying web app coming soon where you can make collections of your 
                favorite titles and share these with friends.</Text>
            </View>
            <View style={styles.subtext}>
                <Text style={{color: "#FFFFFF", borderBottomColor: "#FFFFFF", borderBottomWidth: 2, marginRight: 35, fontSize: 15, fontFamily: "Roboto-Bold"}}>Contact</Text>
                <Text style={{color: "#FFFFFF", marginRight: 35, paddingTop: 5, fontSize: 13, fontFamily: "Roboto"}}>Email: themediacollective22@gmail.com</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoContainer:{
        backgroundColor: "#121212",
        flex:1.5
    },
    logo: {
        height: 240,
        width: 380
    },
    header: {
        backgroundColor: "#121212",
        flex:1,
        paddingLeft: 45,
        paddingTop: 20
    },
    subtext: {
        backgroundColor: "#121212",
        flex:1.25,
        paddingLeft: 45,
        paddingTop: 20

    }

  });

export default FurtherInformation;

