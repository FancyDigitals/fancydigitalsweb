import { useAnimation } from "./useAnimation";

export function useSceneAnimation(scene) {
  return useAnimation(
    scene?.animation || "zoom"
  );
}