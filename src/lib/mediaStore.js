const STORAGE_KEY = "fd_media_library_v1";

export function getMediaLibrary() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMediaLibrary(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addMediaItem(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const media = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: reader.result,
        createdAt: new Date().toISOString(),
      };

      const library = getMediaLibrary();
      saveMediaLibrary([media, ...library]);
      resolve(media);
    };

    reader.readAsDataURL(file);
  });
}

export function deleteMediaItem(id) {
  const library = getMediaLibrary().filter((m) => m.id !== id);
  saveMediaLibrary(library);
}
