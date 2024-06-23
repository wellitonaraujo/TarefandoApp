// CustomCheckBox.js
import React from 'react';
import CheckBox from '@react-native-community/checkbox';

const CustomCheckBox = ({ value, onValueChange, tintColors }) => {
  return (
    <CheckBox
      value={value}
      onValueChange={onValueChange}
      tintColors={tintColors}
    />
  );
};

export default CustomCheckBox;
