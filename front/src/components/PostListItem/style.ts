import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    width: '95%',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  commentNumber: {
    color: 'blue',
  },
  DetailsContainer: {
    justifyContent: 'space-evenly',
    marginLeft: 5,
    marginRight: 5,
  },
  list: {
    width: '100%',
  },
  PostTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  PostedBy: {
    fontSize: 12,
    color: 'grey',
  },

  profileAvatar: {
    marginHorizontal: 8,
  },
});

export default styles;
