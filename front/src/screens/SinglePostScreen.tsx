import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ImagesCarusel from "../components/CaruselItem";
import { IPost } from "../types/IPost";



export interface SinglePostPageProps {
	post: IPost;
}

const SinglePostPage = (props: SinglePostPageProps) => {

	
	return (
		<View>
			<ImagesCarusel title={props.post.title}/>
		</View>
	);
};

export default SinglePostPage;
