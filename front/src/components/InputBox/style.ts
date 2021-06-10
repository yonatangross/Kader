import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 0,
    backgroundColor: 'white',
    width: '100%',
  },
  contentContainer: {
    alignSelf: 'flex-end',
    width: '100%',
    flexDirection: 'row',

    alignItems: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    flex: 1,
    alignItems: 'flex-end',
    maxHeight: 50,
  },
  textInput: {
    marginHorizontal: 10,
  },
  icon: { marginHorizontal: 5 },
  buttonContainer: {
    marginRight: 5,
    backgroundColor: '#2f3e75',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
