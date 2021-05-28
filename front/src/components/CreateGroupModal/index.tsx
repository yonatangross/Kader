import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { addGroup } from '../../services/groups';
import { getCategories } from '../../services/posts';
import { GroupPrivacy } from '../../types/GroupPrivacy';
import { ICategory } from '../../types/ICategory';

export interface CreateGroupModalProps {
  visible: boolean;
  setVisible: Function;
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
    console.log(finalAddress);

    return finalAddress;
  }
  return '';
};

const CreateGroupModal = (props: CreateGroupModalProps) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const [groupCategory, setGroupCategory] = useState<any>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [groupDescription, setGroupDescription] = useState<string>('');
  const [groupMainLocation, setGroupMainLocation] = useState<string>('');
  const [groupPrivacyMethod, setGroupPrivacyMethod] = useState<any>(GroupPrivacy.Public);
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const onPressSubmitGroup = () => {
    setSubmitFlag(true);
    addGroup({
      name: groupName,
      categoryId: groupCategory,
      description: groupDescription,
      address: groupMainLocation,
      groupPrivacy: groupPrivacyMethod,
    })
      .then((response) => {
        props.setVisible(false);
        console.log(`group created successfully:`);
        navigation.navigate('SingleGroup', {
          id: response.data.groupId,
        });
      })
      .catch((error) => {
        console.log(`error while creating group:`);
        console.log(error);
      });
  };

  useEffect(() => {
    let isMounted = true;
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
      <View style={styles.outerContainer}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={props.visible}
          onRequestClose={() => {
            props.setVisible(false);
            console.log('Modal has now been closed.');
          }}
        >
          <Text style={styles.labelText}>Group Name</Text>
          <TextInput
            placeholder={'Group Name'}
            style={styles.textInput}
            numberOfLines={1}
            value={groupName}
            onChangeText={(groupName) => {
              setGroupName(groupName);
            }}
          />

          <Text style={styles.labelText}>Group Description</Text>
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
          <View style={styles.autocompleteContainer}>
            <GooglePlacesAutocomplete
              placeholder="Choose group primary location"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                if (!!details) setGroupMainLocation(formatAddress(details));
              }}
              query={{
                key: 'AIzaSyDtlSYdojyjmTTwvSYaIP3N50n-OzrWcUg',
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
            <TouchableOpacity activeOpacity={0.7} onPress={onPressSubmitGroup} style={styles.finishButton}>
              <Text style={styles.finishButtonText}>Submit group</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: { width: '100%', height: '40%' },
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
  textInput: { fontSize: 16, backgroundColor: '#f1f0f0', borderRadius: 15, margin: 20, padding: 10 },
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

export default CreateGroupModal;
