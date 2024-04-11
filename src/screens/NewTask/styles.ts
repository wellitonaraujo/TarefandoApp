import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 16px;
  flex-direction: column;
  justify-content: space-around;
`;

export const TextInputTitle = styled.TextInput`
  background-color: ${colors.background};
  color: ${colors.grey.s300};
  padding-left: 10px;
  border-radius: 30px;
  font-size: 16px;
`;

export const TextAreaWithBorder = styled.TextInput`
  background-color: ${colors.background};
  color: ${colors.grey.s200};
  text-align-vertical: top;
  padding-left: 10px;
  font-size: 16px;
  height: 130px;
  border-radius: 30px;
  border: solid 1px ${colors.grey.s300};
`;

export const ErrorLength = styled.Text`
  color: ${colors.primary.s300};
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
