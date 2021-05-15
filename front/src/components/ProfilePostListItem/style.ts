import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'column',
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
  postDetailsContainer: {
    justifyContent: 'space-evenly',
    marginLeft: 5,
    marginTop: 5,
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
    fontWeight: 'bold',
    color: 'grey',
  },
  PostCreatorDetailsContainer: { flexDirection: 'column' },
  postHeader: { flexDirection: 'row' },
  postHeaderDetails: { flexDirection: 'column', flex: 1 },
  postDate: {
    fontSize: 12,
    color: 'grey',
  },
  PostTitleAndGroup: { flexDirection: 'row', flexWrap: 'wrap' },
  profileAvatar: {
    marginHorizontal: 8,
  },
  arrowIcon: { height: 24, width: 24 },
});

export default styles;
