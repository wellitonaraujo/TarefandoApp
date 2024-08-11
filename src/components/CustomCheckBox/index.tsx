import { imgs } from "@/src/screens/imgs";
import * as S from "./styles"

interface CustomCheckBoxProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ value, onValueChange }) => {
  return (
    <S.StyledTouchableOpacity
      activeOpacity={1}
      onPress={() => onValueChange(!value)}
      value={value}
    >
      {value && <S.Checkmark source={imgs.check} />}
    </S.StyledTouchableOpacity>
  );
};

export default CustomCheckBox