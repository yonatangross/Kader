import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { IUser } from '../../types/IUser';
import StarRating from '../StarRating/index';
import { getUser } from '../../api/users';
import { useScrollToTop } from '@react-navigation/native';

export interface UserDetailsProps {
    userId : string ;
}



const UserDetails = (props: UserDetailsProps) => {

    const user:IUser = getUser(props.userId);

    return <View>
        <Text>{ user.firstName + user.lastName}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phoneNumber}</Text>
        <StarRating numOfStars={user.rating} numOfRatings={user.numberOfRatings}/>
    </View>

};

export default UserDetails;