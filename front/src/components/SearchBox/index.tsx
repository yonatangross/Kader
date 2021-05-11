import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { IGroup } from '../../types/IGroup';
import GroupListItem from '../GroupListItem';

export interface SearchBoxProps {}

const SearchBox = (props: SearchBoxProps) => {

    const [searchValue, setSearchValue] = useState<string>('');
    const [searchResults, setSearchResults] = useState<IGroup[]>([]); 
   
  
    function searchGroupName(text : string){
        //will ask from server all groups that include "text" in the group name and will set the groups array
        setSearchValue(text);
        setSearchResults([]);
    }


    return (
        <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={text =>searchGroupName(text)}
          value={searchValue}
        />
        {/* {searchResults.length > 0 ?  */}
            <SafeAreaView>
            <FlatList
                data={searchResults}
                renderItem={groupFromSearch => <GroupListItem group={groupFromSearch}/>}
                keyExtractor={item => item.groupId}
            />
        </SafeAreaView>
        
        </View>
      );
  };
  
  export default SearchBox;
  