import { Picker } from '@react-native-picker/picker';
import { Text, Button, Icon, Input, CheckBox, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { addGroup } from '../../services/groups';
import { GroupPrivacy } from '../../types/GroupPrivacy';

export interface CreateGroupPostModalProps {
  visible: boolean;
  onChange: Function;
}

const AlertIcon = (props: any) => <Icon {...props} name="alert-circle-outline" />;
const StarIcon = (props: any) => <Icon {...props} name="star" />;

const CreateGroupPostModal = (props: CreateGroupPostModalProps) => {
  const [groupName, setGroupName] = useState<string>('');
  const [groupCategory, setGroupCategory] = useState<string>('');
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

  const handleBackButton = () => {
    props.visible = false;

    return true;
  };

  useEffect(() => {
    if (submitFlag) {
      submitGroup();
      setSubmitFlag(false);
    }
  }, [props.visible, submitFlag]);

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={props.visible}
        onRequestClose={() => {
          props.onChange(false);
          console.log('Modal has now been closed.');
        }}
      >
        <View style={styles.header}>
          <Text category="h2">Create Group</Text>
        </View>
        <Input
          value={groupName}
          style={styles.inputField}
          label="Group Name"
          placeholder="Please fill the group name here."
          caption="Should contain at least 3 symbols"
          captionIcon={AlertIcon}
          onChangeText={(groupName) => {
            setGroupName(groupName);
          }}
        />
        <Input
          value={groupCategory}
          style={styles.inputField}
          label="Group primary category"
          placeholder="Please fill the group primary category here."
          caption="Should contain at least 3 symbols"
          captionIcon={AlertIcon}
          onChangeText={(groupCategory) => {
            setGroupCategory(groupCategory);
          }}
        />
        <Input
          multiline={true}
          style={styles.inputField}
          textStyle={{ minHeight: 20 }}
          placeholder="Group Description."
          value={groupDescription}
          onChangeText={(description) => {
            setGroupDescription(description);
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

        <View style={styles.bottom}>
          <Button
            style={styles.button}
            status="success"
            accessoryLeft={StarIcon}
            size="small"
            onPress={() => {
              setSubmitFlag(true);
            }}
          >
            {(buttonProps: any) => (
              <Text {...buttonProps} style={{ color: 'rgba(34, 83, 231,1)' }}>
                Create group
              </Text>
            )}
          </Button>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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

export default CreateGroupPostModal;
