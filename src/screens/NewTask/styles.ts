import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
  padding: 16px;
  justify-content: space-between;
`;

export const TextInputTitle = styled.TextInput`
  background-color: ${colors.background};
  color: ${colors.grey.s300};
  padding-left: 10px;
  border-radius: 30px;
  font-size: 16px;
  border-color: ${({isEmpty}) =>
    isEmpty ? colors.priority.high : colors.grey.s200};
  border-width: 1px;
`;

export const TextAreaWithBorder = styled.TextInput`
  background-color: ${colors.background};
  color: ${colors.grey.s200};
  text-align-vertical: top;
  padding-left: 10px;
  font-size: 16px;
  height: 100px;
  border-radius: 25px;
  border: solid 1px ${colors.grey.s300};
`;

export const ErrorLength = styled.Text`
  color: ${colors.priority.high};
`;

export const Title = styled.Text`
  color: ${colors.title};
  margin: 0 0 10px 10px;
  letter-spacing: 1.3px;
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin: 5px;
  opacity: 0.7;
`;

export const DateWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export const DateInput = styled.Pressable`
  border-radius: 40px;
  z-index: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: solid 1px ${colors.grey.s300};
  width: 100px;
  height: 55px;
`;

export const SelectedDateText = styled.Text`
  color: ${colors.title};
  font-size: 15px;
`;

export const PriorityButton = styled.Pressable<{selected: boolean}>`
  border-radius: 40px;
  z-index: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: solid 1px
    ${({selected}) => (selected ? 'currentColor' : colors.grey.s300)};
  width: 100px;
  height: 55px;
`;

export const PriorityWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
`;

export const PrimaryButton = styled.Pressable`
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary.s300};
  width: 100%;
  height: 55px;
  margin-top: 20px;
`;

export const PrimaryButtonText = styled.Text`
  color: ${colors.background};
  font-size: 16px;
`;
