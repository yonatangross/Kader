import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';

export interface RatingItemProps {
  numberOfRatings: number;
  rating: number;
  showNumberOfRatings: boolean;
}

const RatingItem = (props: RatingItemProps) => {
  const { numberOfRatings, rating, showNumberOfRatings } = props;
  const fixedRating = rating.toFixed(2);
  return (
    <View style={styles.ratingContainer}>
      {showNumberOfRatings && (
        <Text style={styles.ratingNumberText}>
          {fixedRating}/5 rated: {numberOfRatings} times
        </Text>
      )}
      <Rating readonly ratingColor="#f3a953" imageSize={22} startingValue={rating} ratingCount={5} />
    </View>
  );
};

const styles = StyleSheet.create({
  ratingNumberText: { fontWeight: 'bold', fontSize: 18, marginBottom: 5 },
  ratingContainer: { justifyContent: 'center', alignItems: 'center', margin: 15, flexDirection: 'column' },
});

export default RatingItem;
