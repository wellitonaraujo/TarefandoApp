// src/components/ButtonGroup/index.tsx
import React from 'react';
import * as S from './styles';
import Button from '../Buttom';

interface ButtonGroupProps {
  handleSave: () => void;
  handleCancel: () => void;
  title: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ handleSave, handleCancel, title }) => (
  <S.ButtonWrapper>
    <Button
      title="Salvar alterações"
      variant="primary"
      onPress={handleSave}
      disabled={!title}
    />
    <Button
      title="Cancelar"
      variant="secondary"
      onPress={handleCancel}
    />
  </S.ButtonWrapper>
);

export default ButtonGroup;
