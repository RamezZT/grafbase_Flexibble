"use client";
import { useState } from "react";
import FormField from "./FormField";
import { SessionInterface } from "@/common.types";
import { updateUser } from "@/lib/actions";
import { UserInterface } from "@/common.types";
import { fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
type Props = {
  session: SessionInterface;
};
const UserForm = ({ session }: Props) => {
  const router = useRouter();
  const { user } = session;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<UserInterface>({
    desciption: user?.desciption || "",
    githubUrl: user?.githubUrl || "",
    linkedInUrl: user?.linkedInUrl || "",
  });
  const handleStateChange = (input: string, value: string) => {
    setForm((prevForm) => {
      return { ...prevForm, [input]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = await fetchToken();
    try {
      await updateUser(form, token, user.id);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="md:flex gap-4">
          <FormField
            type="url"
            title="Github URL"
            placeholder="https://github.com/RamezZT"
            state={form.githubUrl}
            setState={(value) => handleStateChange("githubUrl", value)}
          />
          <FormField
            type="url"
            title="LinkedIn URL"
            placeholder="https://www.linkedin.com/in/ramez-tayem-04b4062"
            state={form.linkedInUrl}
            setState={(value) => handleStateChange("linkedInUrl", value)}
          />
        </div>
        <FormField
          type="string"
          title="Description"
          isTextArea={true}
          placeholder="Ramez Tayem a Software Engineer at JUST university"
          state={form.desciption}
          setState={(value) => handleStateChange("desciption", value)}
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className={`rounded-xl p-2 ${
            !isSubmitting ? "bg-purple-500" : " bg-purple-400"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
