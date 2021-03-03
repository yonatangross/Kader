import React from "react";
import { View, Text, Image, Dimensions, StyleSheet, Platform } from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { IPost } from "../../types/IPost";
import CaruselItem from "../CaruselItem";
const testImage = require("../../assets/images/test.png");
import { color } from "react-native-reanimated";


export interface ImagesCaruselProps {
	post: IPost;
}

const { width: screenWidth } = Dimensions.get("window");
const ImagesCarusel = (props: ImagesCaruselProps) => {

	return (
		<View style={styles.item}>
        
		</View>

	);
};


const styles = StyleSheet.create({
    item: {
      width: screenWidth - 60,
      height: screenWidth - 60,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
  })