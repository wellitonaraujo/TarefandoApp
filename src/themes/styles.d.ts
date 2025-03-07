import "styled-components/native";

import theme from "@themes";

export type Theme = typeof theme;

declare module "styled-components/native" {
  export interface DefaultTheme extends Theme {}
}
