import { Picker } from '@react-native-picker/picker';
import { Button, Icon, CheckBox, Select, SelectItem, IndexPath } from '@ui-kitten/components';
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

const CreateGroupModal = (props: CreateGroupModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const [groupCategory, setGroupCategory] = useState<any>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [groupDescription, setGroupDescription] = useState<string>('');
  const [groupMainLocation, setGroupMainLocation] = useState<string>('');
  const [searchable, setSearchable] = useState<boolean>(false);
  const [groupPrivacyMethod, setGroupPrivacyMethod] = useState<any>(GroupPrivacy.Public);
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const submitGroup = () => {
    addGroup({
      name: groupName,
      category: groupCategory,
      description: groupDescription,
      groupMainLocation: groupMainLocation,
      groupPrivacy: groupPrivacyMethod,
    });
  };

  useEffect(() => {
    let isMounted = true;
    if (submitFlag) {
      submitGroup();
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

        <Text style={styles.labelText}>Group Category</Text>
        <TextInput
          placeholder={'Group Category'}
          style={styles.textInput}
          numberOfLines={1}
          value={groupCategory}
          onChangeText={(groupCategory) => {
            setGroupCategory(groupCategory);
          }}
        />
        <Picker
          selectedValue={groupPrivacyMethod}
          onValueChange={(itemValue) => {
            setGroupCategory(itemValue);
          }}
        >
          {categories.map((item) => {
            return <Picker.Item label={item.name} value={item.id} />;
          })}
        </Picker>

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
        <GooglePlacesAutocomplete
          placeholder="Choose group primary location"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setGroupMainLocation(data.description);
          }}
          query={{
            key: 'AIzaSyDtlSYdojyjmTTwvSYaIP3N50n-OzrWcUg',
            language: 'en',
            components: 'country:il',
          }}
          fetchDetails={true}
        />

        <CheckBox checked={searchable} onChange={(nextChecked) => setSearchable(nextChecked)}>
          {`Searchable: ${searchable}`}
        </CheckBox>

        <Picker
          selectedValue={groupPrivacyMethod}
          onValueChange={(itemValue) => {
            setGroupPrivacyMethod(itemValue);
          }}
        >
          <Picker.Item label="Invisible" value={GroupPrivacy.Invisible} />
          <Picker.Item label="Private" value={GroupPrivacy.Private} />
          <Picker.Item label="Public" value={GroupPrivacy.Public} />
        </Picker>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setSubmitFlag(true);
          }}
          style={styles.finishButton}
        >
          <Text style={styles.finishButtonText}>Submit group</Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  postDetailsContainer: { flexDirection: 'column', width: '100%' },
  labelText: { fontSize: 12, paddingLeft: 10, paddingTop: 10 },
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
