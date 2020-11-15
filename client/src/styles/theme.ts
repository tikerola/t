import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
    titleColor: string;
    card: {
      width: string;
    };
    navigation: {
      height: string;
      primaryColor: string;
      secondaryColor: string;
      burgerColor: string;
      menuBgColor: string;
    };
    button: {
      bgColor: string;
      bgHoverColor: string;
    };
    tag: {
      cheap: number;
      moderate: number;
      expensive: number;
      cheapColor: string;
      moderateColor: string;
      expensiveColor: string;
    };
    mobile: string;
    smallPad: string;
    pad: string;
  }
}

export const lightTheme: DefaultTheme = {
  primaryColor: "#333",
  secondaryColor: "#666",
  titleColor: "#222",
  card: {
    width: "220px",
  },
  navigation: {
    height: "60px",
    primaryColor: "rgba(0,0,0,0.7)",
    secondaryColor: "#ccc",
    burgerColor: "#ccc",
    menuBgColor: "rgba(0,0,0,0.95)",
  },
  button: {
    bgColor: "rgba(51, 51, 51, 0.8)",
    bgHoverColor: "#7f7f7f",
  },
  tag: {
    cheap: 30,
    moderate: 60,
    expensive: 100,
    cheapColor: "#f2404e",
    moderateColor: "#b5bb73",
    expensiveColor: "lightseagreen",
  },
  mobile: "576px",
  smallPad: "700px",
  pad: "900px",
};
