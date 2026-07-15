import apple from "./themes/apple/theme";
import launch from "./themes/launch/theme";
import explainer from "./themes/explainer/theme";

const themes = {
  apple,
  launch,
  explainer,
};

export function getTheme(name = "apple") {
  return themes[name] || apple;
}

export function listThemes() {
  return Object.values(themes).map((t) => ({ id: t.id, name: t.name }));
}