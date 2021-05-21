import { Button, Icon, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { getCategories } from '../../services/posts';

export interface PostCategorySelectorProps {
  active: number;
  dispatch: Function;
  setActiveSection: Function;
  numberOfSections: number;
}
const PlusIcon = () => <Icon name="plus-circle-outline" style={{ width: 32, height: 32 }} fill={'rgba(34, 83, 231)'} />;

const PostCategorySelector = (props: PostCategorySelectorProps) => {
  const [categories, setCategories] = useState<string[]>([
    'Boxing',
    'Cooking',
    'Sports',
    'Religion',
    'Music',
    'Shopping',
    'Gardening',
    'Programming',
    'Kitchen',
  ]);

  useEffect(() => {
    fetchCategories();
  }, [props.setActiveSection]);

  const fetchCategories = (): void => {
    getCategories()
      .then(({ data: { categories } }: string[] | any) => setCategories(categories))
      .catch((err: Error) => console.log(`err on getCategories: ${err}`));
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: -20,
      }}
    >
      <Button
        style={styles.button}
        size="small"
        onPress={() => {
          props.dispatch({ type: 'Category', payload: item });
          props.setActiveSection(2);
        }}
      >
        {(buttonProps: any) => (
          <Text {...buttonProps} style={styles.buttonText}>
            {item}
          </Text>
        )}
      </Button>
    </View>
  );

  if (props.active === 1) {
    return (
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={{ flex: 1, justifyContent: 'space-around' }}
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={3}
        />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent:'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor:'#4875aa',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 30,
    height: 120,
    width: 120,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default PostCategorySelector;
