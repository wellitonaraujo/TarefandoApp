import Toast from 'react-native-toast-message';
import { useCallback } from 'react';

export const useTaskValidation = () => {
  const validateEmptyName = useCallback((name: string) => {
    if (name.trim() === "") {
      Toast.show({
        type: "error",
        text1: "O nome não pode ficar vazio",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
      });
      return false;
    }
    return true;
  }, []);

  return { validateEmptyName };
};