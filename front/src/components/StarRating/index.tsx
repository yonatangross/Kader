import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './style';

export interface RatingProps {
  numOfStars: number;
  numOfRatings: number;
  displayRatings: boolean;
}

const maxStarsNumber = 5;
const StarRating = (props: RatingProps) => {
  const numOfStars = props.numOfStars;
  const numOfRatings = props.numOfRatings;
  let starsArray = [];

  for (var i = 1; i <= maxStarsNumber; i++) {
    if (i <= numOfStars) {
      starsArray.push(<FontAwesome name={'star'} size={18} style={styles.singleStar} />);
    } else {
      starsArray.push(<FontAwesome name={'star-o'} size={18} style={styles.singleStar} />);
    }
  }

  return (
    <View style={styles.ratingContainer}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={starsArray}
        renderItem={({ item }) => {
          return item;
        }}
        horizontal
      />
      {props.displayRatings === true ? <Text>{numOfRatings} Ratings </Text> : <></>}
    </View>
  );
};

export default StarRating;
