import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import styles from "./style";
import FullStar from "../../assets/images/fullRatedStar.png";
import unFullStar from "../../assets/images/unfullStar.png";

export interface RatingProps {
	numOfStars: number;
	numOfRatings: number;
}

const StarRating = (props: RatingProps) => {
	const numOfstars = props.numOfStars;
	const numOfrating = props.numOfRatings;
	let stars = [];

	for (var i = 1; i <= 5; i++) {
		if (i <= numOfstars) {
			stars.push(<Image style={styles.flatListStar} source={FullStar} />);
		} 
        else {
			stars.push(<Image style={styles.flatListStar} source={unFullStar} />);
		}
	}

    console.log(stars);
	return (
		<View>
			<FlatList
				keyExtractor={(item, index) => index.toString()}
				data={stars}
				renderItem={({ item }) => {
					return item;
				}}
				horizontal
			/>
            <Text>{numOfrating} Ratings </Text>
		</View>
	);
};

export default StarRating;
