import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  //Containers
  hideCommentsContainer: { borderBottomWidth: 10, borderBottomColor: '#dedcdf' },
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
    marginTop: 20,
  },
  titleAndDescriptionContainer: { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around', width: '55%' },
  creatorDetailsContainer: { flexDirection: 'row' },
  creatorImageAndRatingContainer: { flexDirection: 'column', marginRight: 20 },
  creatorCenterContainer: { flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, width: '60%' },
  commentNumber: {
    marginRight: 10,
    alignSelf: 'flex-end',
    color: '#4f76ad',
  },

  profileImageContainer: {
    margin: 15,
    marginRight:0,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderColor: 'black',
    borderWidth: 2,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  categoryContainer: {
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
    alignSelf: 'center',
    marginRight: 15,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    elevation: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#0000',
  },
  postImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    maxWidth: 250,

    overflow: 'hidden',
  },
  descriptionText: {
    fontSize: 14,
    overflow: 'hidden',
    maxWidth: 250,
  },
  groupNameTitle: { color: 'grey', fontSize: 13 },
  PostedBy: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202020',
  },
  postTypeAndGroupNameText: { color: '#696969', fontSize: 16, maxWidth: 200 },
  postDate: {
    alignSelf: 'flex-start',
    fontSize: 12,
    color: 'black',
  },

  arrowIcon: { height: 24, width: 24 },
  groupText: { fontSize: 16, fontWeight: 'bold', color: 'black' },
});

export default styles;
