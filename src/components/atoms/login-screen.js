import ModernLoginScreen from "react-native-modern-login-screen";
import { useNavigation } from '@react-navigation/native'
import React from 'react';
import {Text, StyleSheet, Button, View, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, Alert, Modal, Pressable, TouchableOpacity} from 'react-native';
import { LoginButton } from 'react-native-modern-login-screen';
import * as RNLocalize from "react-native-localize";
import Flag from 'react-native-flags';


const LoginScreen = (props) => {
    const navigation = useNavigation();

    return (
        /*<>
            <ModernLoginScreen
            title="Welcome to Where-Can-I-Watch"
            description="Continue to find out where you can watch your favorite television and movies."
            style={{marginTop: 32, marginLeft: 10}}
            logoSource={require('../../assets/images/Logo36-01.png')}
            >
                <LoginButton
                    text="Continue with media searcher"
                    textStyle={styles.textStyle}
                    style={{marginTop: 16, marginLeft: 5}}
                    imageSource={require('../../assets/images/Logo36-01.png')}
                    onPress={() => {
                        navigation.navigate(props.nextPage)
                    }}
                />
                <LoginButton
                    //style={styles.textStyle}
                    text="About us"
                    textStyle={styles.textStyle}
                    imageSource={require('../../assets/images/Logo36-01.png')}
                    style={{marginTop: 32,marginLeft: 5}}
                    onPress={() => {
                        console.log("hello")
                    }}
                />
            </ModernLoginScreen>
        </>*/
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={{uri: "https://static.wixstatic.com/media/72c0b2_9417bad731e543578911f6110f4e9a2d~mv2.jpg/v1/fill/w_924,h_476,al_c,q_90/72c0b2_9417bad731e543578911f6110f4e9a2d~mv2.jpg"}}
                    style={styles.logo}
                />
            </View>
            <View style={styles.introTextContainer}>
                <Text style={styles.headingText}>WhereCanIWatch</Text>
                <View style={styles.subHeading}>
                    <Text style={styles.subHeadingText}>Find out where you can watch your favorite Movies and TV shows</Text>
                </View>
            </View>

            <View style={{flex: 2, backgroundColor: "#051641"}}>
                <View style={styles.buttonContainer1}>
                    <TouchableOpacity style={styles.buttonFormat} onPress={() => {
                        navigation.navigate(props.nextPage);
                    }}>
                        <Text style={{justifyContent: "center", color: "#E3EEFF", fontFamily: "Roboto-Medium"}}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flex: 2, backgroundColor: "#051641"}}>
                <View style={styles.buttonContainer2}>
                        <TouchableOpacity style={styles.buttonFormat}>
                            <Text style={{justifyContent: "center", color:"#E3EEFF", fontFamily: "Roboto-Medium"}}>Further Information</Text>
                        </TouchableOpacity>
                </View>
            </View>
            
            <View>

            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: "Roboto-Black"
    },
    headingText: {
        color: "#E3EEFF",
        //fontWeight: "bold",
        fontSize: 25,
        fontFamily: "Roboto-Medium"
    },
    subHeadingText: {
        color: "#E3EEFF",
        paddingTop: 5,
        fontFamily: "Roboto-Light"
    },
    subHeading: {
        marginRight: 50,
        marginLeft: 50
    },
    textStyle: {
        color: "#0E5257",
        fontWeight: "bold",
        justifyContent: "center",
        alignContent: "flex-end",
      },
    logo: {
        width: 150,
        height: 150
    },
    logoContainer: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#051641"
    },
    introTextContainer: {
        flex:2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#051641"
    },
    buttonContainer1: {
        flex: 2,
        marginRight: 50,
        marginLeft: 50,
        backgroundColor: "#051641",
        justifyContent: "center"
    },
    buttonContainer2: {
        flex: 2,
        marginRight: 50,
        marginLeft: 50,
        backgroundColor: "#051641",
        justifyContent: "flex-start"
    },
    buttonFormat: {
        backgroundColor: "#051641",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#E3EEFF"
    }
  });

export default LoginScreen;

