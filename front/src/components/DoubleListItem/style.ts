import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  MainContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    borderStyle: 'dashed',
    padding: 10,
    alignSelf: 'baseline',
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  DetailsContainer: {
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
    width: 150,
    height: 100,
    borderRadius: 15
  }
});

export default styles;
