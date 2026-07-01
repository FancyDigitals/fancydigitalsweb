"use client";

/**
 * Records the current video player output using MediaRecorder
 * @param {HTMLElement} playerEl - The Remotion Player DOM element
 * @param {number} durationMs - Total video duration in ms
 * @param {Function} onProgress - Callback (0-100)
 * @returns {Promise<Blob>} - WebM blob
 */
export async function renderVideoToWebM(playerEl, durationMs, onProgress) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = playerEl.querySelector("canvas");
      if (!canvas) {
        return reject(new Error("Could not find video canvas"));
      }

      const stream = canvas.captureStream(30);

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";

      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 5_000_000,
      });

      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        resolve(blob);
      };

      recorder.onerror = (e) => reject(e.error || new Error("Recording failed"));

      const startTime = Date.now();
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
        onProgress?.(pct);
        if (elapsed >= durationMs) clearInterval(progressInterval);
      }, 200);

      recorder.start();

      setTimeout(() => {
        recorder.stop();
        clearInterval(progressInterval);
      }, durationMs + 500);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Triggers browser download of a blob
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}