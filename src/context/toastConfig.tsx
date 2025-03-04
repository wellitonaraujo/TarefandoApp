import { BaseToast, ErrorToast } from "react-native-toast-message";
import { ViewStyle, TextStyle } from "react-native";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={customToastStyle}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={customToastStyle}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      
    />
  ),
};

const customToastStyle: ViewStyle = {
  width: "50%",
  height: 35,
  borderRadius: 40,
  borderLeftWidth: 0, 
};

const contentContainerStyle: ViewStyle = {
  paddingHorizontal: 8,
};

const text1Style: TextStyle = {
  fontSize: 12,
  textAlign: "center",
};