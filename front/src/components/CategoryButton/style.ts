import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	image: {
		resizeMode: "cover",
		justifyContent: "center",
		borderRadius: 100,
		width: 70,
		height: 70,
		alignItems: "center",
		padding: 10,
		margin: 10,
		overflow: "hidden",
	},
	text: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default styles;
