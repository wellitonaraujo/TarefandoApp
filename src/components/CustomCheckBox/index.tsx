import * as S from "./styles"

interface CustomCheckBoxProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

const icons = {
  check: require('../../assets/icons/check.png'),
};

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ value, onValueChange }) => {
  return (
    <S.StyledTouchableOpacity
      activeOpacity={1}
      onPress={() => onValueChange(!value)}
      value={value}
    >
      {value && <S.Checkmark source={icons.check} resizeMode="contain"/>}
    </S.StyledTouchableOpacity>
  );
};

export default CustomCheckBox