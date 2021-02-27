import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 10,
    flexDirection: 'row',
    width: "95%",
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    borderStyle: 'dashed',
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  ImageContainer: {
    padding: 5,
    alignItems: 'flex-start',
    
  
  },
  DetailsContainer: {
    justifyContent: 'space-evenly',
    marginLeft: 5,
    marginRight: 5
  },

  PostTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  PostedBy: {
    fontSize: 12,
    color: 'grey',
  },
  imageDesign:{
    width: 200,
    height: 100,
    borderRadius: 15,
   
  }
});

export default styles;
