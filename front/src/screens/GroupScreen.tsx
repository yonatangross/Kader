import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { getGroup } from '../api/groups';
import UserDetails from '../components/UserDetails';
import { IGroup } from '../types/IGroup';
import { IUser } from '../types/IUser';


export interface GroupScreenProps {
    group: IGroup;
}

const GroupScreen = (props: GroupScreenProps) => {
    const route = useRoute();
    //console.log(route.params);
    const [group, setGroup] = useState<IGroup>();

    useEffect(() => {
        //@ts-ignore
        getGroup(route.params.id).then((group: IGroup) => {
            setGroup(group);
        });
    }, [group]);

    const handleCreate = () => void {
        //will create new post via modal --> yoni  
        // will join the new post to the existing list of posts in group 
    }

    const groupMembrsList : IUser[] = group.members;

    return (
        <View>
            <Text>{group?.name}</Text>
            <Text>{group?.description}</Text>
            <Button
                title="Create post"
                onPress={() => handleCreate()}
            />
            <FlatList
                data={groupMembrsList}
                renderItem={({item, index}) => <UserDetails userId={group?.members[index].id}/>}
                keyExtractor={() => group.id}
            />

        </View>
    );
};
    
