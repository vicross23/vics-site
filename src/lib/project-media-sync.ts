import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

const SYNC_CONTEXT_KEY = "skipProjectMediaSync";

function normalizeRelationshipIDs(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const ids = value.flatMap((item) => {
    if (typeof item === "string") {
      return [item];
    }

    if (
      item &&
      typeof item === "object" &&
      "id" in item &&
      typeof item.id === "string"
    ) {
      return [item.id];
    }

    return [];
  });

  return [...new Set(ids)];
}

function addID(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids : [...ids, id];
}

function removeID(ids: string[], id: string): string[] {
  return ids.filter((existingID) => existingID !== id);
}

export const syncProjectImagesToMedia: CollectionAfterChangeHook = async ({
  context,
  doc,
  previousDoc,
  req,
}) => {
  if (context[SYNC_CONTEXT_KEY]) {
    return doc;
  }

  const nextImageIDs = normalizeRelationshipIDs(doc.images);
  const previousImageIDs = normalizeRelationshipIDs(previousDoc.images);

  const addedImageIDs = nextImageIDs.filter((id) => !previousImageIDs.includes(id));
  const removedImageIDs = previousImageIDs.filter(
    (id) => !nextImageIDs.includes(id)
  );

  await Promise.all([
    ...addedImageIDs.map(async (imageID) => {
      const mediaDoc = await req.payload.findByID({
        collection: "media",
        id: imageID,
        depth: 0,
        overrideAccess: true,
        req,
      });

      const mediaProjectIDs = addID(
        normalizeRelationshipIDs(mediaDoc.projects),
        String(doc.id)
      );

      await req.payload.update({
        collection: "media",
        id: imageID,
        data: {
          projects: mediaProjectIDs,
        },
        depth: 0,
        overrideAccess: true,
        context: {
          ...context,
          [SYNC_CONTEXT_KEY]: true,
        },
        req,
      });
    }),
    ...removedImageIDs.map(async (imageID) => {
      const mediaDoc = await req.payload.findByID({
        collection: "media",
        id: imageID,
        depth: 0,
        overrideAccess: true,
        req,
      });

      const mediaProjectIDs = removeID(
        normalizeRelationshipIDs(mediaDoc.projects),
        String(doc.id)
      );

      await req.payload.update({
        collection: "media",
        id: imageID,
        data: {
          projects: mediaProjectIDs,
        },
        depth: 0,
        overrideAccess: true,
        context: {
          ...context,
          [SYNC_CONTEXT_KEY]: true,
        },
        req,
      });
    }),
  ]);

  return doc;
};

export const syncMediaProjectsToProject: CollectionAfterChangeHook = async ({
  context,
  doc,
  previousDoc,
  req,
}) => {
  if (context[SYNC_CONTEXT_KEY]) {
    return doc;
  }

  const nextProjectIDs = normalizeRelationshipIDs(doc.projects);
  const previousProjectIDs = normalizeRelationshipIDs(previousDoc.projects);

  const addedProjectIDs = nextProjectIDs.filter(
    (id) => !previousProjectIDs.includes(id)
  );
  const removedProjectIDs = previousProjectIDs.filter(
    (id) => !nextProjectIDs.includes(id)
  );

  await Promise.all([
    ...addedProjectIDs.map(async (projectID) => {
      const projectDoc = await req.payload.findByID({
        collection: "projects",
        id: projectID,
        depth: 0,
        overrideAccess: true,
        req,
      });

      const projectImageIDs = addID(
        normalizeRelationshipIDs(projectDoc.images),
        String(doc.id)
      );

      await req.payload.update({
        collection: "projects",
        id: projectID,
        data: {
          images: projectImageIDs,
        },
        depth: 0,
        overrideAccess: true,
        context: {
          ...context,
          [SYNC_CONTEXT_KEY]: true,
        },
        req,
      });
    }),
    ...removedProjectIDs.map(async (projectID) => {
      const projectDoc = await req.payload.findByID({
        collection: "projects",
        id: projectID,
        depth: 0,
        overrideAccess: true,
        req,
      });

      const projectImageIDs = removeID(
        normalizeRelationshipIDs(projectDoc.images),
        String(doc.id)
      );

      await req.payload.update({
        collection: "projects",
        id: projectID,
        data: {
          images: projectImageIDs,
        },
        depth: 0,
        overrideAccess: true,
        context: {
          ...context,
          [SYNC_CONTEXT_KEY]: true,
        },
        req,
      });
    }),
  ]);

  return doc;
};

export const removeProjectFromMedia: CollectionAfterDeleteHook = async ({
  context,
  doc,
  req,
}) => {
  if (context[SYNC_CONTEXT_KEY]) {
    return doc;
  }

  const imageIDs = normalizeRelationshipIDs(doc.images);

  await Promise.all(
    imageIDs.map(async (imageID) => {
      const mediaDoc = await req.payload.findByID({
        collection: "media",
        id: imageID,
        depth: 0,
        overrideAccess: true,
        req,
      });

      await req.payload.update({
        collection: "media",
        id: imageID,
        data: {
          projects: removeID(
            normalizeRelationshipIDs(mediaDoc.projects),
            String(doc.id)
          ),
        },
        depth: 0,
        overrideAccess: true,
        context: {
          ...context,
          [SYNC_CONTEXT_KEY]: true,
        },
        req,
      });
    })
  );

  return doc;
};

export const removeMediaFromProjects: CollectionAfterDeleteHook = async ({
  context,
  doc,
  req,
}) => {
  if (context[SYNC_CONTEXT_KEY]) {
    return doc;
  }

  const projectIDs = normalizeRelationshipIDs(doc.projects);

  await Promise.all(
    projectIDs.map(async (projectID) => {
      const projectDoc = await req.payload.findByID({
        collection: "projects",
        id: projectID,
        depth: 0,
        overrideAccess: true,
        req,
      });

      await req.payload.update({
        collection: "projects",
        id: projectID,
        data: {
          images: removeID(
            normalizeRelationshipIDs(projectDoc.images),
            String(doc.id)
          ),
        },
        depth: 0,
        overrideAccess: true,
        context: {
          ...context,
          [SYNC_CONTEXT_KEY]: true,
        },
        req,
      });
    })
  );

  return doc;
};
