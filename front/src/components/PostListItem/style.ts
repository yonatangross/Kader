import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  mainContainer:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  container: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    padding: 10,

  },
  lefContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  midContainer: {
    justifyContent: 'space-evenly',
    marginLeft: 10
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
  time: {
    fontSize: 14,
    color: 'grey'
  },
  imageDesign:{
    width: 200,
    height: 100,
    borderRadius: 15,
   
  
  }
});

export default styles;
