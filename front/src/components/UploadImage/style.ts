import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonsContainer: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  buttonContainer: {
    margin: 5,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    borderColor: 'black',
    borderWidth: 0.8,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
  },
  postImageContainer: {
    margin: 10,
    marginRight: 0,
    marginBottom: 2,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#0000',
    borderColor: 'black',
    borderWidth: 2,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: 150,
    height: 150,
    borderRadius: 30,
  },
});

export default styles;
