import { Composition } from "remotion";
import { VideoComposition } from "./compositions/VideoComposition";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="FancyDigitalsVideo"
        component={VideoComposition}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          project: null,
        }}
      />
    </>
  );
};