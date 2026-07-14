export const layouts = {
  hero: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    maxWidth: 760,
  },

  left: {
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "left",
    maxWidth: 650,
  },

  right: {
    justifyContent: "center",
    alignItems: "flex-end",
    textAlign: "right",
    maxWidth: 650,
  },

  bottom: {
    justifyContent: "flex-end",
    alignItems: "center",
    textAlign: "center",
    maxWidth: 760,
  },

  editorial: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    maxWidth: 540,
  },
};

export function getLayout(name) {
  return layouts[name] || layouts.hero;
}