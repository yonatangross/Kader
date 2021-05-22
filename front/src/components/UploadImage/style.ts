import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonsContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-around', backgroundColor: 'white' },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  uploadFromCameraButton: {
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
  uploadFromGalleryButton: {
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
    margin: 15,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#0000',
  },
  postImage: {
    width: 200,
    height: 150,
    borderRadius: 15,
    resizeMode: 'contain',
  },
});

export default styles;
