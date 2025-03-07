import styled from 'styled-components/native';
import { TouchableOpacity, TextInput } from 'react-native';
import colors from '@/src/themes/colors';

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContainer = styled.View`
  background-color: ${colors.white};
  padding: 16px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  align-items: flex-start;
`;

export const InputWrapper = styled.View`
  width: 100%;
`;

export const StyledTextInput = styled(TextInput)`
  font-size: 15px;
  font-weight: 400;
  background-color: ${colors.backgound};
  height: 50px;
  border-radius: 10px;
  padding: 0 16px;
  color: ${colors.gray_500};
  margin-bottom: 8px;
`;

export const Underline = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.primary};
`;

export const DateWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.gray_200};
`;

export const SendButton = styled(TouchableOpacity)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 40px;
  height: 40px;
  background-color: ${colors.primary};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export const SendIcon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const DateIcon = styled.Image`
  width: 13px;
  height: 13px;
`;

export const SubtaskWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  background-color: ${colors.white};
`;

export const SubtaskInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: ${colors.gray_300};
  padding: 0;
`;

export const RemoveIconWrapper = styled.Pressable`
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

export const RemoveIcon = styled.Image`
  width: 10px;
  height: 10px;
  justify-content: center;
  align-items: center;
`;

export const AddSubtaskButton = styled.TouchableOpacity`
  margin-left: 15px;
  padding: 3px;
`;

export const AddSubtaskIcon = styled.Image`
  width: 12px;
  height: 12px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 7px;
`;

export const SubtasksContainer = styled.View`
  max-height: 120px;
  width: 100%;
  margin-bottom: 10px;
`;

export const SubtasksScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 8,
  },
  keyboardShouldPersistTaps: 'handled',
})`
  width: 100%;
`;
