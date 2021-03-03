import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { IPost } from "../../types/IPost";
const testImage = require("../../assets/images/test.png");

export interface caruselItemProps {
	//post: IPost;
    title: string;
}

const { width, height } = Dimensions.get("window");

const ImagesCarusel = (props: caruselItemProps) => {


	return (
	    <View style={styles.cardView}>
            <Image style={styles.image} source={testImage} />
            <View style={styles.textView}>
                <Text style={styles.itemTitle}>{props.title}</Text>
            </View>
        </View>
	);
};


const styles = StyleSheet.create({

    cardView:{
        flex: 1,
        width: width - 20,
        height: height / 3,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5
    },

    textView: {
        position: 'absolute',
        margin: 10,
        left: 5
    },
    image: {
        width: width - 20,
        height: height /3,
        borderRadius: 10
    },
    itemTitle: {
        color: 'white',
        fontSize: 22,
        shadowColor: '#000',
        shadowOffset: {width: 0.8, height: 0.8},
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }


});


export default ImagesCarusel;