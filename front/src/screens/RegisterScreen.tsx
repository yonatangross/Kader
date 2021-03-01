import React, { useReducer } from "react";
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity } from "react-native";
import logo from "../assets/images/bigLogo.png";
import { MaterialIcons, Feather, AntDesign, Octicons } from "@expo/vector-icons";
const { width: WIDTH } = Dimensions.get("window");



const reducer = (state , action) => {
	//state === {firstName: string, lastName: string, email: string, password: string}
	// action === { valueChange: name || email || password,  setInput: userInput}

	switch(action.valueChange){
		case 'firstName':
			console.log(action.userInput);
			return {...state, firstName: action.userInput};
		case 'lastName':
			return {...state, lastName: action.userInput};
		case 'email':
			return {...state, email: action.userInput};
		case 'password':
			return {...state, password: action.userInput};
		default:	
			return state;
	}
		
};


export default function RegisterScreen() {

	const [state, dispatch] = useReducer(reducer, {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	return (
		<View style={styles.container}>
			<View>
				<Image source={logo} style={styles.logo} />
			</View>

			<View style={styles.inputContainer}>
				<MaterialIcons name="person" size={24} color="black" style={styles.inputIcon} />
				<TextInput 
				onChangeText={(text) => dispatch({valueChange: 'firstName', userInput: text})}
				style={styles.input} 
				placeholder={"First Name"} 
				placeholderTextColor={"rgba(255, 255, 255, 0.7)"} 
				underlineColorAndroid="transparent" />

				<TextInput 
				onChangeText={(text) => dispatch({valueChange: 'lastName', userInput: text})}
				style={styles.input} 
				placeholder={"Last Name"} 
				placeholderTextColor={"rgba(255, 255, 255, 0.7)"} 
				underlineColorAndroid="transparent" />



				<View>
					<MaterialIcons name="mail" size={24} color="black" style={styles.inputIcon} />
					<TextInput
						onChangeText={(text) => dispatch({valueChange: 'email', userInput: text})}
						style={styles.input}
						placeholder={"Email"}
						keyboardType={"email-address"}
						textContentType={"emailAddress"}
						placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
						underlineColorAndroid="transparent"
					/>
				</View>
				<View>
					<AntDesign name="lock1" size={24} color="black" style={styles.inputIcon} />
					<TextInput
						onChangeText={(text) => dispatch({valueChange: 'password', userInput: text})}
						style={styles.input}
						placeholder={"Password"}
						secureTextEntry={true}
						placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
						underlineColorAndroid="transparent"
					/>
					<TouchableOpacity style={styles.btnEye}>
						<Octicons name="eye" size={24} color="black" />
					</TouchableOpacity>
				</View>
			</View>

			<TouchableOpacity onPress={()=> console.log(state)} activeOpacity={0.6} style={styles.btnLogin}>
				<Text style={styles.text}>Login</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#f9f3f3",
		justifyContent: "center",
		marginLeft: 10,
	},
	logo: {
		width: 500,
		height: 100,
		resizeMode: "contain",
	},
	inputContainer: {
		marginTop: 10,
	},
	input: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: "rgba(0, 0, 0, 0.35)",
		color: "rgba(255, 255, 255, 0.7)",
		marginHorizontal: 25,
		marginVertical: 15,
	},
	inputIcon: {
		position: "absolute",
		top: 25,
		left: 37,
	},
	btnEye: {
		position: "absolute",
		top: 25,
		right: 50,
	},
	btnLogin: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
		backgroundColor: "#763857",
		justifyContent: "center",
		marginTop: 20,
	},
	text: {
		color: "#fff",
		fontSize: 16,
		textAlign: "center",
	},
});
function valueChange(valueChange: any): void {
	throw new Error("Function not implemented.");
}

