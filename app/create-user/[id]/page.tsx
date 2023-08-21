import React from "react";
import Modal from "@/components/Modal";
import UserForm from "@/components/UserForm";
import { getCurrentUser } from "@/lib/session";
const page = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  return (
    <Modal noEscape={session.user.firstLog}>
      <h1 className="flexCenter pb-8 ">Insert your Information</h1>
      {/* <UserForm session={session} /> */}
    </Modal>
  );
};

export default page;
