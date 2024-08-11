import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import * as S from './styles';

interface ButtonGroupProps {
    handleSave: () => void;
    handleCancel: () => void;
    title: string;
  }
  
  const ButtonGroup: React.FC<ButtonGroupProps> = ({
    handleSave, 
    handleCancel, 
    title
  }) => (
    <S.ButtomWrapper>
      <PrimaryButton
        title="Salvar alterações"
        onPress={handleSave}
        disabled={!title}
      />
      <SecondaryButton title="Cancelar" onPress={handleCancel} />
    </S.ButtomWrapper>
  );

  export default ButtonGroup;
  