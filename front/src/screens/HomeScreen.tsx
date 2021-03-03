import { Button, Icon } from "@ui-kitten/components";
import * as React from "react";
import { Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import CategoryButton from "../components/Button";
import DoubleListItem from "../components/DoubleListItem";
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

	const PlusIcon = (props: any) => <Icon {...props} name="alert-circle-outline" style={{ width: 50, height: 50,  }} />;
	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<CategoryButton buttonContent={"Add Post"} navigationString={"Register"}/>
				<CategoryButton buttonContent={"Create Group"} navigationString={"SinglePost"} />

				<Button style={styles.button} status="success" accessoryRight={PlusIcon} size="small">
					diana
				</Button>
			</View>
			<FlatList
				style={{ width: "100%" }}
				data={arr}
				//@ts-ignore
				renderItem={({ item }) => (item.id % 2 == 0 ? <PostListItem post={Posts} /> : <DoubleListItem post={Posts} />)}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#f9f3f3",
	},
	buttonContainer: {
		flexDirection: "row",
		margin: 10,
		backgroundColor: "transparent",
	},
	roundButton: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderRadius: 100,
		margin: 10,
		marginRight: 40,
		marginLeft: 40,
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		margin: 10,
		marginRight: 40,
		marginLeft: 40,
		padding: 10,
	},
});

export default HomeScreen;
