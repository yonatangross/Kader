import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import styles from './style';
const FullStar = require('../../assets/images/fullRatedStar.png');
const partialStar = require('../../assets/images/partialStar.png');

export interface RatingProps {
  numOfStars: number;
  numOfRatings: number;
  displayRatings: boolean;
}

const maxStarsNumber = 5;
const StarRating = (props: RatingProps) => {
  const numOfStars = props.numOfStars;
  const numOfRatings = props.numOfRatings;
  let stars = [];

  for (var i = 1; i <= maxStarsNumber; i++) {
    if (i <= numOfStars) {
      stars.push(<Image style={styles.flatListStar} source={FullStar} />);
    } else {
      stars.push(<Image style={styles.flatListStar} source={partialStar} />);
    }
  }

  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={stars}
        renderItem={({ item }) => {
          return item;
        }}
        horizontal
        style={styles.starSize}
      />
      {props.displayRatings === true ? <Text>{numOfRatings} Ratings </Text> : <></>}
    </View>
  );
};

export default StarRating;
