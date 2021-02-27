import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "./style";


export interface ButtonItemProps {
	buttonContent: string;
}

const CategoryButton = (props: ButtonItemProps) => {

    const image = {uri:"https://media.gettyimages.com/videos/abstract-smoke-fog-purple-ink-levitation-background-video-id1195295737?s=640x640"};
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
