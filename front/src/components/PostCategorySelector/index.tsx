import { Button, Icon, List, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getCategories } from '../../services/posts';

export interface PostCategorySelectorProps {
  active: number;
  dispatch: Function;
  setActiveSection: Function;
  numberOfSections: number;
}
const PlusIcon = () => <Icon name="plus-circle-outline" style={{ width: 32, height: 32 }} fill={'rgba(34, 83, 231)'} />;

const PostCategorySelector = (props: PostCategorySelectorProps) => {
  const [categories, setCategories] = useState<string[]>(['sports', 'religion', 'music']);

  useEffect(() => {
    fetchCategories();
  }, [props.setActiveSection]);

  const fetchCategories = (): void => {
    getCategories()
      .then(({ data: { categories } }: string[] | any) => setCategories(categories))
      .catch((err: Error) => console.log(`err on getCategories: ${err}`));
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <Button
      style={styles.button}
      status="success"
      accessoryLeft={PlusIcon}
      size="small"
      onPress={() => {
        props.dispatch({ type: 'Category', payload: item });
        props.setActiveSection(2);
      }}
    >
      {(buttonProps: any) => (
        <Text {...buttonProps} style={styles.buttonText}>
          {item}-{index}
        </Text>
      )}
    </Button>
  );

  if (props.active === 1) {
    return (
      <>
        <List data={categories} renderItem={renderItem} />
      </>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    margin: 30,
    marginRight: 40,
    marginLeft: 40,
    height: 150,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 36,
  },
});

export default PostCategorySelector;
