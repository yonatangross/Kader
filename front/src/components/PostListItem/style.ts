import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    width: "98%",
    justifyContent: 'space-between',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    borderStyle: 'dashed',
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 5,
  },

  lefContainer: {
    flexDirection: 'row',
    padding: 5,
  },

  midContainer: {
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },

  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
  imageDesign:{
    width: 200,
    height: 100,
    borderRadius: 15,
   
  }
});

export default styles;
