import {
  bundle,
  renderMedia,
  selectComposition,
} from "@remotion/renderer";

import path from "path";

export async function renderProject(project) {
  const entry = path.join(
    process.cwd(),
    "src/remotion/index.jsx"
  );

  const bundleLocation = await bundle({
    entryPoint: entry,
  });

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "FancyDigitalsVideo",
    inputProps: {
      project,
    },
  });

  const output = path.join(
    process.cwd(),
    "public",
    "renders",
    `${Date.now()}.mp4`
  );

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: output,
    inputProps: {
      project,
    },
  });

  return output;
}