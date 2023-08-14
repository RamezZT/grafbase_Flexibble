import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";
type searchParams = {
  category?: string | null;
  endcursor: string;
  back?: string;
  startcursor?: string;
};
type Props = {
  searchParams: searchParams;
};

// FEEL FREE TO READ ABOUT THESE VARIABLES CUZ I DON"T KNOW WHAT THEY DO :)
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const Home = async ({
  searchParams: { category, endcursor, back, startcursor },
}: Props) => {
  // we have an error when we set the category to null so this
  // line is initial until we solve the problem
  !category ? (category = "Full-Stack") : "";
  const data = (await fetchAllProjects(
    category,
    endcursor,
    back,
    startcursor
  )) as ProjectSearch;
  const pagination = data?.projectSearch?.pageInfo;

  const projectsToDIsplay = data?.projectSearch?.edges || [];
  if (projectsToDIsplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center ">
          No projects found, go create some first
        </p>
      </section>
    );
  }
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDIsplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
            title={node?.title}
          />
        ))}
      </section>
      <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />
    </section>
  );
};

export default Home;
