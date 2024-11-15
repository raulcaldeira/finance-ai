import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";

const Subscription = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  return <Navbar />;
};

export default Subscription;