import TestHelloWorld from '_atoms/test-search-modals';
import DefaultScreen from '_atoms/default-screen';
import LoginScreen from '_atoms/login-screen'
import ResultsScreen from '_atoms/results-screen'
import FurtherInformation from '_atoms/further-information'
import * as React from 'react';
import {Text, StyleSheet, Button, View, Dimensions, SafeAreaView, StatusBar, ScrollView, Alert, Modal, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flag from 'react-native-flags';
import * as RNLocalize from "react-native-localize";
import {Provider} from 'react-redux';
import store from 'components/redux/store';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

const App = () => {
    const [locale, setLocale] = useState(RNLocalize.getLocales()[0].countryCode);

    return (
    <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing Screen">
                <Stack.Screen name="Landing Screen" children={() => <LoginScreen nextPageSearch="TestHome" nextPageInfo="Further Information"/>} options = {{
                    headerRight: () => (
                        <Pressable onPress={() => {
                            if(locale == "IE"){
                                setLocale("GB")
                            }
                            else if(locale == "GB"){
                                setLocale("IE")
                            }

                        }}>
                            <Flag
                                        code={locale}
                                        size={32}                                                                                
                                        type="flat"
                            />
                        </Pressable>
     
                    )
                ,title: '',headerStyle: {
                    backgroundColor: '#121212'
                },headerTitleStyle: {
                    color: "white"
                }}}/>
                <Stack.Screen name="Further Information" children={() => <FurtherInformation/>} options={{ title: '', headerStyle: {
                    backgroundColor: '#121212'
                }, headerTitleStyle: {
                    color: "#E3EEFF"
                }}}></Stack.Screen>
                <Stack.Screen name="TestHome" children={() => <TestHelloWorld locale={{locale}} nextPage="Results"/>} options={{ title: 'Search Titles', headerStyle: {
                    backgroundColor: '#121212'
                }, headerTitleStyle: {
                    color: "#E3EEFF"
                }}}/>
                <Stack.Screen name="Default" children={() => <DefaultScreen nextPage="Home"/>} />     
                <Stack.Screen name="Results" children={() => <ResultsScreen/>} initialParams={{test: 12}} options={{ title: 'Results', headerStyle: {
                    backgroundColor: '#121212'
                },headerLeft: () => (
                    <View>   
                    </View>
                ), headerTitleStyle: {
                    color: "#E3EEFF"
                }}}/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
    );
}
 
export default App;
