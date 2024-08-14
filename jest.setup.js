import mockClipboard from "@react-native-clipboard/clipboard/jest/clipboard-mock.js";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import theme from "@themes";
import React from "react";
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";
import { ThemeProvider } from "styled-components/native";

jest.mock("react-native-gesture-handler", () => {
  return {
    PanGestureHandler: jest.fn(({ children }) => children),
    GestureHandlerRootView: jest.fn(({ children }) => children),
    State: {},
    TouchableOpacity: jest.fn(({ children }) => children),
  };
});

jest.mock("@react-native-clipboard/clipboard", () => mockClipboard);

jest.mock("react-native-safe-area-context", () => ({
  ...mockSafeAreaContext,
  useSafeAreaInsets: jest.fn(mockSafeAreaContext.useSafeAreaInsets),
}));

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  NavigationContainer: ({ children }) => <> {children} </>,
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useRoute: jest.fn(() => ({
    params: jest.fn(),
  })),
}));

require("react-native-reanimated").setUpTests();

jest.mock("react-native/Libraries/Components/Touchable/TouchableHighlight.js", () => {
  const { View } = require("react-native");
  const MockTouchable = props => {
    return <View {...props} />;
  };

  MockTouchable.displayName = "TouchableHighlight";

  return MockTouchable;
});

jest.mock("@services/configs/mmkvConfig", () => ({
  storage: {
    getString: jest.fn().mockImplementation(() => ""),
    set: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("react-native-device-info", () => mockRNDeviceInfo);

global.renderWithTheme = (ui, options) => {
  return render(
    <ThemeProvider theme={theme}>
      <NavigationContainer> {ui} </NavigationContainer>
    </ThemeProvider>,
    options,
  );
};
 