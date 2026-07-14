import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

export function FloatingParticles() {
  const frame =
    useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        pointerEvents:"none",
      }}
    >
      {[...Array(18)].map((_,i)=>{

        const y =
          interpolate(
            frame,
            [0,240],
            [1200,-300]
          ) + i*120;

        return (
          <div
            key={i}
            style={{
              position:"absolute",

              left:(i*70)%1080,

              top:y,

              width:3,

              height:3,

              borderRadius:"50%",

              background:"#fff",

              opacity:.12,

              filter:"blur(1px)",
            }}
          />
        );

      })}
    </AbsoluteFill>
  );
}