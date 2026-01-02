import { Text, TextInput } from 'react-native';

export const setCustomFont = () => {
  // For all <Text> components
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  Text.defaultProps.style = { 
    fontFamily: 'Poppins-Regular'   
  };

  // For all <TextInput> components
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  TextInput.defaultProps.style = {
    fontFamily: 'Poppins-Regular'
  };
};
