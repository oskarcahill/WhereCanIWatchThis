import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Button, View, Dimensions, SafeAreaView, StatusBar, ScrollView, Alert, Modal, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const {width} = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native'

const DetailsScreen = (props) => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Hello</Text>
            <Button title="Go to ${props.nextPage}" onPress={() => navigation.navigate(props.nextPage)}/>
        </View>
    );
}

export default DetailsScreen;