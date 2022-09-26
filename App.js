
/*
import React, { Component } from 'react';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform, StyleSheet, Text, View } from 'react-native';

const MainScreen = () => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
	  {label: 'Apple', value: 'apple'},
	  {label: 'Banana', value: 'banana'}
	]);

	return(
		<View style={styles.container}>
		<DropDownPicker
			      open={open}
				  value={value}
				  items={items}
				  setOpen={setOpen}
				  setValue={setValue}
				  setItems={setItems}
		/>
		<Text style={styles.instructions}>Hello User!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		borderWidth:1,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});

export default MainScreen;

*/