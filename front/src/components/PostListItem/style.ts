import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  //Containers
  container: {
    marginVertical: 10,
    flexDirection: 'column',
    paddingBottom: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between' ,alignItems:'center'},
  dataContainer: { flexDirection: 'row' },

  postDetailsContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  titleAndDescriptionContainer: { flexDirection: 'column', alignItems: 'flex-start' },
  creatorDetailsContainer: { flexDirection: 'row' },
  creatorImageAndRatingContainer: { flexDirection: 'column',marginVertical:15},
  creatorCenterContainer: { flexDirection: 'column', justifyContent: 'center', alignSelf:'center' },
  commentNumber: {
    marginRight: 10,
    alignSelf: 'flex-end',
    color: '#4f76ad',
  },
  imageContainer: {
    margin:15,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#0000',
  },

  postImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    resizeMode: 'contain',
  },
  profileImageContainer:{
    margin: 15,
    marginLeft:45,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  profileImage: {
    margin: 15,
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 100,
  },
 
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    overflow: 'hidden',
  },
  descriptionText: {
    fontSize: 12,
    overflow: 'hidden',
    maxWidth:200
  },
  groupNameTitle: { color: 'grey', fontSize: 13 },
  PostedBy: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202020',
  },
  postTypeAndGroupNameText: { color: '#696969', fontSize: 14,maxWidth:200 },
  postDate: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: 'black',
  },
  categoryContainer: {
    margin: 15,
    marginRight:20,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    
  },
  categoryIcon: {
    marginVertical: 15,
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  arrowIcon: { height: 24, width: 24 },
});

export default styles;
