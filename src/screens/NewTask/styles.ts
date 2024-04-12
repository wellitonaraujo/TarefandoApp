import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
  padding: 16px;
  justify-content: space-between;
`;

export const TextInputTitle = styled.TextInput`
  background-color: ${colors.grey.s300};
  color: ${colors.title};
  padding-left: 10px;
  border-radius: 25px;
  font-size: 16px;
  border-color: ${({isEmpty}: any) =>
    isEmpty ? colors.priority.high : colors.grey.s300};
  border-width: 1px;
`;

export const TextAreaWithBorder = styled.TextInput`
  background-color: ${colors.grey.s300};
  color: ${colors.title};
  text-align-vertical: top;
  padding-left: 10px;
  font-size: 16px;
  height: 90px;
  border-radius: 20px;
  border: solid 1px ${colors.grey.s300};
`;

export const ErrorLength = styled.Text`
  color: ${colors.priority.high};
`;

export const Title = styled.Text`
  color: ${colors.title};
  margin: 0 0 5px 10px;
  letter-spacing: 1.3px;
  font-size: 16px;
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
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
  justify-content: space-around;
  padding: 0 10px;
  align-items: center;
  text-align: center;

  background-color: ${colors.grey.s300};
  width: 100px;
  height: 50px;
`;

export const SelectedDateText = styled.Text`
  color: ${colors.title};
  font-size: 16px;
`;
