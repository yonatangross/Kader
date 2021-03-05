import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { IUser } from '../../types/IUser';
import StarRating from '../StarRating/index';
import { getUser } from '../../api/users';

export interface UserDetailsProps {
    userId : string ;
}



const UserDetails = (props: UserDetailsProps) => {

    const [user, setUser] = useState<IUser>();
    
    getUser(props.userId).then((result) => {
         setUser(result);
    });

    return <View>
        <Text>{ user.firstName + user.lastName}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phoneNumber}</Text>
        <StarRating numOfStars={user.rating} numOfRatings={user.numberOfRatings}/>
    </View>

};

export default UserDetails;