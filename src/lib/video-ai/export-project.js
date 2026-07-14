/**
 * Called at the end of the generation pipeline.
 * Just wraps the project with version metadata.
 * Does NOT strip anything — preview needs full data.
 * Payload stripping happens client-side before /export call.
 */
export function exportProject(project) {
  if (!project) return project;

  return {
    version: 1,
    createdAt: new Date().toISOString(),
    ...project,
  };
}

/**
 * Called client-side right before hitting /api/export.
 * Strips heavy base64 blobs that Chrome can't refetch from a URL anyway
 * — but leaves data URLs alone (Remotion renderer can use them directly).
 *
 * The 10MB request body limit is the real constraint. So we strip:
 *  - uploads[].image (originals no longer needed — already assigned to scenes)
 *  - Anything else purely informational
 */
export function sanitizeProjectForExport(project) {
  if (!project) return project;

  const clean = { ...project };

  // Uploads originals are heavy AND unused during render (media is on scenes)
  if (Array.isArray(clean.uploads)) {
    clean.uploads = clean.uploads.map((u) => {
      const { image, ...rest } = u || {};
      return rest;
    });
  }

  // Keep scene.mediaUrl AS-IS (data URLs work fine in Remotion render)
  return clean;
}