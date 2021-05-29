import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  //Containers
  container: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
  },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  dataContainer: { flexDirection: 'row', width: '100%' },

  postDetailsContainer: {
    width: '100%',
    flexDirection: 'row',
    margin: 10,
  },
  titleAndDescriptionContainer: { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around', width: '60%' },
  creatorDetailsContainer: { flexDirection: 'row' },
  creatorImageAndRatingContainer: { flexDirection: 'column', marginRight: 20 },
  creatorCenterContainer: { flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', marginVertical: 15, width: '50%' },
  commentNumber: {
    marginRight: 10,
    alignSelf: 'flex-end',
    color: '#4f76ad',
  },

  profileImageContainer: {
    margin: 15,
    marginLeft: 30,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderColor: 'black',
    borderWidth: 2,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  categoryContainer: {
    margin: 15,
    marginRight: 30,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderColor: 'black',
    borderWidth: 2,
  },
  categoryIcon: {
    marginVertical: 15,
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
  postImageContainer: {
    marginHorizontal: 15,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#0000',
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    resizeMode: 'contain',
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    maxWidth: 250,

    overflow: 'hidden',
  },
  descriptionText: {
    fontSize: 16,
    overflow: 'hidden',
    maxWidth: 250,
  },
  groupNameTitle: { color: 'grey', fontSize: 13 },
  PostedBy: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202020',
  },
  postTypeAndGroupNameText: { color: '#696969', fontSize: 14, maxWidth: 200 },
  postDate: {
    alignSelf: 'flex-start',
    fontSize: 10,
    color: 'black',
  },

  arrowIcon: { height: 24, width: 24 },
  groupText: { fontSize: 14, fontWeight: 'bold', color: 'black' },
});

export default styles;
