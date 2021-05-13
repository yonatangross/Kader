
import React, { useEffect, useReducer, useState } from 'react';
import { Text, StyleSheet, Modal, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { IGroup } from '../../types/IGroup';
import { IUser } from '../../types/IUser';
import MemberItem from '../MemberItem';


export interface GroupMembersViewGroupDetailsProps {
    users: IUser[];
}



const GroupMembersViewGroupDetails = (props: GroupMembersViewGroupDetailsProps) => {

    const renderGroupMemberItem = (user: any) => {
        return <MemberItem profileImg={user.imageUri} />
    }

    return (
        <FlatList
            horizontal={true}
            data={props.users}
            renderItem={renderGroupMemberItem}
            keyExtractor={(user) => user.id}
        />

    );


}

const styles = StyleSheet.create({

});

export default GroupMembersViewGroupDetails;