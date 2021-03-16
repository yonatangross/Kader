import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { IUser } from '../../types/IUser';
import StarRating from '../StarRating/index';
import { getUser } from '../../api/users';
import { AxiosResponse } from 'axios';
import { UserApiDataType } from '../../types/ApiDataTypes';

export interface UserDetailsProps {
    userId : string ;
}



const UserDetails = (props: UserDetailsProps) => {

    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        //@ts-ignore
        getUser(props.userId).then((result : IUser) => {
            setUser(result);
        })
      },[user]);
    
    

    return <View>
        <Text>{ user?.firstName + user.lastName}</Text>
        <Text>{user?.email}</Text>
        <Text>{user?.phoneNumber}</Text>
        <StarRating numOfStars={user.rating} numOfRatings={user?.numberOfRatings}/>
    </View>

};

export default UserDetails;