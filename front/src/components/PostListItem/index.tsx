import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { IPost } from "../../types/IPost";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import testImage from "../../assets/images/test.png";
import StarRating from "../StarRating/index";


export interface PostListItemProps {
	post: IPost;
}

const PostListItem = (props: PostListItemProps) => {
	let { post: post } = props;

	const navigation = useNavigation();
	//console.log(post);
	//const user = post.creator;

	const onClick = () => {
		navigation.navigate("postPage", {
			// id: post.id,
			// creator: post.creator,
		});
	}; 
 
	return (
		<TouchableWithoutFeedback onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.ImageContainer}> 
					<Image style={styles.imageDesign} source={testImage} />
				</View>
				<View style={styles.DetailsContainer}>
						<Text style={styles.PostTitle}>Looking for ice cream</Text>
						<Text style={styles.PostedBy}>Psted By: Diana Lanciano</Text>
						<StarRating numOfStars={3} numOfRatings={4585} />
				</View>
				
			</View>
		</TouchableWithoutFeedback>
	);
};

export default PostListItem;
