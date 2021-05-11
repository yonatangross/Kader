
import React, { useEffect, useReducer, useState } from 'react';
import { Text, StyleSheet, Modal, View, Image } from 'react-native';
import { Avatar } from '@ui-kitten/components'
import { IUser } from '../../types/IUser';


export interface MemberItemProps {
    profileImg?: string
}

const MemberItem = (props: MemberItemProps) => {

    return (

        <View>
            <Image
                
                source={{uri: props.profileImg}}
            />

        </View>
    );


}


const styles = StyleSheet.create({

});

export default MemberItem;

