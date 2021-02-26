import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "./style";


export interface ButtonItemProps {
	buttonContent: string;
}

const CategoryButton = (props: ButtonItemProps) => {

    const image = {uri:"https://besthqwallpapers.com/Uploads/21-12-2019/116652/thumb2-green-lines-background-green-abstraction-geometric-background-creative-green-background.jpg"};
	return (
		<TouchableOpacity onPress={() => console.log("pressed")}>
			<View>
				<ImageBackground source={image} style={styles.image}>
                <Text style={styles.text}>{props.buttonContent}</Text>
                </ImageBackground>
				
			</View>
		</TouchableOpacity>
	);
};

export default CategoryButton;
