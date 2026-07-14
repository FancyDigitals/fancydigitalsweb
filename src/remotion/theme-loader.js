import apple from "./themes/apple/theme";

const themes = {
  apple,
};

export function getTheme(name = "apple") {
  return themes[name] || apple;
}