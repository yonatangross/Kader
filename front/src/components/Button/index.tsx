import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "./style";


export interface ButtonItemProps {
	buttonContent: string;
	onClick: Function;
}

const CategoryButton = (props: ButtonItemProps) => {

    const image = {uri:"https://images.freecreatives.com/wp-content/uploads/2016/03/Abstract-Purple-Background.jpg"};
	return (
		<TouchableOpacity onPress={() => props.onClick()}>
			<View>
				<ImageBackground source={image} style={styles.image}>
                <Text style={styles.text}>{props.buttonContent}</Text>
                </ImageBackground>
				
			</View>
		</TouchableOpacity>
	);
};

export default CategoryButton;
