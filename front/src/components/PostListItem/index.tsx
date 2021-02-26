import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { IPost } from "../../types/IPost";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { PostType } from "../../types/PostType";
import testImage from "../../assets/images/test.png";
import StarRating from '../StarRating/index'

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
				<View style={styles.lefContainer}>
					<Image style={styles.imageDesign} source={testImage} />
					<View style={styles.midContainer}>
						<Text style={styles.username}>Looking for ice cream</Text>
						<Text style={styles.lastMessage}>Psted By: Diana Lanciano</Text>
            			<StarRating
						 numOfStars={3}
						 numOfRatings={4585}
						/>
					</View>
				</View>
				{/* <Text style={styles.time}>{moment(post.updatedAt).format('DD/MM/YYYY hh:mm:ss')}</Text> */}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default PostListItem;
