import { UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib/actions";
import ProfliePage from "@/components/ProfliePage";
type Props = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params }: Props) => {
  const result = (await getUserProjects(params.id, 100)) as {
    user: UserProfile;
  };

  if (!result.user) {
    return <p className="no-result-text">Failed to Load User Info</p>;
  }
  return <ProfliePage user={result?.user} />;
};

export default UserProfile;
