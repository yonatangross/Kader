import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { IUser } from '../../types/IUser';
import StarRating from '../StarRating/index';
import { getUser } from '../../api/users';


export interface UserDetailsProps {
    userId: string;
}


const UserDetails = (props: UserDetailsProps) => {


    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        //@ts-ignore

        getUser(props.userId).then((result: IUser) => {
            setUser(result);
        }).catch((error) => {
            console.log('error to get user in user details');
        })
    }, [user]);


    if (user) {
        return <View>
            <Text>{user.firstName + user.lastName}</Text>
            <Text>{user.email}</Text>
            <Text>{user.phoneNumber}</Text>
            <StarRating numOfStars={user.rating} numOfRatings={user.numberOfRatings} />
        </View>
    } else { return <></> }

};

export default UserDetails;