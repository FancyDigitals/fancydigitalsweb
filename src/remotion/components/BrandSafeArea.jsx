import { AbsoluteFill } from "remotion";

export function BrandSafeArea({
  children,
}) {
  return (
    <AbsoluteFill
      style={{
        paddingTop: 90,
        paddingBottom: 190,
        paddingLeft: 70,
        paddingRight: 70,
        pointerEvents: "none",
      }}
    >
      {children}
    </AbsoluteFill>
  );
}