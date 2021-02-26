import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { IPost } from "../../types/IPost";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import testImage from "../../assets/images/test.png";
import StarRating from "../StarRating/index";

export interface DoubleListItemProps {
	post: IPost;
}

const DoubleListItem = (props: DoubleListItemProps) => {
	let { post: post } = props;

	return (
		
			<TouchableWithoutFeedback onPress={() => console.log("pressed")}>
				<View style={styles.container}>
					<Image style={styles.imageDesign} source={testImage} />
					<View style={styles.midContainer}>
						<Text style={styles.username}>Looking for ice cream</Text>
						<Text style={styles.lastMessage}>Psted By: Diana Lanciano2</Text>
						<StarRating numOfStars={3} numOfRatings={4585} />
					</View>
					<Image style={styles.imageDesign} source={testImage} />
					<View style={styles.midContainer}>
						<Text style={styles.username}>Looking for ice cream</Text>
						<Text style={styles.lastMessage}>Psted By: Diana Lanciano2</Text>
						<StarRating numOfStars={3} numOfRatings={4585} />
					</View>
				</View>
			</TouchableWithoutFeedback>
		
	);
};

export default DoubleListItem;
