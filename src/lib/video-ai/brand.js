export function buildBrand(input = {}) {
  return {
    logo: input.logo || null,

    watermark: input.watermark || null,

    position:
      input.logoPosition || "bottom-right",

    size:
      input.logoSize || "medium",

    opacity:
      input.logoOpacity ?? 1,

    animation:
      input.logoAnimation || "fade",

    padding:
      Number(input.logoPadding) || 60,

    style:
      input.logoStyle || "original",

    showOn:
      input.logoShowOn || "all",

    colors:
      input.brandColors || [],

    primaryColor:
      input.primaryColor || "#075A01",

    secondaryColor:
      input.secondaryColor || "#FFFFFF",

    font:
      input.brandFont || "Inter",

    company:
      input.businessName || "",

    website:
      input.website || "",

    email:
      input.email || "",

    phone:
      input.phone || "",

    social: {
      facebook:
        input.facebook || "",

      instagram:
        input.instagram || "",

      x:
        input.x || "",

      linkedin:
        input.linkedin || "",

      youtube:
        input.youtube || "",
    },
  };
}