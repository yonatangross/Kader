// import { useRoute } from '@react-navigation/native';
// import React, { useEffect, useReducer, useState } from 'react';
// import { Text, StyleSheet, View, Button, FlatList, SafeAreaView } from 'react-native';
// import GroupListItem from '../components/GroupListItem';
// import SearchBox from '../components/SearchBox';
// import { getGroups, getGroupsForUser } from '../services/groups';
// import { IGroup } from '../types/IGroup';

// export interface UserGroupsScreenProps { }


// const UserGroupsScreen = (props: UserGroupsScreenProps) => {

//     const route = useRoute();
//     const [userExistingGroups, setUserExistingGroups] = useState<IGroup[]>([]);
//     const [recommendedGroups, setRecommendedGroups] = useState<IGroup[]>([]);

//     // for existing groups:
//     useEffect(() => {
//         if (route.params) {
//           const params: any = route.params;
//           getGroupsForUser(params.id)
//             .then((response) => {
//               const groupsResponse: IGroup[] = response.data.post;
//               setUserExistingGroups(groupsResponse);
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }
//       }, []);

//       // for recommended groups aviv will create a query that returns top 5 groups:
//         //////////////////////////

//         return (
//             <View>
//                 <SearchBox/>
//                 <Text>My Groups</Text>
//                 {userExistingGroups.length > 0 ?
//                 <SafeAreaView>
//                     <FlatList
//                         data={userExistingGroups}
//                         renderItem={group => <GroupListItem group={group}/>}
//                         keyExtractor={item => item.groupId}
//                     />
//                 </SafeAreaView>
//                 : <Text>You have not joined groups yet</Text> }

//                 <Text>Rcommended Groups</Text>
//                 <SafeAreaView>
//                     <FlatList
//                         data={recommendedGroups}
//                         renderItem={recommendedGroups => <GroupListItem group={recommendedGroups}/>}
//                         keyExtractor={item => item.groupId}
//                     />
//                 </SafeAreaView>
//             </View>
//           );

// }

// const styles = StyleSheet.create({
  
//   });
  
//   export default UserGroupsScreen;