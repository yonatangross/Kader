import { Text, Button, Icon, Input } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import { addGroup } from '../../api/groups';
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
  const [groupPrivacyMethod, setGroupPrivacyMethod] = useState<GroupPrivacy>(GroupPrivacy.PUBLIC);

  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const submitGroup = () => {
    addGroup({
      name: groupName,
      category: groupCategory,
      description: groupDescription,
      groupPrivacy: groupPrivacyMethod,
    });
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
          // console.log('Modal has now been closed.');
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
  },
});

export default CreateGroupPostModal;
