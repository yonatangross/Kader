import * as React from "react";
import { FlatList, StyleSheet } from "react-native";

import PostListItem from "../components/PostListItem";
import { View } from "../components/Themed";
import Posts from "../data/Posts";
import { IPost } from "../types/IPost";
import { PostType } from "../types/PostType";

export interface HomeProps {}

const HomeScreen = (props: HomeProps) => {
	let arr: IPost[] = [];
	for (let index = 0; index < 20; index++) {
		arr.push({
			id: index.toString(),
			type: PostType.REQUEST,
			category: "Sports",
			title: "Looking for a football",
			description: "searching for a football 30cm.\n brand new please!",
			comments: [
				{ id: "3", content: "I have a basketball" },
				{ id: "2", content: "I have what you looking for ;-)" },
			],
			location: "Ashkelon",
			images: ["https://images1.ynet.co.il/PicServer2/03072003/353264/nurit_wh.jpg", "https://images1.ynet.co.il/PicServer2/03072003/353264/nurit_wh.jpg"],
			creator: {
				id: "8",
				firstName: "yoni",
				lastName: "bolila",
				email: "yonatan2gross@gmailk.com",
				phoneNumber: "0506656474",
				rating: 5,
				numberOfRatings: 25,
				groups: [],
				posts: [],
				comments: [],
				imageUri: "https://images1.ynet.co.il/PicServer2/03072003/353264/nurit_wh.jpg",
			},
			groupId: "8",
		});
	}

	return (
		<View style={styles.container}>
			<FlatList
				style={{ width: "100%" }}
				data={arr}
				//@ts-ignore
				renderItem={({ item }) => <PostListItem post={Posts} />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default HomeScreen;
