import {DefaultTheme} from '@react-navigation/native';
import colors from '../styles/colors';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};
