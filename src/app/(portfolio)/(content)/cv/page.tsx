import { Metadata } from "next";
import { getPayload } from "~/lib/payload";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "CV",
};

export default async function CV() {
  const payload = await getPayload();

  const experienceTypes = await payload.find({
    collection: "experience-type",
    pagination: false,
    depth: 2,
    select: { name: true, experiences: true },
  });

  return (
    <div className="grow p-10 flex flex-col gap-4">
      {experienceTypes.docs.reverse().map((experienceType) => (
        <div key={`cv-${experienceType.name}`}>
          <h2 className="text-xl uppercase font-semibold mb-4">
            {experienceType.name}
          </h2>
          <div className="flex flex-col gap-4">
            {experienceType.experiences?.docs?.map((experience) => {
              if (typeof experience === "string") return;
              if (experienceType.name === "Education") {
                return (
                  <div key={`experience-${experience.id}`}>
                    <p>{experience?.venue}</p>
                    <p>
                      {experience?.name}
                      {` (${format(experience.startDate, "MMMM yyyy")}${
                        experience?.endDate
                          ? " - " + format(experience.endDate, "MMMM yyyy")
                          : ""
                      })`}
                    </p>
                  </div>
                );
              }
              if (experienceType.name === "Group Exhibitions") {
                return (
                  <div key={`experience-${experience.id}`}>
                    <p>{`${format(experience?.startDate, "yyyy")} // (${
                      experience?.name
                    })`}</p>
                    <p>{experience?.venue}</p>
                    <p>{experience?.geographicLocation}</p>
                  </div>
                );
              }
              return (
                <p key={`experience-${experience.id}`}>{`${format(
                  experience?.startDate,
                  "yyyy"
                )}${
                  experience?.endDate
                    ? ` - ${format(experience?.endDate, "yyyy")}`
                    : ""
                } // ${experience?.name}${
                  experience?.venue ? `, ${experience.venue}` : ""
                }${
                  experience?.geographicLocation
                    ? `, ${experience.geographicLocation}`
                    : ""
                }`}</p>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
