import CheckBox from '@react-native-community/checkbox';

interface CustomCheckBoxProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  tintColors?: {
    true: string;
    false: string;
  };
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ 
  value, 
  onValueChange, 
  tintColors 
}) => {
  return (
    <CheckBox
      value={value}
      onValueChange={onValueChange}
      tintColors={tintColors}
    />
  );
};

export default CustomCheckBox;

