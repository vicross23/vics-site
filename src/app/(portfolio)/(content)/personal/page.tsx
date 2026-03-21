export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { ProjectPageType } from "~/app/models";
import ProjectCardLayout from "~/components/projects/project-card-layout";
import { getPayload } from "~/lib/payload";

export const metadata: Metadata = {
  title: "Personal",
};

export default async function PersonalPage() {
  const payload = await getPayload();

  const content = await payload.find({
    collection: "projects",
    where: {
      page: {
        equals: ProjectPageType.Personal,
      },
    },
  });
  const projects = content.docs;
  return (
    <div className="grow p-10 flex flex-col gap-8">
      <ProjectCardLayout projects={projects} />
    </div>
  );
}
