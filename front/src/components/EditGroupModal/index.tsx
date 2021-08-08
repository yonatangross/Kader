import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { addGroup } from '../../services/groups';
import { getCategories } from '../../services/categories';
import { GroupPrivacy } from '../../types/GroupPrivacy';
import { ICategory } from '../../types/ICategory';
import { IGroup } from '../../types/IGroup';
import * as _ from 'lodash';

export interface EditGroupModalProps {
  visible: boolean;
  setVisible: Function;
  group: IGroup;
}

const formatAddress = (addressDetails: any) => {
  var routeName: string = '';
  var streetNumber: number = 0;
  var locality: string = '';
  var finalAddress: string = '';

  if (!!addressDetails) {
    let addressComponents = addressDetails.address_components;

    addressComponents.forEach((addressComponent: any) => {
      if (addressComponent.types[0] === 'route') routeName = addressComponent.long_name;
      if (addressComponent.types[0] === 'street_number') streetNumber = addressComponent.long_name;
      if (addressComponent.types[0] === 'locality') locality = addressComponent.long_name;
    });

    if (streetNumber == 0) {
      finalAddress = routeName + ', ' + locality;
    } else finalAddress = routeName + ' ' + streetNumber + ', ' + locality;

    return finalAddress;
  }
  return '';
};

const EditGroupModal = (props: EditGroupModalProps) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const [groupCategory, setGroupCategory] = useState<any>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [groupDescription, setGroupDescription] = useState<string>('');
  const [groupMainLocation, setGroupMainLocation] = useState<string>('');
  const [groupPrivacyMethod, setGroupPrivacyMethod] = useState<any>(GroupPrivacy.Public);
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const [group, setGroup] = useState<IGroup>();

  const onPressSubmitEditedGroup = () => {
    setSubmitFlag(true);
    if (!!group) {
      let updatedGroup: IGroup = group;
      updatedGroup.name = groupName;
      if (groupCategory != group?.category.id) {
        let groupUpdatedCategory: ICategory[] = _.filter(categories, (categoryId) => {
          return categoryId === groupCategory;
        });
        updatedGroup.category = groupUpdatedCategory[0];
      }
      updatedGroup.description = groupDescription;
      updatedGroup.address = groupMainLocation;
      updatedGroup.groupPrivacy = groupPrivacyMethod;
      addGroup(updatedGroup)
        .then((response) => {
          props.setVisible(false);
          console.log(`group created successfully:`);
          navigation.navigate('SingleGroup', {
            id: response.data.groupId,
          });
          setGroupName('');
          setGroupDescription('');
          setGroupMainLocation('');
        })
        .catch((error) => {
          console.log(`error while creating group:`);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    let isMounted = true;
    setGroup(props.group);
    setGroupName(props.group.name);
    setGroupDescription(props.group.description);
    setGroupMainLocation(props.group.mainLocation);
    setGroupPrivacyMethod(props.group.groupPrivacy);
    if (submitFlag) {
      setSubmitFlag(false);
    }
    getCategories()
      .then((response) => {
        if (isMounted) {
          const categoriesResult: ICategory[] = response.data;
          setCategories(categoriesResult);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(`error while fetching categories ${error}`);
      });
    () => {
      isMounted = false;
    };
  }, [props.visible, submitFlag]);

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={props.visible}
        onRequestClose={() => {
          props.setVisible(false);
          console.log('Modal has now been closed.');
        }}
      >
        <Text style={styles.createGroupText}>Create Group</Text>
        <TextInput
          placeholder={'Group Name'}
          style={styles.textInput}
          numberOfLines={1}
          value={groupName}
          onChangeText={(groupName) => {
            setGroupName(groupName);
          }}
        />

        <TextInput
          placeholder={'Group Description'}
          style={styles.textInput}
          numberOfLines={3}
          multiline
          value={groupDescription}
          onChangeText={(groupDescription) => {
            setGroupDescription(groupDescription);
          }}
        />

        <View style={styles.autocompleteContainer}>
          <GooglePlacesAutocomplete
            placeholder={!!groupMainLocation ? groupMainLocation : 'Choose group primary location'}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              if (!!details) setGroupMainLocation(formatAddress(details));
            }}
            query={{
              key: 'AIzaSyB9Q-gb22IQY92mNyZY6XFs0dDfcU7joAY',
              language: 'iw',
              components: 'country:il',
            }}
            fetchDetails={true}
            styles={{
              container: {
                flexDirection: 'column',
              },
              listView: {
                height: 200,
                backgroundColor: 'white',
                borderRadius: 15,
                paddingBottom: 10,
                paddingHorizontal: 10,
                marginHorizontal: 20,
                elevation: 3,
              },
              textInput: {
                fontSize: 16,
                backgroundColor: '#f1f0f0',
                borderRadius: 15,
                margin: 20,
                padding: 10,
              },
              description: {
                // color: '#ac879a',
                fontWeight: '300',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />
        </View>

        <Text style={styles.labelText}>Group Category</Text>
        <Picker
          style={styles.picker}
          selectedValue={groupCategory}
          onValueChange={(itemValue) => {
            console.log(itemValue);

            setGroupCategory(itemValue);
          }}
        >
          {categories.map((item, index) => {
            return <Picker.Item label={item.name} value={item.id} key={index} />;
          })}
        </Picker>
        <Text style={styles.labelText}>Group Privacy</Text>

        <Picker
          style={styles.picker}
          selectedValue={groupPrivacyMethod}
          onValueChange={(itemValue) => {
            setGroupPrivacyMethod(itemValue);
          }}
        >
          <Picker.Item label="Invisible" value={GroupPrivacy.Invisible} />
          <Picker.Item label="Private" value={GroupPrivacy.Private} />
          <Picker.Item label="Public" value={GroupPrivacy.Public} />
        </Picker>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressSubmitEditedGroup} style={styles.finishButton}>
          <Text style={styles.finishButtonText}>Submit group</Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  createGroupText: { fontSize: 20, fontWeight: 'bold', margin: 20, marginBottom: 5 },
  autocompleteContainer: { width: '100%', height: 300 },
  outerContainer: { height: '100%', width: '100%', flex: 1 },
  picker: { marginHorizontal: 20 },
  postDetailsContainer: { flexDirection: 'column', width: '100%' },
  labelText: { fontSize: 16, marginHorizontal: 20, paddingTop: 10 },
  finishButton: {
    backgroundColor: '#047cfb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 0.8,
    borderColor: '#394d51',
    margin: 10,
    marginTop: 30,
    marginRight: 40,
    marginLeft: 40,
    padding: 10,
  },
  finishButtonText: { fontSize: 20, fontWeight: 'bold' },

  text: { margin: 5 },
  textInput: { fontSize: 16, backgroundColor: '#f1f0f0', borderRadius: 15, marginHorizontal: 20, marginVertical: 10, padding: 10 },
  inputField: {
    marginBottom: 20,
    marginTop: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginRight: 40,
    marginLeft: 40,
    backgroundColor: '#007aff',
    borderWidth: 0.5,
    borderColor: 'black',
  },
});

export default EditGroupModal;
