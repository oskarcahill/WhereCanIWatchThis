import { useNavigation } from '@react-navigation/native'
import React from 'react';
import {Text, StyleSheet, Button, View, Image, TouchableOpacity} from 'react-native';

const LoginScreen = (props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={require('_assets/images/logo-dark-grey.png')}
                    style={styles.logo}
                />
            </View>

            <View style={{flex: 2, backgroundColor: "#121212"}}>
                <View style={styles.buttonContainer1}>
                    <TouchableOpacity style={styles.buttonFormat} onPress={() => {
                        navigation.navigate(props.nextPageSearch);
                    }}>
                        <Text style={{justifyContent: "center", color: "#E3EEFF", fontFamily: "Roboto-Medium"}}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flex: 2, backgroundColor: "#121212"}}>
                <View style={styles.buttonContainer2}>
                        <TouchableOpacity style={styles.buttonFormat} onPress={() => {
                            navigation.navigate(props.nextPageInfo)
                        }}>
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
        width: 400,
        height: 400,
        marginTop: 70
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
        backgroundColor: "#121212",
        justifyContent: "center"
    },
    buttonContainer2: {
        flex: 2,
        marginRight: 50,
        marginLeft: 50,
        backgroundColor: "#121212",
        justifyContent: "flex-start"
    },
    buttonFormat: {
        backgroundColor: "#121212",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#E3EEFF"
    }
  });

export default LoginScreen;

