import { renderModernScene } from "../canvas-renderers";
import { renderLuxuryScene } from "./luxury-template";

export const TEMPLATES = {
  modern: {
    id: "modern",
    name: "Modern",
    description: "Bold, high-energy, kinetic typography",
    renderer: renderModernScene,
  },
  luxury: {
    id: "luxury",
    name: "Luxury",
    description: "Elegant serif, gold accents, refined",
    renderer: renderLuxuryScene,
  },
};

export function getRenderer(templateId = "modern") {
  return TEMPLATES[templateId]?.renderer || renderModernScene;
}