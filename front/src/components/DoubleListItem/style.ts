import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    marginLeft: 10

  },
  midContainer: {
   marginLeft: 5,
   flex: 2,
   width:24,
   height: 50
   
  },
  username: {
    fontWeight: 'bold',
    fontSize: 12,

  },
  lastMessage: {
    fontSize: 12,
    color: 'grey',
  },
  imageDesign:{
    width: 100,
    height: 100,
    borderRadius: 15
  }
});

export default styles;
