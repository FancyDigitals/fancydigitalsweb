export function validateProject(project) {
  if (!project) {
    throw new Error("Project generation failed.");
  }

  if (!Array.isArray(project.scenes)) {
    throw new Error("No scenes returned.");
  }

  if (project.scenes.length === 0) {
    throw new Error("Scene list is empty.");
  }

  return project;
}